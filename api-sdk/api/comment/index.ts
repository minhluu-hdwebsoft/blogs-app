import { cleanObject, flattenObj } from "../../utils";
import { ApiClient } from "../../http/client";
import { Pagination } from "../../types";
import { Comment, CommentQueryParam, CreateCommentQueryParam, UpdateCommentQueryParam } from "./models";

export class CommentApi {
  public constructor(public readonly client: ApiClient) {}
  public async list(
    q?: string,
    queryParams?: CommentQueryParam,
    _page = 1,
    _limit = 5,
    _sort?: string,
    _order?: string,
  ): Promise<Pagination<Comment>> {
    const params = { q, ...cleanObject(flattenObj(queryParams)), _order, _page, _limit, _sort };
    return this.client.get("/comments", params);
  }

  public async create(data: CreateCommentQueryParam): Promise<Comment> {
    const uri = `/comments/`;
    return this.client.post<Comment, CreateCommentQueryParam>(uri, data);
  }

  public async get(blogId: string): Promise<Comment> {
    const uri = `/comments/${blogId}/`;
    return this.client.get<Comment>(uri);
  }

  public async update(data: UpdateCommentQueryParam): Promise<Comment> {
    const uri = `/comments/${data.id}/`;
    return this.client.patch<Comment, UpdateCommentQueryParam>(uri, data);
  }

  public async delete(blogId: string): Promise<void> {
    const uri = `/comments/${blogId}/`;
    return this.client.delete(uri);
  }
}
