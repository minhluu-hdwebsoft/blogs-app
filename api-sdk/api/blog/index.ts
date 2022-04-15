import { cleanObject, flattenObj } from "../../utils";
import { ApiClient } from "../../http/client";
import { Pagination } from "../../types";
import { Blog, BlogQueryParam, CreateBlogQueryParam, UpdateBlogQueryParam } from "./models";

export class BlogApi {
  public constructor(public readonly client: ApiClient) {}
  public async list(
    q?: string,
    queryParams?: BlogQueryParam,
    _page = 1,
    _limit = 5,
    _sort?: string,
    _order?: string,
  ): Promise<Pagination<Blog>> {
    const params = { q, ...cleanObject(flattenObj(queryParams)), _order, _page, _limit, _sort };
    return this.client.get("/blogs", params);
  }

  public async create(data: CreateBlogQueryParam): Promise<Blog> {
    const uri = `/blogs/`;
    return this.client.post<Blog, CreateBlogQueryParam>(uri, data);
  }

  public async get(blogId: string): Promise<Blog> {
    const uri = `/blogs/${blogId}/`;
    return this.client.get<Blog>(uri);
  }

  public async update(data: UpdateBlogQueryParam): Promise<Blog> {
    const uri = `/blogs/${data.id}/`;
    return this.client.patch<Blog, UpdateBlogQueryParam>(uri, data);
  }

  public async delete(blogId: string): Promise<void> {
    const uri = `/blog/${blogId}/`;
    return this.client.delete(uri);
  }
}
