export interface SessionStorage {
  set(key: string, value: string): Promise<void>;
  get(key: string): Promise<string>;
  remove(key: string): Promise<void>;
}

export enum AuthType {
  JWT = "jwt",
  OAUTH2 = "oauth2",
  TOKEN = "token",
}

export enum UploadType {
  AWS = "aws",
  LOCAL = "local",
}

export enum ArrayFormat {
  REPEAT = "repeat",
  INDICES = "indices",
  BRACKETS = "brackets",
  COMMA = "comma",
}

export interface ApiConfiguration {
  baseUrl: string;
}
