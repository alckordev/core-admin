import { ReactNode } from "react";
import { HashRouter } from "react-router-dom";
import { BasenameContext } from "./BasenameContext";

export const AdminRouter = (props: AdminRouterProps) => {
  const { basename, children } = props;

  return (
    <BasenameContext.Provider value={basename ? basename : ""}>
      <HashRouter basename={basename}>{children}</HashRouter>
    </BasenameContext.Provider>
  );
};

export interface AdminRouterProps {
  basename?: string;
  children: ReactNode;
}
