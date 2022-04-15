export enum Order {
  ASC = "asc",
  DESC = "desc",
}

export interface FilterParams<T> {
  q?: string;
  _limit?: number;
  _page?: number;
  _order?: Order;
  _sort?: string;
  queryParams?: T;

  [key: string]: string | unknown;
}
