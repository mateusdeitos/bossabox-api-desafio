import { TOOL_REPOSITORY_TOKEN } from '@shared/container';
import { inject, injectable } from 'tsyringe';

import { IResponseListDTO } from '@shared/controllers/dto/IFilterListDTO';
import Tool from '../entities/typeorm/Tool';
import { IToolRepository } from '../repositories/dto/IToolRepository';
import { IListToolsDTO } from '../dto/IListToolsDTO';

@injectable()
export default class ListToolsService {
  constructor(
    @inject(TOOL_REPOSITORY_TOKEN)
    private toolRepository: IToolRepository,
  ) {}

  public async execute({
    search = '',
    searchByTags = false,
    limit,
    offset,
    orderBy,
  }: IListToolsDTO): Promise<IResponseListDTO<Tool>> {
    return this.toolRepository.index({
      search,
      searchByTags,
      limit,
      offset,
      orderBy,
    });
  }
}
