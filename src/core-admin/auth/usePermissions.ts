import { useMemo } from "react";
import { useQuery, UseQueryOptions } from "react-query";
import { useAuthProvider } from "./useAuthProvider";

const emptyParams: object = {};

/**
 * Hook for getting user permissions
 *
 * Calls the authProvider.getPermissions() method using react-query.
 * If the authProvider returns a rejected promise, returns empty permissions.
 *
 * The return value updates according to the request state:
 *
 * - start: { isLoading: true }
 * - success: { permissions: [any], isLoading: false }
 * - error: { error: [error from provider], isLoading: false }
 *
 * Useful to enable features based on user permissions
 *
 * @param {Object} params Any params you want to pass to the authProvider
 *
 * @returns The current auth check state. Destructure as { permissions, error, isLoading }.
 */
export const usePermissions = <Permissions = any, Error = any>(
  params: object = emptyParams,
  queryParams: UseQueryOptions<
    Permissions,
    Error,
    Permissions,
    [string, string, typeof params]
  > = {
    staleTime: 5 * 60 * 1000,
  }
) => {
  const authProvider = useAuthProvider();

  const result = useQuery(
    ["auth", "getPermissions", params],
    authProvider ? () => authProvider.getPermissions(params) : async () => [],
    queryParams
  );

  return useMemo(
    () => ({
      permissions: result.data,
      isLoading: result.isLoading,
      error: result.error,
    }),
    [result]
  );
};
