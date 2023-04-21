import { IconDashboard } from "@tabler/icons-react";
import { useBasename } from "../../routing";
import { NavItem, NavItemProps } from "./Nav";

export const DashboardMenuItem = (props: DashboardMenuItemProps) => {
  const basename = useBasename();

  const { to = `${basename}/`, ...rest } = props;

  return <NavItem {...rest} to={to} name="Dashboard" icon={IconDashboard} />;
};

export interface DashboardMenuItemProps
  extends Omit<NavItemProps, "to" | "name"> {
  to?: string;
  name?: string;
}
