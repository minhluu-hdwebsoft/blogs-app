import { Api, createApiClient } from "api-sdk/api";
import { ApiConfiguration, AuthType } from "api-sdk/http/config";
import Cookie from "js-cookie";

class SessionStorage {
  // store key/value pair
  public async set(key: string, value: string): Promise<void> {
    Cookie.set(key, value);
  }

  // get value of
  public async get(key: string): Promise<string> {
    const value = Cookie.get(key);
    return value || "";
  }

  // delete key
  public async remove(key: string): Promise<void> {
    Cookie.remove(key);
  }
}

const sessionStorage = new SessionStorage();
const config: ApiConfiguration = {
  baseUrl: "http://localhost:5000",
  authType: AuthType.JWT,
  authSessionKey: "AUTHOR-JWT",
  session: sessionStorage,
};

const client = createApiClient(config);
const api = new Api(client);

export default api;
