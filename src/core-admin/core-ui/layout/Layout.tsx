import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { AppContent } from "./AppContent";
import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

export const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <Box>
      <AppHeader />
      <AppSidebar />
      <AppContent>{children}</AppContent>
      <AppFooter />
    </Box>
  );
};

export interface LayoutProps {
  children: ReactNode;
}
