import React, { createContext, ReactElement, useContext, useEffect, useRef, useState } from "react";
import { AuthProvider, defaultAuthProvider } from "./authProvider";
import { UserIdentity } from "./types";

interface AuthContextValues {
  isLoading: boolean;
  error: Error | unknown;
  identity: UserIdentity | null;
  authProvider: AuthProvider;
  isAuthenticated: boolean;
  setAuthState: (authenticated: boolean, identity?: UserIdentity | null) => void;
}

const AuthContext = createContext<AuthContextValues>({
  isLoading: false,
  error: null,
  identity: null,
  authProvider: defaultAuthProvider,
  isAuthenticated: false,
  setAuthState: () => null,
});

const useAuthContextProvider = (authProvider: AuthProvider): AuthContextValues => {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticatedRef = useRef<boolean>(false);
  const identityRef = useRef<UserIdentity | null>(null);
  const [error, setError] = useState<unknown>(null);

  const setAuthState = (authenticated: boolean, identity?: UserIdentity | null) => {
    setIsLoading(true);
    isAuthenticatedRef.current = authenticated;
    if (identity) {
      identityRef.current = identity;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const identity = await authProvider.getIdentity();
        identityRef.current = identity;
        isAuthenticatedRef.current = Boolean(identity);
      } catch (error: unknown) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    isLoading,
    isAuthenticated: isAuthenticatedRef.current,
    error,
    identity: identityRef.current,
    setAuthState,
    authProvider,
  };
};

export const AuthContextProvider = ({
  authProvider,
  children,
}: {
  authProvider: AuthProvider;
  children: ReactElement | ReactElement[];
}) => {
  const contextValue = useAuthContextProvider(authProvider);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext) as AuthContextValues;
