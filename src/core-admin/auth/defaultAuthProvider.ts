import { AuthProvider, UserIdentity } from "../types";

const defaultIdentity: UserIdentity = { id: "" };

export const defaultAuthProvider: AuthProvider = {
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  checkAuth: () => Promise.resolve(),
  checkError: () => Promise.resolve(),
  getPermissions: () => Promise.resolve(),
  getIdentity: () => Promise.resolve(defaultIdentity),
};
