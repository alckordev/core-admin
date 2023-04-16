import {
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IconBell } from "@tabler/icons-react";

export const NotificationMenu = (props: any) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="transparent"
        boxShadow="none"
        height={70}
        position="relative"
        px={4}
        rounded="none"
      >
        <IconBell />
        <Badge
          bg="red"
          height="6px"
          padding={0}
          position="absolute"
          right="16px"
          top="22px"
          rounded="full"
          width="6px"
        />
      </MenuButton>
      <MenuList>
        <MenuItem>Notification 01</MenuItem>
        <MenuItem>Notification 02</MenuItem>
      </MenuList>
    </Menu>
  );
};
