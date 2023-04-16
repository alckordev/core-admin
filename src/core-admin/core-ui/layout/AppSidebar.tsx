import { Box } from "@chakra-ui/react";

export const AppSidebar = (props: AppSidebarProps) => {
  const { navigation } = props;

  return (
    <Box
      as="nav"
      bg="gray.800"
      bottom={0}
      boxShadow="0 1px 1px rgba(0, 0, 0, .08)"
      mt={0}
      position="fixed"
      top={70}
      width={{ base: "70px", md: 250 }}
      transition="all .3s ease-in-out"
      zIndex="1001"
    >
      <Box>SB</Box>
    </Box>
  );
};

export interface AppSidebarProps {
  navigation?: object;
}
