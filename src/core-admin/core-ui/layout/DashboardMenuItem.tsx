import { IconDashboard } from "@tabler/icons-react";
import { useBasename } from "../../routing";
import { MenuItemLink, MenuItemLinkProps } from "./MenuItemLink";

export const DashboardMenuItem = (props: DashboardMenuItemProps) => {
  const basename = useBasename();

  const {
    icon = IconDashboard,
    to = `${basename}/`,
    name = "Dashboard",
    ...rest
  } = props;

  return <MenuItemLink to={to} name={name} icon={icon} {...rest} />;
};

export interface DashboardMenuItemProps
  extends Omit<MenuItemLinkProps, "to" | "name"> {
  to?: string;
  name?: string;
}
