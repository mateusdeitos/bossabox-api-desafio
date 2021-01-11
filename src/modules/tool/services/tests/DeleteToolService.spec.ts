import Tool from '@modules/tool/entities/typeorm/Tool';
import FakeToolRepository from '@modules/tool/repositories/fakes/FakeToolRepository';
import ServiceValidationException from '@shared/errors/ServiceValidationException';
import { HTTPStatusCodeEnum } from '@shared/errors/dto/HTTPStatusCodeEnum';
import CreateToolService from '../CreateToolService';
import DeleteToolService from '../DeleteToolService';

describe('Criação de Tools', () => {
  let fakeToolRepository: FakeToolRepository;
  let createToolService: CreateToolService;
  let deleteToolService: DeleteToolService;

  beforeEach(async () => {
    fakeToolRepository = new FakeToolRepository();
    createToolService = new CreateToolService(fakeToolRepository);
    deleteToolService = new DeleteToolService(fakeToolRepository);
  });

  it('Deve poder apagar uma tool existente', async () => {
    const { id } = await createToolService.execute({
      title: 'Notion',
      description:
        'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
      url: 'https://notion.so',
    });
    const spyMethod = jest.spyOn(fakeToolRepository, 'delete');

    await deleteToolService.execute(id);

    expect(spyMethod).toHaveBeenCalledWith(id);
  });
  it('Não deve poder apagar uma tool inexistente', async () => {
    const { id } = await createToolService.execute({
      title: 'Notion',
      description:
        'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
      url: 'https://notion.so',
    });
    const promise = deleteToolService.execute(id + 1);

    await expect(promise).rejects.toBeInstanceOf(ServiceValidationException);
    await expect(promise).rejects.toMatchObject({
      message: expect.any(String),
      statusCode: HTTPStatusCodeEnum.NOT_FOUND,
    });
  });
});
