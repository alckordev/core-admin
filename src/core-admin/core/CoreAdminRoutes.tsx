import { Children, ComponentType, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { defaultAuthParams, useCheckAuth, WithPermissions } from "../auth";
import {
  AdminChildren,
  CatchAllComponent,
  CoreLayoutProps,
  LayoutComponent,
  LoadingComponent,
} from "../types";
import { useTimeout } from "../utils";
import { useCreatePath } from "../routing";
import { useConfigureRouterFromChildren } from "./useConfigureRouterFromChildren";

export const CoreAdminRoutes = (props: CoreAdminRoutesProps) => {
  const {
    layout: Layout,
    catchAll: CatchAll,
    children,
    dashboard,
    loading: LoadingPage,
    requireAuth,
    ready: Ready,
    title,
  } = props;

  const oneSecondHasPassed = useTimeout(1000);

  const {
    customRoutesWithLayout,
    customRoutesWithoutLayout,
    resources,
    status,
  } = useConfigureRouterFromChildren(children);

  const [canRender, setCanRender] = useState(!requireAuth);

  const checkAuth = useCheckAuth();

  const createPath = useCreatePath();

  useEffect(() => {
    if (requireAuth) {
      checkAuth()
        .then(() => {
          setCanRender(true);
        })
        .catch(() => {});
    }
  }, [checkAuth, requireAuth]);

  console.log("CoreAdminRoutes > resources", resources);
  console.log("CoreAdminRoutes > status", status);

  if (status === "empty") {
    return <Ready />;
  }

  if (status === "loading" || !canRender) {
    return (
      <Routes>
        {customRoutesWithoutLayout}
        {oneSecondHasPassed ? (
          <Route path="*" element={<LoadingPage />} />
        ) : (
          <Route path="*" element={null} />
        )}
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Render custom routes wirhout layout */}
      {customRoutesWithoutLayout}
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              {/* Render custom routes with layout */}
              {customRoutesWithLayout}
              {Children.map(resources, (resource) => (
                <Route
                  key={resource.props.name}
                  path={`${resource.props.name}/*`}
                  element={resource}
                />
              ))}
              <Route
                path="/"
                element={
                  dashboard ? (
                    <WithPermissions
                      authParams={defaultAuthParams}
                      component={dashboard}
                    />
                  ) : resources.length > 0 ? (
                    <Navigate
                      to={createPath({
                        resource: resources[0].props.name,
                        type: "list",
                      })}
                    />
                  ) : null
                }
              />
              <Route path="*" element={<CatchAll title={title} />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};

export interface CoreAdminRoutesProps
  extends Omit<CoreLayoutProps, "children"> {
  layout: LayoutComponent;
  catchAll: CatchAllComponent;
  children?: AdminChildren;
  loading: LoadingComponent;
  requireAuth?: boolean;
  ready: ComponentType;
}
