export type Order = "asc" | "desc";

export interface FilterParams<T> {
  q?: string;
  _limit?: number;
  _page?: number;
  _order?: Order;
  _sort?: string;
}
