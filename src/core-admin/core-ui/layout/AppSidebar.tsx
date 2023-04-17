import { Box, Stack } from "@chakra-ui/react";
import { IconDashboard } from "@tabler/icons-react";
import { NavItem, NavTitle } from "./Nav";

export const AppSidebar = (props: AppSidebarProps) => {
  const { navigation } = props;

  console.log("IconDashboard", IconDashboard);
  console.log("typeof IconDashboard", typeof IconDashboard);

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
      <Box>
        <Stack spacing={0} direction="column">
          <NavTitle name="Menu" />
          <NavItem name="Dashboard" to="/" icon={IconDashboard} />
          <NavTitle name="Pages" />
        </Stack>
      </Box>
    </Box>
  );
};

export interface AppSidebarProps {
  navigation?: object;
}
