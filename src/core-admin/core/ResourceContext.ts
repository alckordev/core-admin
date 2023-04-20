import { createContext } from "react";

export type ResourceContextValue = string;

/**
 * Context to store the current resource name.
 *
 * Use the useResource() hook to read the context. That's what most components do in core-admin.
 */
export const ResourceContext = createContext<ResourceContextValue | undefined>(
  undefined
);
