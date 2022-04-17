import { AbstractAuthAdapter } from "./adapter";
import * as utils from "../../../utils";
import { AuthToken } from "../../../http/client";
import { JwtToken } from "../models";

export class JwtAuth extends AbstractAuthAdapter {
  public async login(username: string, password: string): Promise<JwtToken> {
    const data = { email: username, password };
    const r: JwtToken = await this.client.post<JwtToken>("/login/", data, {}, false);
    await this.setAuthToken(r);
    return r;
  }

  public async getAuthToken(): Promise<AuthToken | null> {
    const config = this.client.getApiConfig();
    const jwtJson: string = await config.session.get(config.authSessionKey);
    const jtwToken = utils.tryParseJson(jwtJson) as JwtToken;
    if (!jtwToken || !jtwToken.access) {
      return null;
    }
    return {
      token_type: "Bearer",
      access_token: jtwToken.access,
      refresh_token: jtwToken.refresh,
    };
  }

  public async refreshToken(): Promise<void> {
    const token = await this.getAuthToken();
    if (!token) {
      return;
    }
    const refresh = token.refresh_token;
    const data = { refresh };
    const r: JwtToken = await this.client.post("/token/refresh/", data, {}, false);
    await this.setAuthToken(r);
  }
}
