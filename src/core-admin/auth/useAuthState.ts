import { useMemo } from "react";
import { useQuery, UseQueryOptions } from "react-query";
import { removeDoubleSlashes, useBasename } from "../routing";
import { defaultAuthParams, useAuthProvider } from "./useAuthProvider";
import { useLogout } from "./useLogout";

interface State {
  isLoading: boolean;
  authenticated?: boolean;
}

const emptyParams = {};

/**
 * Hook for getting the authentication status
 *
 * Calls the authProvider.checkAuth() method asynchronously.
 *
 * The return value updates according to the authProvider request state:
 * - isLoading: true just after mount, while the authProvider is being called. false once the authProvider has answered.
 * - authenticated: true while loading. then true or false depending on the authProvider response.
 *
 * To avoid rendering a component and force waiting for the authProvider response, use the useAuthState() hook
 * instead of the useAuthenticated() hook.
 *
 * You can render different content depending on the authenticated status.
 *
 * @see useAuthenticated()
 *
 * @param params
 * @param logoutOnFailure
 * @param queryOptions
 *
 * @returns The current auth check state. Destructure as { authenticated, error, isLoading }.
 */
export const useAuthState = (
  params: any = emptyParams,
  logoutOnFailure: boolean = false,
  queryOptions?: UseQueryOptions<boolean, any>
): State => {
  const authProvider = useAuthProvider();
  const logout = useLogout();
  const basename = useBasename();
  // notify

  const result = useQuery<boolean, any>(
    ["auth", "checkAuth", params],
    // The authProvider is optional in core-admin
    () => authProvider?.checkAuth(params).then(() => true),
    {
      onError: (error) => {
        const loginUrl = removeDoubleSlashes(
          `${basename}/${defaultAuthParams.loginUrl}`
        );
        if (logoutOnFailure) {
          logout(
            {},
            error && error.redirectTo != null ? error.redirectTo : loginUrl
          );
          console.error("useAuthState > onError", error);
        }
      },
      retry: false,
      ...queryOptions,
    }
  );

  return useMemo(
    () => ({
      // If the data is undefined and the query isn't loading anymore, it means the query failed.
      // In that case, we set authenticated to false unless there's no authProvider.
      authenticated:
        result.data ?? result.isLoading ? true : authProvider == null,
      isLoading: result.isLoading,
      error: result.error,
    }),
    [authProvider, result]
  );
};
