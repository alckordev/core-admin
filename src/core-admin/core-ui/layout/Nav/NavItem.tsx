import { Badge, Box, Link, Text } from "@chakra-ui/react";
import { IconArrowBadgeRight, TablerIconsProps } from "@tabler/icons-react";
import { ComponentType } from "react";
import { NavTitleProps } from "./NavTitle";

export const NavItem = (props: NavItemProps) => {
  const { name, to, icon: Icon = IconArrowBadgeRight, badge } = props;

  return (
    <Box>
      <Link href={to}>
        <Icon size={16} />
        <Text>{name}</Text>
        {badge && <Badge colorScheme={badge.color}>{badge.text}</Badge>}
      </Link>
    </Box>
  );
};

export interface NavItemProps extends NavTitleProps {
  to: string;
  icon?: ComponentType<TablerIconsProps | any>;
  badge?: {
    color:
      | "gray"
      | "red"
      | "orange"
      | "yellow"
      | "green"
      | "teal"
      | "blue"
      | "cyan"
      | "purple"
      | "pink";
    text: string;
  };
}
