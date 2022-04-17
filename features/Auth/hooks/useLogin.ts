import api from "api";
import { useLoading } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "utils/toast";
import { useAuth } from "../Context";

export const useLogin = () => {
  const router = useRouter();
  const { isLoading, toggleLoading } = useLoading(false);
  const { authProvider, setAuthState } = useAuth();

  const login = async (username: string, password: string) => {
    try {
      toggleLoading();
      await authProvider.login(username, password);
      const identity = await api.user.me();
      setAuthState(true, identity);
      router.back();
      toast({
        title: "Sign in Success",
        description: "Welcome to Blog App",
        status: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Sign in Failture",
          description: error.message ? error.message : "Unknow error",
          status: "error",
        });
      }
    } finally {
      toggleLoading();
    }
  };

  return { isLoading, login };
};
