import Tool from '@modules/tool/entities/typeorm/Tool';
import { IListToolsDTO } from '@modules/tool/dto/IListToolsDTO';
import { IResponseListDTO } from '@shared/controllers/dto/IFilterListDTO';

export interface IToolRepository {
  create(tool: Tool): Promise<Tool>;
  delete(id: number): Promise<void>;
  index(params: IListToolsDTO): Promise<IResponseListDTO<Tool>>;
  findByProp(
    prop: keyof Tool,
    value: Tool[keyof Tool],
  ): Promise<Tool | undefined>;
}
