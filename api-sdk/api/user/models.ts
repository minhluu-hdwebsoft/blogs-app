import { Params } from "../../http/client";

export interface User {
  avatar: string;
  email: string;
  id: string;
  name: string;
  created_at: number | string;
  updated_at: number | string;
}

export type UserProfile = User;

export interface RegisterUserRegisterArgs extends Params {
  name?: string;
  email: string;
  password1: string;
  password2: string;
  avatar?: string;
}

export interface UserQueryParams {
  email?: string;
  status?: string;
}
