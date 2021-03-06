import { ApiClient } from "../http/client";
import { ApiConfiguration } from "../http/config";
import { BlogApi } from "./blog";
import { CategoryApi } from "./category";
import { CommentApi } from "./comment";

export const createApiClient = (config: ApiConfiguration): ApiClient => {
  const client = new ApiClient(config);
  return client;
};

export class Api {
  public readonly category: CategoryApi;
  public readonly blog: BlogApi;
  public readonly comment: CommentApi;
  public constructor(public readonly client: ApiClient) {
    this.category = new CategoryApi(client);
    this.blog = new BlogApi(client);
    this.comment = new CommentApi(client);
  }
}
