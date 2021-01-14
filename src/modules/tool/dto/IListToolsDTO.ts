import { IFilterListDTO } from '@shared/controllers/dto/IFilterListDTO';
import Tool from '../entities/typeorm/Tool';

interface ListTools {
  search?: string;
  searchByTags?: boolean;
}

export type IListToolsDTO = ListTools & IFilterListDTO<Tool>;
