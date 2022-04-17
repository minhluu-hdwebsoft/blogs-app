import api from "api";
import { AuthProvider } from "./authProvider";
import { RegisterParams, UserIdentity } from "./types";

const authProvider: AuthProvider = {
  login: async (username: string, password: string): Promise<void> => {
    await api.auth.login(username, password);
  },
  checkAuth: async (): Promise<boolean> => {
    return await api.auth.isAuthenticated();
  },
  logout: async (): Promise<void> => {
    await api.auth.logout();
  },
  getIdentity: async (): Promise<UserIdentity> => api.user.me(),
  register: async (values: RegisterParams): Promise<void> => {
    await api.auth.register(values);
  },
  refreshToken: async (): Promise<void> => {
    if (await api.auth.getAuthToken()) {
      await api.auth.refreshToken();
    }
  },
};

export default authProvider;
