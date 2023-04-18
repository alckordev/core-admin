import { CoreAdminContext, CoreAdminContextProps } from "./CoreAdminContext";
import { CoreAdminUI, CoreAdminUIProps } from "./CoreAdminUI";

export const CoreAdmin = (props: CoreAdminProps) => {
  const {
    basename,
    children,
    dashboard,
    catchAll,
    layout,
    loading,
    loginPage,
    requireAuth,
    ready,
    title,
  } = props;

  return (
    <CoreAdminContext basename={basename}>
      <CoreAdminUI
        layout={layout}
        dashboard={dashboard}
        catchAll={catchAll}
        title={title}
        loading={loading}
        loginPage={loginPage}
        requireAuth={requireAuth}
        ready={ready}
      >
        {children}
      </CoreAdminUI>
    </CoreAdminContext>
  );
};

export interface CoreAdminProps
  extends CoreAdminContextProps,
    CoreAdminUIProps {}
