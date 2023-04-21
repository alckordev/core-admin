import { useCallback } from "react";
import { removeDoubleSlashes, useBasename } from "../routing";
import { defaultAuthParams, useAuthProvider } from "./useAuthProvider";
import { useLogout } from "./useLogout";

const checkAuthWithoutAuthProvider = () => Promise.resolve();

// const getErrorMessage = (error: any, defaultMessage: string) =>
//   typeof error === "string"
//     ? error
//     : typeof error === "undefined" || !error.message
//     ? defaultMessage
//     : error.message;

export const useCheckAuth = (): CheckAuth => {
  const authProvider = useAuthProvider();
  const logout = useLogout();
  const basename = useBasename();
  const loginUrl = removeDoubleSlashes(
    `${basename}/${defaultAuthParams.loginUrl}`
  );

  const checkAuth = useCallback(
    (params: any = {}, logoutOnFailure = true, redirectTo = loginUrl) =>
      authProvider.checkAuth(params).catch((error) => {
        if (logoutOnFailure) {
          logout(
            {},
            error && error.redirectTo != null ? error.redirectTo : redirectTo
          );
        }
        throw error;
      }),
    [authProvider, logout, loginUrl]
  );

  return authProvider ? checkAuth : checkAuthWithoutAuthProvider;
};

/**
 * Check if the current user is authenticated by calling authProvider.checkAuth().
 * Logs the user out on failure.
 */
export type CheckAuth = (
  params?: any,
  logoutOnFailure?: boolean,
  redirectTo?: string
) => Promise<any>;
