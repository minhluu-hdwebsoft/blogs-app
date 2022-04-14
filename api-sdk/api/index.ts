import { ApiClient } from "../http/client";
import { ApiConfiguration } from "../http/config";
import { BlogApi } from "./blog";
import { CategoryApi } from "./category";

export const createApiClient = (config: ApiConfiguration): ApiClient => {
  const client = new ApiClient(config);
  return client;
};

export class Api {
  public readonly category: CategoryApi;
  public readonly blog: BlogApi;
  public constructor(public readonly client: ApiClient) {
    this.category = new CategoryApi(client);
    this.blog = new BlogApi(client);
  }
}
