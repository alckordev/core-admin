import { ReactNode } from "react";
import { DashboardMenuItem } from "./DashboardMenuItem";
import { ResourceMenuItem } from "./ResourceMenuItem";
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
        .map((name) => <ResourceMenuItem key={name} name={name} />),
    ],
  } = props;

  return children;
};

export interface MenuProps {
  children?: ReactNode;
  hasDashboard?: boolean;
}
