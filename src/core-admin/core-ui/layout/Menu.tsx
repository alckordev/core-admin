import { ReactNode } from "react";
import { NavItem } from "./Nav";
import { DashboardMenuItem } from "./DashboardMenuItem";
import { useResourceDefinitions } from "../../core/useResourceDedinitions";

export const Menu = (props: MenuProps) => {
  const resources = useResourceDefinitions();

  const {
    hasDashboard,
    children = [
      hasDashboard ? (
        <DashboardMenuItem key="default-dashboard-menu-item" />
      ) : null,
      ...Object.keys(resources)
        .filter((name) => resources[name].hasList)
        .map((name) => <NavItem key={name} name={name} to="/" />),
    ],
  } = props;

  // console.log("Menu > hasDashboard", hasDashboard);

  return children;
};

export interface MenuProps {
  children?: ReactNode;
  hasDashboard?: boolean;
  //   [key: string]: any;
}
