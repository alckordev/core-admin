import { Box, Flex, IconButton, useColorModeValue } from "@chakra-ui/react";
import { IconMenu } from "@tabler/icons-react";
import { Logo } from "./Logo";
import { NotificationMenu } from "./NotificationMenu";
import { ToggleThemeButton } from "./Theme";
import { UserMenu } from "./UserMenu";

export const AppHeader = (props: AppHeaderProps) => {
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box
      as="header"
      bg={bgColor}
      boxShadow="0 1px 1px rgba(0, 0, 0, .08)"
      left={0}
      position="fixed"
      right={0}
      top={0}
      zIndex="1002"
    >
      <Flex
        align="center"
        height={70}
        justify="space-between"
        mx="auto"
        pr="12px"
      >
        <Flex>
          <Logo />
          <IconButton
            aria-label="Menu"
            icon={<IconMenu />}
            bg="transparent"
            boxShadow="none"
            height={70}
            px={4}
            rounded="none"
          />
        </Flex>
        <Flex>
          <ToggleThemeButton />
          <NotificationMenu />
          <UserMenu />
        </Flex>
      </Flex>
    </Box>
  );
};

export interface AppHeaderProps {}
