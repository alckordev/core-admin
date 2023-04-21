import { ResourceDefinitions } from "./ResourceDefinitionContext";
import { useResourceDefinitionContext } from "./useResourceDefinitionContext";

/**
 * Get the definition of the all resources
 */
export const useResourceDefinitions = (): ResourceDefinitions =>
  useResourceDefinitionContext().definitions;
