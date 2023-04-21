import { useMemo } from "react";
import { defaults } from "lodash";
import { ResourceDefinition } from "../types";
import { useResourceContext } from "./useResourceContext";
import { useResourceDefinitions } from "./useResourceDedinitions";

export const useResourceDefinition = (
  props: UseResourceDefinitionOptions
): ResourceDefinition => {
  const resource = useResourceContext(props);
  const resourceDefinitions = useResourceDefinitions();
  const { hasCreate, hasEdit, hasList, hasShow, recordRepresentation } =
    props || {};

  console.log("useResourceDefinition > props", props);

  const definition = useMemo(() => {
    return defaults(
      {},
      { hasCreate, hasEdit, hasList, hasShow, recordRepresentation },
      resourceDefinitions[resource]
    );
  }, [
    resource,
    resourceDefinitions,
    hasCreate,
    hasEdit,
    hasList,
    hasShow,
    recordRepresentation,
  ]);

  return definition;
};

export interface UseResourceDefinitionOptions {
  readonly resource?: string;
  readonly hasList?: boolean;
  readonly hasEdit?: boolean;
  readonly hasShow?: boolean;
  readonly hasCreate?: boolean;
  readonly recordRepresentation?:
    | string
    | React.ReactElement
    | ((record: any) => string);
}
