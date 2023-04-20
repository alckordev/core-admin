import { AuthProvider, LegacyAuthProvider } from "../types";
import {
  AUTH_CHECK,
  AUTH_ERROR,
  AUTH_GET_PERMISSIONS,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AuthActionType,
} from "./types";

/**
 * Turn a function-based authProvider to an object-based one
 *
 * Allows using legacy authProviders transparently.
 *
 * @param {Function} legacyAuthProvider: A legacy authProvider (type, params) => Promise<any>
 *
 * @returns {Object} An authProvider that core-admin can use
 */
export const convertLegacyAuthProvider = (
  legacyAuthProvider: LegacyAuthProvider
): AuthProvider => {
  const authProvider = (...args: [AuthActionType, any]) =>
    legacyAuthProvider.apply(null, args);
  authProvider.login = (params: any) => legacyAuthProvider(AUTH_LOGIN, params);
  authProvider.logout = (params: any) =>
    legacyAuthProvider(AUTH_LOGOUT, params);
  authProvider.checkAuth = (params: any) =>
    legacyAuthProvider(AUTH_CHECK, params);
  authProvider.checkError = (error: any) =>
    legacyAuthProvider(AUTH_ERROR, error);
  authProvider.getPermissions = (params: any) =>
    legacyAuthProvider(AUTH_GET_PERMISSIONS, params);

  return authProvider;
};
