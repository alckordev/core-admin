import {
  Children,
  Dispatch,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useLogout, usePermissions } from "../auth";
import {
  AdminChildren,
  RenderResourceFunction,
  ResourceDefinition,
  ResourceProps,
} from "../types";
import { useSafeSetState } from "../utils";
import { CustomRoutesProps } from "./CustomRoutes";
import { useResourceDefinitionContext } from "./useResourceDefinitionContext";

/**
 * This hook inspects the CoreAdminRouter children and returns them separated in three groups:
 * - Custom routs without layout
 * - Custom routes with layout
 * - Resoruces
 *
 * It else returns a status:
 * - loading
 * - empty
 * - ready
 */
export const useConfigureRouterFromChildren = (
  children: AdminChildren
): RoutesAndResources & { status: AdminRouterStatus } => {
  const { permissions, isLoading } = usePermissions();

  const [routesAndResources, status] = useRoutesAndResourcesFromChildren(
    children,
    permissions,
    isLoading
  );

  // Whenever the resources change, we must ensure they're all registered
  useRegisterResources(routesAndResources.resources, permissions);

  return {
    customRoutesWithLayout: routesAndResources.customRoutesWithLayout,
    customRoutesWithoutLayout: routesAndResources.customRoutesWithoutLayout,
    resources: routesAndResources.resources,
    status,
  };
};

/**
 * A hook that determine the routes and resources from React nodes and permissions.
 * Returns a tuple with the routes and resources as a single object, and the status.
 *
 * @param children React nodes to inspect
 * @param permissions Permissitions
 * @param isLoading Loading status
 */
const useRoutesAndResourcesFromChildren = (
  children: ReactNode,
  permissions: any,
  isLoading: boolean
): [RoutesAndResources, AdminRouterStatus] => {
  const doLogout = useLogout();

  const [routesAndResources, setRoutesAndResources, mergeRoutesAndResources] =
    useRoutesAndResourcesState(getRoutesAndResourceFromNodes(children));

  const [status, setStatus] = useSafeSetState<AdminRouterStatus>(() =>
    getStatus({
      children,
      ...routesAndResources,
    })
  );

  useEffect(() => {
    const resolveChildFunction = async (
      childFunction: RenderResourceFunction
    ) => {
      try {
        const childrenFunctionResult = await childFunction(permissions);

        mergeRoutesAndResources(
          getRoutesAndResourceFromNodes(childrenFunctionResult)
        );
        setStatus("ready");

        // if ((childrenFunctionResult as Promise<ReactNode>)?.then) {
        //   (childrenFunctionResult as Promise<ReactNode>).then(
        //     (resolvedChildren) => {
        //       mergeRoutesAndResources(
        //         getRoutesAndResourceFromNodes(resolvedChildren)
        //       );
        //       setStatus("ready");
        //     }
        //   );
        // } else {
        //   mergeRoutesAndResources(
        //     getRoutesAndResourceFromNodes(childrenFunctionResult)
        //   );
        //   setStatus("ready");
        // }
      } catch (error) {
        console.error(error);
        doLogout();
      }
    };

    const updateFromChildren = async () => {
      const childFunction = getSingleChildFunction(children);
      const newRoutesAndResources = getRoutesAndResourceFromNodes(children);

      setRoutesAndResources(newRoutesAndResources);
      setStatus(
        !!childFunction
          ? "loading"
          : newRoutesAndResources.resources.length > 0 ||
            newRoutesAndResources.customRoutesWithLayout.length > 0 ||
            newRoutesAndResources.customRoutesWithLayout.length > 0
          ? "ready"
          : "empty"
      );

      if (childFunction) {
        resolveChildFunction(childFunction);
      }
    };

    if (!isLoading) {
      updateFromChildren();
    }
  }, [
    children,
    doLogout,
    isLoading,
    mergeRoutesAndResources,
    permissions,
    setRoutesAndResources,
    setStatus,
  ]);

  return [routesAndResources, status];
};

/**
 * A hook that store the routes and resources just like setState but also provides an additional function
 * to merge new routes and resources with the existing ones.
 *
 * @param initialState
 */
const useRoutesAndResourcesState = (
  initialState: RoutesAndResources
): [
  RoutesAndResources,
  Dispatch<SetStateAction<RoutesAndResources>>,
  (newRoutesAndResources: RoutesAndResources) => void
] => {
  const [routesAndResources, setRoutesAndResources] = useState(initialState);

  const mergeRoutesAndResources = useCallback(
    (newRoutesAndResources: RoutesAndResources) => {
      setRoutesAndResources((previous) => ({
        customRoutesWithLayout: previous.customRoutesWithLayout.concat(
          newRoutesAndResources.customRoutesWithLayout
        ),
        customRoutesWithoutLayout: previous.customRoutesWithoutLayout.concat(
          newRoutesAndResources.customRoutesWithoutLayout
        ),
        resources: previous.resources.concat(newRoutesAndResources.resources),
      }));
    },
    []
  );

  return [routesAndResources, setRoutesAndResources, mergeRoutesAndResources];
};

/**
 * A hook that register resources and unregister them when the calling component is unmounted.
 *
 * @param resources: An array of Resource elements
 * @param permissions: The permissions
 */
const useRegisterResources = (
  resources: (ReactElement<ResourceProps> & ResourceWithRegisterFunction)[],
  permissions: any
) => {
  const { register, unregister } = useResourceDefinitionContext();

  useEffect(() => {
    resources.forEach((resource) => {
      if (
        typeof (resource.type as unknown as ResourceWithRegisterFunction)
          .registerResource === "function"
      ) {
        const definition = (
          resource.type as unknown as ResourceWithRegisterFunction
        ).registerResource(resource.props, permissions);

        register(definition);
      } else {
        throw new Error(
          "When using a custom Resource element, it must have a static registerResource method accepting its props and returning a ResourceDefinition"
        );
      }
    });

    return () => {
      resources.forEach((resource) => {
        if (
          typeof (resource.type as unknown as ResourceWithRegisterFunction)
            .registerResource === "function"
        ) {
          const definition = (
            resource.type as unknown as ResourceWithRegisterFunction
          ).registerResource(resource.props, permissions);

          unregister(definition);
        } else {
          throw new Error(
            "When using a custom Resource element, it must have a static registerResource method accepting its props and returning a ResourceDefinition"
          );
        }
      });
    };
  }, [permissions, register, resources, unregister]);
};

const getStatus = ({
  children,
  resources,
  customRoutesWithLayout,
  customRoutesWithoutLayout,
}: {
  children: ReactNode;
  resources: ReactElement<ResourceProps>[];
  customRoutesWithLayout: ReactElement<CustomRoutesProps>[];
  customRoutesWithoutLayout: ReactElement<CustomRoutesProps>[];
}) => {
  return getSingleChildFunction(children)
    ? "loading"
    : resources.length > 0 ||
      customRoutesWithLayout.length > 0 ||
      customRoutesWithoutLayout.length > 0
    ? "ready"
    : "empty";
};

/**
 * Inspect the children of a CoreAdminRouter to see if one of them is a function.
 * Throws an error if there are more than one function child.
 * Returns the function child if one was provided, or null otherwise.
 *
 * @param children
 */
const getSingleChildFunction = (
  children: ReactNode
): RenderResourceFunction | null => {
  const childrenArray = Array.isArray(children) ? children : [children];

  const functionChildren = childrenArray.filter(
    (child) => typeof child === "function"
  );

  if (functionChildren.length > 1) {
    throw new Error("You can only provide one function child to AdminRouter");
  }

  if (functionChildren.length === 0) {
    return null;
  }

  return functionChildren[0] as RenderResourceFunction;
};

/**
 * Inspect the children and return an object with the following keys:
 * - customRoutesWithLayout: an array of custom routes to render inside the layout
 * - customRoutesWithoutLayout: an array of custom routes to render outside the layout
 * - resources: an array of resources elements
 *
 * @param children
 */
const getRoutesAndResourceFromNodes = (
  children: ReactNode
): RoutesAndResources => {
  const customRoutesWithLayout: ReactElement<CustomRoutesProps>[] = [];
  const customRoutesWithoutLayout: ReactElement<CustomRoutesProps>[] = [];
  const resources: ReactElement<ResourceProps>[] = [];

  Children.forEach(children, (element) => {
    if (!isValidElement(element)) {
      // Ignore non-elements. This allows people to more easily inline
      // conditionals in their route config.
      return;
    }
    if (element.type === Fragment) {
      const customRoutesFromFragment = getRoutesAndResourceFromNodes(
        element.props.children
      );
      customRoutesWithLayout.push(
        ...customRoutesFromFragment.customRoutesWithLayout
      );
      customRoutesWithoutLayout.push(
        ...customRoutesFromFragment.customRoutesWithoutLayout
      );
      resources.push(...customRoutesFromFragment.resources);
    }
    if ((element.type as any).raName === "CustomRoutes") {
      const customRoutesElement = element as ReactElement<CustomRoutesProps>;

      if (customRoutesElement.props.hasLayout) {
        customRoutesWithoutLayout.push(customRoutesElement.props.children);
      } else {
        customRoutesWithLayout.push(customRoutesElement.props.children);
      }
    } else if ((element.type as any).raName === "Resources") {
      resources.push(element as ReactElement<ResourceProps>);
    }
  });

  return { customRoutesWithLayout, customRoutesWithoutLayout, resources };
};

type RoutesAndResources = {
  customRoutesWithLayout: ReactElement<CustomRoutesProps>[];
  customRoutesWithoutLayout: ReactElement<CustomRoutesProps>[];
  resources: ReactElement<ResourceProps>[];
};

type ResourceWithRegisterFunction = {
  registerResource: (
    props: ResourceProps,
    permissions: any
  ) => ResourceDefinition;
};

type AdminRouterStatus = "loading" | "empty" | "ready";
