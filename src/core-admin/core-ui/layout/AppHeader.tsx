import { Flex, IconButton } from "@chakra-ui/react";
import { IconMenu } from "@tabler/icons-react";
import { Logo } from "./Logo";
import { NotificationMenu } from "./NotificationMenu";
import { ToggleThemeButton } from "./Theme";
import { UserMenu } from "./UserMenu";

export const AppHeader = (props: any) => {
  return (
    <Flex
      as="header"
      align="center"
      bg="gray.868"
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
  );
};
