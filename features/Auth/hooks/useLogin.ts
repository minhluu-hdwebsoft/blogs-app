import { useState } from "react";
import { useAuth } from "../Context";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { authProvider, setAuthState } = useAuth();

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
    } catch (error) {
      if (error instanceof Error) {
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, login };
};
