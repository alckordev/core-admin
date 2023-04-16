import { Box } from "@chakra-ui/react";

export const AppSidebar = (props: AppSidebarProps) => {
  return (
    <Box
      as="nav"
      bg="gray.900"
      bottom={0}
      boxShadow="0 1px 1px rgba(0, 0, 0, .08)"
      mt={0}
      position="fixed"
      top={70}
      width={{ base: "70px", md: 250 }}
      transition="all .3s ease-in-out"
      //   zIndex=""
    >
      SB
    </Box>
  );
};

export interface AppSidebarProps {}
