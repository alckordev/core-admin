import { ReactNode, useState } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { NavContext } from "./Nav";

export const AppSidebar = (props: AppSidebarProps) => {
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
            {props.children}
          </NavContext.Provider>
        </Stack>
      </Box>
    </Box>
  );
};

export interface AppSidebarProps {
  children?: ReactNode;
}
