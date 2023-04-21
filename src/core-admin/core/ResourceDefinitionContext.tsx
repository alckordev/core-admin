import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { isEqual } from "lodash";
import { ResourceDefinition } from "../types";

export type ResourceDefinitions = {
  [name: string]: ResourceDefinition;
};

export type ResourceDefinitionContextValue = {
  definitions: ResourceDefinitions;
  register: (config: ResourceDefinition) => void;
  unregister: (config: ResourceDefinition) => void;
};

export const ResourceDefinitionContext =
  createContext<ResourceDefinitionContextValue>({
    definitions: {},
    register: () => {},
    unregister: () => {},
  });

export const ResourceDefinitionContextProvider = ({
  definitions: defaultDefinitions = {},
  children,
}: {
  definitions?: ResourceDefinitions;
  children: ReactNode;
}) => {
  const [definitions, setDefinitions] =
    useState<ResourceDefinitions>(defaultDefinitions);

  // console.log(
  //   "ResourceDefinitionContextProvider > defaultDefinitions",
  //   defaultDefinitions
  // );
  // console.log("ResourceDefinitionContextProvider > definitions", definitions);

  const register = useCallback((config: ResourceDefinition) => {
    setDefinitions((previous) =>
      isEqual(previous[config.name], config)
        ? previous
        : { ...previous, [config.name]: config }
    );
  }, []);

  const unregister = useCallback((config: ResourceDefinition) => {
    setDefinitions((previous) => {
      const { [config.name]: _, ...rest } = previous;
      return rest;
    });
  }, []);

  const contextValue = useMemo(
    () => ({ definitions, register, unregister }),
    [definitions]
  );

  // console.log("ResourceDefinitionContextProvider > contextValue", contextValue);

  return (
    <ResourceDefinitionContext.Provider value={contextValue}>
      {children}
    </ResourceDefinitionContext.Provider>
  );
};
