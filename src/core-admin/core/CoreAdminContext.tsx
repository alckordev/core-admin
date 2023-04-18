import { AdminRouter } from "../routing";
import { AdminChildren, DashboardComponent } from "../types";

export const CoreAdminContext = (props: CoreAdminContextProps) => {
  const { basename, children } = props;

  return (
    <div data-context="authProvider">
      <AdminRouter basename={basename}>{children}</AdminRouter>
    </div>
  );
};

export interface CoreAdminContextProps {
  basename?: string;
  children?: AdminChildren;
}
