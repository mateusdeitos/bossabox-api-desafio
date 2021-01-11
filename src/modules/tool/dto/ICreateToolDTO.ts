import Tool from '../entities/typeorm/Tool';

type toolType = Pick<Tool, 'title' | 'description' | 'url'>;
export type ICreateToolDTO = toolType & { tags?: string[] };
export type IResponseToolCreatedDTO = Omit<Tool, 'tags'> & { tags?: string[] };
