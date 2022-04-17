import { ApiClient, Authenticator, AuthToken } from '../../../http/client';
import { UserRegisterParams, AuthorizationHeaders, SocialLoginParams, ResetConfirmParams } from '../models';

export interface AuthAdapter extends Authenticator {
  login(username: string, password: string): Promise<unknown>;
  logout(): void;
  register(params: UserRegisterParams): Promise<unknown>;
  verifyEmail(key: string): Promise<unknown>;
  resendEmail(email: string): Promise<unknown>;
  refreshToken(): void;
  isAuthenticated(): Promise<boolean>;
  getAuthorizationHeaders(): Promise<AuthorizationHeaders>;
}

export interface SocialAuth {
  facebookLogin(params: SocialLoginParams): Promise<unknown>;
  connectFacebook(params: SocialLoginParams): Promise<unknown>;
  googleLogin(params: SocialLoginParams): Promise<unknown>;
  twitterLogin(params: SocialLoginParams): Promise<unknown>;
  linkedInLogin(params: SocialLoginParams): Promise<unknown>;
}

export interface ChangePassword {
  changePassword(oldPassword: string, newPassword: string): Promise<unknown>;
  resetPassword(email: string): Promise<unknown>;
  resetPasswordConfirm(params: ResetConfirmParams): Promise<ResetConfirmParams>;
}

export abstract class AbstractAuthAdapter implements AuthAdapter, ChangePassword, SocialAuth {
  public constructor(public readonly client: ApiClient) {}

  public abstract login(username: string, password: string): Promise<unknown>;
  public abstract getAuthToken(): Promise<AuthToken | null>;
  public abstract refreshToken(): Promise<void>;
  public abstract facebookLogin(params: SocialLoginParams): Promise<unknown>;
  public abstract connectFacebook(params: SocialLoginParams): Promise<unknown>;
  public abstract googleLogin(params: SocialLoginParams): Promise<unknown>;
  public abstract twitterLogin(params: SocialLoginParams): Promise<unknown>;
  public abstract linkedInLogin(params: SocialLoginParams): Promise<unknown>;

  public async getAuthHeader(): Promise<string> {
    const authToken = await this.getAuthToken();
    if (!authToken || !authToken.access_token) {
      return '';
    }
    if (authToken.token_type) {
      return `${authToken.token_type} ${authToken.access_token}`;
    }
    return authToken.access_token;
  }

  public async logout(): Promise<void> {
    const config = this.client.getApiConfig();
    const sessionStorage = config.session;
    await sessionStorage.remove(config.authSessionKey);
  }

  public async setAuthToken(data: unknown): Promise<void> {
    const config = this.client.getApiConfig();
    const sessionStorage = config.session;
    await sessionStorage.set(config.authSessionKey, JSON.stringify(data));
  }

  public async isAuthenticated(): Promise<boolean> {
    const token = await this.getAuthToken();
    if (token) {
      return true;
    }
    return false;
  }

  public async getAuthorizationHeaders(): Promise<AuthorizationHeaders> {
    const authHeader = await this.getAuthHeader();
    const headers: AuthorizationHeaders = {
      Authorization: authHeader,
    };
    return headers;
  }

  public async changePassword(oldPassword: string, newPassword: string): Promise<unknown> {
    const uri = `/auth/password/change/`;
    const params = {
      old_password: oldPassword,
      new_password1: newPassword,
      new_password2: newPassword,
    };
    return this.client.post(uri, params);
  }

  public async resetPassword(email: string): Promise<unknown> {
    const uri = `/auth/password/reset/`;
    const params = {
      email: email,
    };
    return this.client.post(uri, params);
  }

  public async resetPasswordConfirm(params: ResetConfirmParams): Promise<ResetConfirmParams> {
    const uri = `/auth/password/reset/confirm/`;

    return this.client.post(uri, { ...params });
  }

  public async verifyEmail(key: string): Promise<unknown> {
    const uri = `/auth/registration/verify-email/`;
    const params = {
      key: key,
    };
    return this.client.post(uri, params);
  }

  public async resendEmail(email: string): Promise<unknown> {
    const uri = `/auth/registration/resend-email/`;
    const params = {
      email: email,
    };
    return this.client.post(uri, params);
  }

  public async register(params: UserRegisterParams): Promise<unknown> {
    const r = await this.client.post('/auth/registration/', params, {}, false);
    await this.setAuthToken(r);
    return r;
  }
}
