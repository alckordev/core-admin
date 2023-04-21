import { ComponentType } from "react";
import { CoreAdminProps } from "./core";
import { AdminContext, AdminUI } from "./core-ui";

export const Admin = (props: AdminProps) => {
  const {
    authProvider,
    basename,
    catchAll,
    children,
    dataProvider,
    dashboard,
    layout,
    loading,
    loginPage,
    authCallbackPage,
    notification,
    requireAuth,
    ready,
    theme,
    title = "Core Admin",
  } = props;

  if (loginPage === true && process.env.NODE_ENV !== "production") {
    console.warn(
      "You passed true to the loginPage prop. You must either pass false to disable it or a component class to customize it"
    );
  }

  return (
    <AdminContext
      authProvider={authProvider}
      dataProvider={dataProvider}
      basename={basename}
      theme={theme}
    >
      <AdminUI
        layout={layout}
        dashboard={dashboard}
        catchAll={catchAll}
        title={title}
        loading={loading}
        loginPage={loginPage}
        authCallbackPage={authCallbackPage}
        notification={notification}
        requireAuth={requireAuth}
        ready={ready}
      >
        {children}
      </AdminUI>
    </AdminContext>
  );
};

export interface AdminProps extends CoreAdminProps {
  theme?: object;
  notification?: ComponentType;
}
