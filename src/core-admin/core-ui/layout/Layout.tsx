import { ComponentType, HtmlHTMLAttributes } from "react";
import { Box } from "@chakra-ui/react";
import { CoreLayoutProps } from "../../types";
import { AppContent } from "./AppContent";
import { AppFooter } from "./AppFooter";
import { AppHeader as DefaultAppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { Menu as DefaultMenu } from "./Menu";

export const Layout = (props: LayoutProps) => {
  const {
    appHeader: AppHeader = DefaultAppHeader,
    children,
    dashboard,
    // error: errorComponent,
    menu: Menu = DefaultMenu,
  } = props;

  // console.log("Layout > dashboard", dashboard);

  return (
    <Box>
      <AppHeader />
      <AppSidebar>
        <Menu hasDashboard={!!dashboard} />
      </AppSidebar>
      <AppContent>{children}</AppContent>
      <AppFooter />
    </Box>
  );
};

export interface LayoutProps
  extends CoreLayoutProps,
    Omit<HtmlHTMLAttributes<HTMLDivElement>, "title"> {
  appHeader?: ComponentType<any>; // definir props
  error?: ComponentType<any>; // definir props
  menu?: ComponentType<any>; // definir props
}
