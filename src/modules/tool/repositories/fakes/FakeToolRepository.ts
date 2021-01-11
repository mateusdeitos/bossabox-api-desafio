/* eslint-disable no-nested-ternary */
import { IListToolsDTO } from '@modules/tool/dto/IListToolsDTO';
import Tool from '@modules/tool/entities/typeorm/Tool';
import { IResponseListDTO } from '@shared/controllers/dto/IFilterListDTO';
import {
  saveObjectInRepository,
  findEntityInRepositoryByProp,
  removeObjectInRepository,
  paginateResults,
} from '@shared/utils/testUtils';
import { IToolRepository } from '../dto/IToolRepository';

export default class FakeToolRepository implements IToolRepository {
  private ormRepository: Tool[];

  constructor() {
    this.ormRepository = [];
  }

  public async create(tool: Tool): Promise<Tool> {
    const newTool = {
      ...new Tool(),
      ...tool,
      created_at: new Date(),
      updated_at: new Date(),
    };
    return saveObjectInRepository(this.ormRepository, newTool);
  }

  public async index({
    tags,
    limit = 10,
    offset: currentOffset = 0,
    orderBy = [{ column: 'created_at', order: 'DESC' }],
  }: IListToolsDTO): Promise<IResponseListDTO<Tool>> {
    let results = this.ormRepository;
    if (tags) {
      const filterTags = tags.split(',');

      // Filtra os resultados pelas tags que foram informadas na pesquisa
      results = this.ormRepository.filter(
        ({ tags }) =>
          tags.split(',').filter(tag => filterTags.includes(tag)).length > 0,
      );
    }

    // grava o total de resultados antes de paginar
    const totalResults = results.length;

    // Ordena pelo 1º orderBy apenas, pois é só para testes
    const { column, order } = orderBy[0];
    results = results.sort((toolA, toolB) => {
      if (order === 'ASC') {
        return toolA[column] > toolB[column]
          ? 1
          : toolA[column] < toolB[column]
          ? -1
          : 0;
      }
      return toolA[column] < toolB[column]
        ? 1
        : toolA[column] > toolB[column]
        ? -1
        : 0;
    });

    // Faz a paginação dos resultados
    results = paginateResults(results, limit, currentOffset);

    return {
      currentOffset,
      results,
      totalResults,
    };
  }

  public async delete(id: number): Promise<void> {
    removeObjectInRepository(this.ormRepository, id);
  }

  public async findByProp(
    prop: keyof Tool,
    value: Tool[keyof Tool],
  ): Promise<Tool | undefined> {
    return findEntityInRepositoryByProp(this.ormRepository, {
      propName: prop,
      propValue: value,
    });
  }
}
