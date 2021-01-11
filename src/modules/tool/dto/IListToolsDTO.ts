import { IFilterListDTO } from '@shared/controllers/dto/IFilterListDTO';
import Tool from '../entities/typeorm/Tool';

interface ListTools {
  tags?: string;
}

export type IListToolsDTO = ListTools & IFilterListDTO<Tool>;
