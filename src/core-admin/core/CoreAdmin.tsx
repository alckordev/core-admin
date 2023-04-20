import { CoreAdminContext, CoreAdminContextProps } from "./CoreAdminContext";
import { CoreAdminUI, CoreAdminUIProps } from "./CoreAdminUI";

export const CoreAdmin = (props: CoreAdminProps) => {
  const {
    basename,
    children,
    dataProvider,
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
    <CoreAdminContext dataProvider={dataProvider} basename={basename}>
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
