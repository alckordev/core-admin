import { ReactNode } from "react";
import { AdminContext } from "../core-ui/AdminContext";

export const CoreAdmin = (props: CoreAdminProps) => {
  const { children, theme } = props;

  return <AdminContext theme={theme}>{children}</AdminContext>;
};

export interface CoreAdminProps {
  children: ReactNode;
  theme?: object;
}
