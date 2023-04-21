import { useContext } from "react";
import { ResourceContext, ResourceContextValue } from "./ResourceContext";

/**
 * Hook to read the resource from the ResourceContext.
 *
 * Must be used within a <ResourceContextProvider> (e.g. as a descendent of <Resource>
 * or any reference related components), or called with a resource prop.
 */
export const useResourceContext = <
  ResourceInformationsType extends Partial<{ resource: string }>
>(
  props?: ResourceInformationsType
): ResourceContextValue => {
  const context = useContext(ResourceContext);
  return props?.resource || context || "";
};
