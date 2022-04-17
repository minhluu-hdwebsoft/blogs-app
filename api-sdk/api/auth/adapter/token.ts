import { AbstractAuthAdapter } from "./adapter";
import * as utils from "../../../utils";
import { AuthToken } from "../../../http/client";
import { ApiKey } from "../models";

export class TokenAuth extends AbstractAuthAdapter {
  public async login(username: string, password: string): Promise<ApiKey> {
    const data = { email: username, password };
    const r = await this.client.post<ApiKey>("/auth/login/", data, {}, false);
    await this.setAuthToken(r);
    return r;
  }

  public async getAuthToken(): Promise<AuthToken | null> {
    const config = this.client.getApiConfig();
    const json: string = await config.session.get(config.authSessionKey);
    const token = utils.tryParseJson(json) as ApiKey;
    if (!token || !token.key) {
      return null;
    }
    return {
      token_type: "Bearer",
      access_token: token.key,
    };
  }

  public async refreshToken(): Promise<void> {
    return;
  }
}
