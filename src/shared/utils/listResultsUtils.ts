/* eslint-disable no-useless-escape */
import {
  IFilterOrderBy,
  IFilterOrderByOptions,
  IFilterValidOrderByColumns,
} from '@shared/controllers/dto/IFilterListDTO';

export const prepareOrderByArgumentFromQueryParams = <T>(
  orderByParam?: string,
): IFilterOrderBy<T> | undefined => {
  if (!orderByParam) return undefined;
  return orderByParam
    .replace(' ', '')
    .split(';')
    .map(orderStr => {
      const arrayOrderStr = orderStr
        .replace(new RegExp(/(\(|\))/g), '')
        .split(',');
      const column = arrayOrderStr[0] as IFilterValidOrderByColumns<T>;
      const order = arrayOrderStr[1] as IFilterOrderByOptions;
      return { column, order };
    });
};

export const prepareTagsStringFromQueryParams = (
  tags?: string,
): string | undefined => {
  if (!tags) return undefined;
  return tags
    .split(',')
    .map(tag => tag.toLowerCase().trim())
    .join(',');
};
