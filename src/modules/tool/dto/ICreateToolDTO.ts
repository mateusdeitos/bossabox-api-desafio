import Tool from '../entities/typeorm/Tool';

export type ICreateToolDTO = Pick<Tool, 'title' | 'description' | 'url'>;
