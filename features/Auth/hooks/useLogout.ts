import { Router, useRouter } from "next/router";
import { useAuth } from "../Context";

export const useLogout = () => {
  const router = useRouter();
  const { authProvider, setAuthState } = useAuth();

  const logout = async () => {
    await authProvider.logout();
    router.push("/");
    setAuthState(false);
  };

  return { logout };
};
