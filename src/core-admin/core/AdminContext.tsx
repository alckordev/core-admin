import { AdminRouter } from "../routing";
import { AdminChildren, DashboardComponent } from "../types";
import { CoreAdminRoutes } from "./AdminRoutes";

export const CoreAdminContext = (props: CoreAdminContextProps) => {
  const { basename, children } = props;

  return (
    <div>
      <AdminRouter basename={basename}>{children}</AdminRouter>
    </div>
  );
};

export interface CoreAdminContextProps {
  basename?: string;
  children?: AdminChildren;
  // dashboard?: DashboardComponent;
}
