import { useState } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { IconDashboard } from "@tabler/icons-react";
import { NavContext, NavItem, NavTitle } from "./Nav";

export const AppSidebar = (props: AppSidebarProps) => {
  const { navigation } = props;

  const [visibleGroup, setVisibleGroup] = useState("");

  const navContextValues = {
    visibleGroup,
    setVisibleGroup,
  };

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
        <Stack spacing={0} direction="column" pt={3} pb={7}>
          <NavContext.Provider value={navContextValues}>
            <NavTitle name="Menu" />
            <NavItem name="Dashboard" to="/" icon={IconDashboard} />
            <NavItem
              name="Test"
              to="/test"
              badge={{ color: "cyan", text: "New" }}
            />
            <NavTitle name="Pages" />
          </NavContext.Provider>
        </Stack>
      </Box>
    </Box>
  );
};

export interface AppSidebarProps {
  navigation?: object;
}
