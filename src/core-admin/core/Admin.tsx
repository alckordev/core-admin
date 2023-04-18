import { ComponentType } from "react";
import { AdminContext, AdminUI } from "../core-ui";
import { CoreAdminContextProps } from "./AdminContext";
import { CoreAdminUIProps } from "./AdminUI";

export const CoreAdmin = (props: CoreAdminProps) => {
  const {
    basename,
    children,
    dashboard,
    catchAll,
    layout,
    loading,
    authCallbackPage,
    loginPage,
    requireAuth,
    ready,
    title,
    theme,
    notification,
  } = props;

  return (
    <AdminContext basename={basename} theme={theme}>
      <AdminUI
        layout={layout}
        catchAll={catchAll}
        dashboard={dashboard}
        loading={loading}
        loginPage={loginPage}
        authCallbackPage={authCallbackPage}
        requireAuth={requireAuth}
        ready={ready}
        title={title}
        notification={notification}
      >
        {children}
      </AdminUI>
    </AdminContext>
  );
};

export interface CoreAdminProps
  extends CoreAdminContextProps,
    CoreAdminUIProps {
  theme?: object;
  notification?: ComponentType;
}
