import { Children, ComponentType, createElement, ReactElement } from "react";
import { Location } from "react-router-dom";
import { useAuthenticated } from "./useAuthenticated";
import { usePermissions } from "./usePermissions";

// export interface WithPermissionsChildrenParams {
//   permissions: any;
// }

// type WithPermissionsChildren = (
//   params: WithPermissionsChildrenParams
// ) => ReactElement;

export interface WithPermissionsProps {
  authParams?: object;
  //   children?: WithPermissionsChildren;
  component?: ComponentType<any>;
  location?: Location;
  //   render?: WithPermissionsChildren;
  staticContext?: object;
  [key: string]: any;
}

// const isEmptyChildren = (children: ReactElement) =>
//   Children.count(children) === 0;

/**
 * After checking that the user is authenticated,
 * retrieves the user's permissions for a specific context.
 *
 * Useful for Route components ; used internally by Resource.
 * Use it to decorate your custom page components to require
 * a custom role. It will pass the permissions as a prop to your
 * component.
 *
 * You can set additional `authParams` at will if your authProvider
 * requires it.
 */
const WithPermissions = (props: WithPermissionsProps) => {
  const { authParams, component, staticContext, ...rest } = props;

  // console.log("WithPermissions > component", component);

  useAuthenticated(authParams);

  const { permissions } = usePermissions(authParams);

  if (component) {
    return createElement(component, { permissions, ...rest });
  }
};

export default WithPermissions as ComponentType<WithPermissionsProps>;
