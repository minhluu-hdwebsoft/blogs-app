export interface Pagination<T> {
  data: Array<T>;
  pagination?: {
    _page?: number;
    _limit?: number;
    _totalRows?: number;
  };
}
