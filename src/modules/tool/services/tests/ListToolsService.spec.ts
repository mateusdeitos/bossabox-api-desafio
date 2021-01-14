import FakeToolRepository from '@modules/tool/repositories/fakes/FakeToolRepository';
import CreateToolService from '../CreateToolService';
import ListToolsService from '../ListToolsService';

describe('Listagem de Tools', () => {
  let fakeToolRepository: FakeToolRepository;
  let createToolService: CreateToolService;
  let listToolsService: ListToolsService;

  beforeEach(async () => {
    fakeToolRepository = new FakeToolRepository();
    createToolService = new CreateToolService(fakeToolRepository);
    listToolsService = new ListToolsService(fakeToolRepository);
    await createToolService.execute({
      title: 'Notion',
      description:
        'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
      url: 'https://notion.so',
      tags: [
        'organization',
        'planning',
        'collaboration',
        'writing',
        'calendar',
      ],
    });
    await createToolService.execute({
      title: 'json-server',
      description:
        'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
      url: 'https://github.com/typicode/json-server',
      tags: ['api', 'json', 'schema', 'node', 'github', 'rest'],
    });
    await createToolService.execute({
      title: 'fastify',
      url: 'https://www.fastify.io/',
      description:
        'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.',
      tags: ['web', 'framework', 'node', 'http2', 'https', 'localhost'],
    });
    await createToolService.execute({
      title: 'hotel',
      url: 'https://github.com/typicode/hotel',
      description:
        'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
      tags: [
        'node',
        'organizing',
        'webapps',
        'domain',
        'developer',
        'https',
        'proxy',
      ],
    });
  });

  it('Deve poder buscar uma tool existente filtrando por tag', async () => {
    const {
      currentOffset,
      results,
      totalResults,
    } = await listToolsService.execute({
      search: 'api',
    });

    expect(currentOffset).toBe(0);
    expect(totalResults).toBe(1);
    expect(results[0]).toHaveProperty('title', 'json-server');
  });
  it('Deve poder paginar os resultados', async () => {
    const firstSearch = await listToolsService.execute({
      search: 'node',
      searchByTags: true,
      limit: 1,
    });

    const secondSearch = await listToolsService.execute({
      search: 'node',
      searchByTags: true,
      limit: 1,
      offset: 1,
    });

    const thirdSearch = await listToolsService.execute({
      search: 'node',
      searchByTags: true,
      limit: 1,
      offset: 2,
    });

    const fourthSearch = await listToolsService.execute({
      search: 'node',
      searchByTags: true,
      limit: 1,
      offset: 3,
    });

    expect(firstSearch.totalResults).toBe(3);
    expect(secondSearch.totalResults).toBe(3);
    expect(thirdSearch.totalResults).toBe(3);

    expect(firstSearch.results[0]).toHaveProperty('title', 'json-server');
    expect(secondSearch.results[0]).toHaveProperty('title', 'fastify');
    expect(thirdSearch.results[0]).toHaveProperty('title', 'hotel');
    expect(fourthSearch.results[0]).toBeUndefined();
  });
  it('Deve poder pesquisar todas as ferramentas cadastradas', async () => {
    const { totalResults, results } = await listToolsService.execute({
      orderBy: [
        {
          column: 'id',
          order: 'ASC',
        },
      ],
    });

    expect(totalResults).toBe(4);
    expect(results[0]).toHaveProperty('title', 'Notion');
  });
  it('Deve poder pesquisar por titulo', async () => {
    const { totalResults, results } = await listToolsService.execute({
      search: 'Notion',
    });

    expect(totalResults).toBe(1);
    expect(results[0]).toHaveProperty('title', 'Notion');
  });
});
