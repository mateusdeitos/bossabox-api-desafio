import Tool from '@modules/tool/entities/typeorm/Tool';
import FakeToolRepository from '@modules/tool/repositories/fakes/FakeUserRepository';
import ServiceValidationException from '@shared/errors/ServiceValidationException';
import CreateToolService from '../CreateToolService';

describe('Criação de Tools', () => {
  let fakeToolRepository: FakeToolRepository;
  let createToolService: CreateToolService;

  beforeEach(async () => {
    fakeToolRepository = new FakeToolRepository();
    createToolService = new CreateToolService(fakeToolRepository);
  });

  it('Deve poder criar uma tool', async () => {
    const tool = await createToolService.execute({
      title: 'Notion',
      description:
        'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
      url: 'https://notion.so',
    });
    expect(tool).toBeDefined();
    expect(tool.id).toBe(1);
  });

  it('Não deve poder criar uma tool com o mesmo título', async () => {
    const tool = await createToolService.execute({
      title: 'Notion',
      description:
        'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
      url: 'https://notion.so',
    });
    await expect(
      createToolService.execute({
        title: 'Notion',
        description:
          'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
        url: 'https://notion.so',
      }),
    ).rejects.toBeInstanceOf(ServiceValidationException);
  });
});
