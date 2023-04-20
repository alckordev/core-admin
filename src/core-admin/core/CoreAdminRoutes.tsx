import { ComponentType, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  AdminChildren,
  CatchAllComponent,
  CoreLayoutProps,
  LayoutComponent,
  LoadingComponent,
} from "../types";
import { useConfigureRouterFromChildren } from "./useConfigureRouterFromChildren";

export const CoreAdminRoutes = (props: CoreAdminRoutesProps) => {
  const {
    layout: Layout,
    catchAll: CatchAll,
    children,
    loading: LoadingPage,
    requireAuth,
    ready: Ready,
    title,
    dashboard,
  } = props;

  const {
    customRoutesWithLayout,
    customRoutesWithoutLayout,
    resources,
    status,
  } = useConfigureRouterFromChildren(children);

  const [canRender, setCanRender] = useState(!requireAuth);

  useEffect(() => {
    if (requireAuth) {
      // checkAuth
    }
  }, [requireAuth]);

  console.log("CoreAdminRoutes > resources", resources);

  return (
    <Routes>
      {/* Render custom routes wirhout layout */}
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              {/* Render custom routes wirhout layout */}
              {/* Only for test */}
              <Route path="/users/*" element={<Resource />} />
              <Route path="/" element={<h3>Dashboard</h3>} />
              <Route path="*" element={<h3>Catch All</h3>} />
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
  ready?: ComponentType;
}

/**
 * @deprecate only for test
 */
function Resource() {
  return (
    <Routes>
      <Route path="/" element={<h3>User</h3>} />
      <Route path="/:id" element={<h3>User detail</h3>} />
    </Routes>
  );
}
