import Tool from '@modules/tool/entities/typeorm/Tool';
import { Brackets, getRepository, Repository } from 'typeorm';
import { IResponseListDTO } from '@shared/controllers/dto/IFilterListDTO';
import { IListToolsDTO } from '@modules/tool/dto/IListToolsDTO';
import { IToolRepository } from '../dto/IToolRepository';

export default class ToolRepository implements IToolRepository {
  private ormRepository: Repository<Tool>;

  constructor() {
    this.ormRepository = getRepository(Tool);
  }

  public async create(tool: Tool): Promise<Tool> {
    return this.ormRepository.save(tool);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete({ id });
  }

  public async index({
    search,
    searchByTags,
    limit = 10,
    offset: currentOffset = 0,
    orderBy = [{ column: 'created_at', order: 'DESC' }],
  }: IListToolsDTO): Promise<IResponseListDTO<Tool>> {
    // Inicia a query
    let query = this.ormRepository.createQueryBuilder('tools');

    // Se foi informado tags, cria a cláusula de filtro para cada tag
    if (searchByTags && search) {
      query = query.andWhere(
        new Brackets(sqlClause =>
          search.split(',').map((tag, index) =>
            sqlClause.orWhere(`tools.tags like :tag-${index}`, {
              [`tag-${index}`]: `%${tag}%`,
            }),
          ),
        ),
      );
    }

    if (!searchByTags && search) {
      query = query.andWhere(
        new Brackets(sqlClause =>
          sqlClause
            .where('tools.title like :title', { title: `%${search}%` })
            .orWhere('tools.description like :description', {
              description: `%${search}%`,
            }),
        ),
      );
    }

    // Grava o total de resultados
    const totalResults = await query.getCount();

    // Adiciona as ordenações
    orderBy.map(({ column, order }) =>
      query.addOrderBy(`tools.${column}`, order),
    );

    // Seta a paginação
    query.limit(limit);
    query.offset(currentOffset);

    // Executa a query
    const results = await query.getMany();

    return {
      currentOffset,
      results,
      totalResults,
    };
  }

  public async findByProp(
    prop: keyof Tool,
    value: Tool[keyof Tool],
  ): Promise<Tool | undefined> {
    return this.ormRepository.findOne({ where: { [prop]: value } });
  }
}
