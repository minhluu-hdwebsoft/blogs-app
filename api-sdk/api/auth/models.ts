import { Params } from "../../http/client";

export interface AuthorizationHeaders extends Params {
  Authorization: string;
}

export interface UserRegisterParams {
  username?: string;
  email: string;
  password1: string;
  password2: string;
  first_name?: string;
  last_name?: string;
  code: string;
  bio?: string;
}

export interface JwtToken {
  accessToken: string;
}

export interface ApiKey {
  key: string;
}

export interface ResetConfirmParams {
  new_password1: string;
  new_password2: string;
  otp: string;
}
