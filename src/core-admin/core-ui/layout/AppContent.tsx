import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

export const AppContent = (props: AppContentProps) => {
  const { children } = props;

  return (
    <Box
      as="main"
      ml={{ base: "70px", md: 250 }}
      transition="all .3s ease-in-out"
      overflow="hidden"
    >
      <Box padding="94px 12px 60px">{children}</Box>
    </Box>
  );
};

export interface AppContentProps {
  children: ReactNode;
}
