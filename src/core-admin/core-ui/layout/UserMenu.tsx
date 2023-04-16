import {
  Avatar,
  Badge,
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  IconChevronDown,
  IconPower,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";

export const UserMenu = (props: any) => {
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
        <HStack>
          <Avatar name="Username" size="sm" src="" />
          <VStack
            display={{ base: "none", md: "flex" }}
            align="flex-start"
            spacing="1px"
            ml={3}
          >
            <Text fontSize="sm">Jane Doe</Text>
            <Text fontSize="xs" color="gray.600">
              Admin
            </Text>
          </VStack>
          <Box display={{ base: "none", md: "flex" }} ml={3}>
            <IconChevronDown size={16} />
          </Box>
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem icon={<IconUser size={16} />}>Profile</MenuItem>
        <MenuItem icon={<IconSettings size={16} />}>Settings</MenuItem>
        <MenuDivider />
        <MenuItem icon={<IconPower size={16} />}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};
