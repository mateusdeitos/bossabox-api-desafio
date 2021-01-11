import Tool from '@modules/tool/entities/typeorm/Tool';
import { ICreateToolDTO } from '@modules/tool/dto/ICreateToolDTO';

export interface IToolRepository {
  create(tool: Tool): Promise<Tool>;
  findByProp(
    prop: keyof Tool,
    value: Tool[keyof Tool],
  ): Promise<Tool | undefined>;
}
