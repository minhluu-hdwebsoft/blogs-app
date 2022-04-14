import { ApiClient } from "../../http/client";
import { Pagination } from "../../types";
import { Category, CategoryQueryParam, CreateCategoryQueryParam, UpdateCategoryQueryParam } from "./models";

export class CategoryApi {
  public constructor(public readonly client: ApiClient) {}

  public async list(
    q?: string,
    queryParams?: CategoryQueryParam,
    _page = 1,
    _limit = 20,
    _sort?: string,
    _order?: string,
  ): Promise<Pagination<Category>> {
    const params = { q, ...queryParams, _order, _page, _limit };
    return this.client.get("/categories", params);
  }

  public async create(data: CreateCategoryQueryParam): Promise<Category> {
    const uri = `/categories/`;
    return this.client.post<Category, CreateCategoryQueryParam>(uri, data);
  }

  public async get(categoryId: string): Promise<Category> {
    const uri = `/categories/${categoryId}/`;
    return this.client.get<Category>(uri);
  }

  public async update(data: UpdateCategoryQueryParam): Promise<Category> {
    const uri = `/categories/${data.id}/`;
    return this.client.patch<Category, UpdateCategoryQueryParam>(uri, data);
  }

  public async delete(categoryId: string): Promise<void> {
    const uri = `/categories/${categoryId}/`;
    return this.client.delete(uri);
  }
}
