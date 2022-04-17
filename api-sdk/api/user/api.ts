import { Pagination } from "api-sdk/types";
import { ApiClient } from "../../http/client";
import { RegisterUserRegisterArgs, User, UserQueryParams } from "./models";

export class UserApi {
  public constructor(public readonly client: ApiClient) {}

  public async list(
    q?: string,
    queryParams?: UserQueryParams,
    ordering?: string,
    page = 1,
    limit = 20,
  ): Promise<Pagination<User>> {
    const search = q ? { search: q } : undefined;
    const _ordering = ordering ? { ordering } : undefined;
    const params = { ...search, ...queryParams, ..._ordering, page, limit };
    return this.client.get("/users/", params);
  }

  public async register(args: RegisterUserRegisterArgs): Promise<User> {
    return this.client.post<User, RegisterUserRegisterArgs>("/auth/registration/", args, {}, false);
  }

  public async me(): Promise<User> {
    return this.client.get("/users/me/");
  }
}
