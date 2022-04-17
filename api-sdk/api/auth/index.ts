import { ApiClient } from "../../http/client";
// import { AuthType } from "../../http/config";
import { AbstractAuthAdapter } from "./adapter/adapter";
import { JwtAuth } from "./adapter/jwt";
import { TokenAuth } from "./adapter/token";

export const authFactory = (client: ApiClient): AbstractAuthAdapter => {
  return new JwtAuth(client);
};
