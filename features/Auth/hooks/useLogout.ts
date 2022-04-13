import { useAuth } from "../Context";

export const useLogout = () => {
  const { authProvider, setAuthState } = useAuth();

  const logout = async () => {
    await authProvider.logout();
    setAuthState(false);
  };

  return logout;
};
