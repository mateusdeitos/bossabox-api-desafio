export type IFilterOrderByOptions = 'ASC' | 'DESC';
export type IFilterValidOrderByColumns<T> = keyof T;

export type IFilterOrderBy<T> = {
  column: IFilterValidOrderByColumns<T>;
  order: IFilterOrderByOptions;
}[];

export interface IFilterListDTO<T> {
  limit?: number;
  offset?: number;
  orderBy?: IFilterOrderBy<T>;
}

export interface IResponseListDTO<T> {
  results: T[];
  currentOffset: number;
  totalResults: number;
}
