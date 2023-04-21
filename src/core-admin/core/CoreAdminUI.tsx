import { ComponentType, createElement, Fragment, isValidElement } from "react";
import { Route, Routes } from "react-router-dom";
import {
  AdminChildren,
  CatchAllComponent,
  CoreLayoutProps,
  DashboardComponent,
  LayoutComponent,
  LoadingComponent,
  LoginComponent,
  TitleComponent,
} from "../types";
import { Ready } from "../utils";
import { CoreAdminRoutes } from "./CoreAdminRoutes";

const DefaultLayout = ({ children }: CoreLayoutProps) => (
  <Fragment>{children}</Fragment>
);

const createOrGetElement = (el: any) =>
  isValidElement(el) ? el : createElement(el);

const Noop = () => null;

export const CoreAdminUI = (props: CoreAdminUIProps) => {
  const {
    catchAll = Noop,
    children,
    dashboard,
    layout = DefaultLayout,
    loading = Noop,
    authCallbackPage: LoginCallbackPage = false,
    loginPage: LoginPage = false,
    requireAuth,
    ready = Ready,
    title = "Core Admin",
  } = props;

  // console.log("CoreAdminUI > dashboard", dashboard);

  return (
    <Routes>
      {/*  */}
      {LoginPage !== false && LoginPage !== true ? (
        <Route path="/login" element={createOrGetElement(LoginPage)} />
      ) : null}

      {/* LoginCallbackPage */}

      <Route
        path="/*"
        element={
          <CoreAdminRoutes
            catchAll={catchAll}
            dashboard={dashboard}
            layout={layout}
            loading={loading}
            requireAuth={requireAuth}
            ready={ready}
            title={title}
          >
            {children}
          </CoreAdminRoutes>
        }
      />
    </Routes>
  );
};

export interface CoreAdminUIProps {
  catchAll?: CatchAllComponent;
  children?: AdminChildren;
  dashboard?: DashboardComponent;
  layout?: LayoutComponent;
  loading?: LoadingComponent;
  authCallbackPage?: ComponentType | boolean;
  loginPage?: LoginComponent | boolean;
  requireAuth?: boolean;
  ready?: ComponentType;
  title?: TitleComponent;
}
