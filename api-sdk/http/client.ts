import axios, { AxiosResponse, AxiosRequestConfig, AxiosError, AxiosInstance, AxiosRequestHeaders } from "axios";
import { ApiConfiguration } from "./config";
import { ApiError } from "./error";
import queryString from "query-string";

export interface AuthToken {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
  scope?: string;
  expires_in?: number;
}

export interface Authenticator {
  getAuthToken(): Promise<AuthToken | null>;
  getAuthHeader(): Promise<string>;
  setAuthToken(data: AuthToken): Promise<void>;
}

export interface Params {
  [key: string]: unknown;
}

export type RequestInterceptor = (config: Partial<AxiosRequestConfig>) => Promise<AxiosRequestConfig>;
export type ResponseInterceptor = (response: AxiosResponse) => Promise<AxiosResponse>;

interface Interceptor {
  request?: RequestInterceptor;
  response?: ResponseInterceptor;
}

const TIMEOUT_REQUEST_DEFAULT = 1000 * 30; //30s
const CACHE_EXPIRES_DEFAULT = 5 * 60 * 1000; //300s

export class ApiClient {
  public authenticator?: Authenticator;
  public axiosInstance: AxiosInstance;

  public constructor(protected apiConfig: ApiConfiguration) {
    const options = {
      baseURL: apiConfig.baseUrl,
      withCredentials: true,
    };

    this.axiosInstance = axios.create(options);
  }

  // private async cacheInvalidate(config: any, request: any) {
  //   const method = request.method.toLowerCase();
  //   if (config.exclude.methods.includes(method) || request.params.clearCacheEntry) {
  //     await config.store.removeItem(config.uuid);
  //   }
  // }

  public setApiConfig(apiConfig: ApiConfiguration): void {
    this.apiConfig = apiConfig;
  }

  public getApiConfig(): ApiConfiguration {
    return this.apiConfig;
  }

  public setAuthenticator(authenticator: Authenticator): ApiClient {
    this.authenticator = authenticator;
    return this;
  }

  public async getAuthToken(): Promise<AuthToken | null> {
    if (!this.authenticator) {
      return null;
    }
    return this.authenticator.getAuthToken();
  }

  private success<T>(response: AxiosResponse): T {
    return response.data;
  }

  private error(e: AxiosError): ApiError {
    if (e.response && e.response.data) {
      const errorCode = e.response.data.code || "unknown";
      const message = e.response.data.error_detail || e.response.data.message || e.message;
      return new ApiError(message, errorCode);
    }
    return this.handleUnknownError(e);
  }

  private handleUnknownError(e: Error) {
    return new ApiError(e.message, "unknown");
  }

  private uri(uri: string): string {
    return `${this.apiConfig.baseUrl}${uri}`;
  }

  private async configs(config: AxiosRequestConfig, isAuthenticated = true): Promise<AxiosRequestConfig> {
    const authHeader = await this.authenticator?.getAuthHeader();
    let headers = config?.headers || {};
    if (authHeader && isAuthenticated) {
      headers = {
        ...headers,
        Authorization: authHeader,
      };
    }
    headers = { ...headers };
    config.paramsSerializer = (params) => queryString.stringify(params);
    return { ...config, headers };
  }

  public addInterceptor(interceptor: Interceptor): void {
    if (interceptor.request) {
      this.addRequestInterceptor(interceptor.request);
    }
    if (interceptor.response) {
      this.addResponseInterceptor(interceptor.response);
    }
  }

  public addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.axiosInstance.interceptors.request.use(interceptor);
  }

  public addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.axiosInstance.interceptors.response.use(interceptor);
  }

  public async get<T>(uri: string, params: Params = {}, isAuthenticated = true): Promise<T> {
    try {
      const config = await this.configs({ params }, isAuthenticated);
      const r = await this.axiosInstance.get(this.uri(uri), config);
      return this.success<T>(r);
    } catch (e) {
      throw this.error(e as AxiosError);
    }
  }

  public async post<T, P = unknown>(uri: string, data?: P, params: Params = {}, isAuthenticated = true): Promise<T> {
    try {
      const config = await this.configs({ params }, isAuthenticated);
      const r = await this.axiosInstance.post(this.uri(uri), data, config);
      return this.success<T>(r);
    } catch (e) {
      throw this.error(e as AxiosError);
    }
  }

  public async patch<T, P = unknown>(uri: string, data?: P, params: Params = {}, isAuthenticated = true): Promise<T> {
    try {
      const config = await this.configs({ params }, isAuthenticated);
      const r = await this.axiosInstance.patch(this.uri(uri), data, config);
      return this.success<T>(r);
    } catch (e) {
      throw this.error(e as AxiosError);
    }
  }

  public async put<T, P = unknown>(uri: string, data?: P, params: Params = {}, isAuthenticated = true): Promise<T> {
    try {
      const config = await this.configs({ params }, isAuthenticated);
      const r = await this.axiosInstance.put(this.uri(uri), data, config);
      return this.success<T>(r);
    } catch (e) {
      throw this.error(e as AxiosError);
    }
  }

  public async delete<T>(uri: string, params: Params = {}, isAuthenticated = true): Promise<T> {
    try {
      const config = await this.configs({ params }, isAuthenticated);
      const r = await this.axiosInstance.delete(this.uri(uri), config);
      return this.success(r);
    } catch (e) {
      throw this.error(e as AxiosError);
    }
  }

  public async upload<T, P = unknown>(
    uri: string,
    data: P,
    params: Params = {},
    isAuthenticated = true,
    onProgress?: (percentage: number) => void,
  ): Promise<T> {
    try {
      const onUploadProgress = (progressEvent: { loaded: number; total: number }) => {
        const loaded = progressEvent.loaded;
        const total = progressEvent.total;
        const percent = Math.round((loaded / total) * 100);
        if (typeof onProgress === "function") {
          onProgress(percent);
        }
      };
      const headers = { "Content-Type": "multipart/form-data" };
      const config = await this.configs({ params, headers, onUploadProgress }, isAuthenticated);
      const r = await this.axiosInstance.post(this.uri(uri), data, { ...config, timeout: 0 });
      return this.success<T>(r);
    } catch (e) {
      throw this.error(e as AxiosError);
    }
  }
}
