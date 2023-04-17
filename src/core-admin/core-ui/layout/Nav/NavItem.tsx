import { ComponentType } from "react";
// import { Link as RLink } from "react-router-dom";
import { Badge, Box, Text } from "@chakra-ui/react";
import { IconArrowBadgeRight, TablerIconsProps } from "@tabler/icons-react";
import { motion, Variants } from "framer-motion";
import { NavTitleProps } from "./NavTitle";

export const NavItemVarians: Variants = {
  normal: {
    opacity: 0.5,
  },
  hover: {
    opacity: 1,
  },
};

export const NavItem = (props: NavItemProps) => {
  const { name, to, icon: Icon = IconArrowBadgeRight, badge } = props;

  return (
    <Box as={motion.div} initial="normal" whileHover="hover">
      <Box position="relative" px={3} py={3} whiteSpace="nowrap">
        <Box
          as={Icon}
          size={20}
          display="inline-block"
          mr={2}
          verticalAlign="text-bottom"
        />
        <Text display="inline-block">
          {name}
          {badge && (
            <Badge
              colorScheme={badge.color}
              position="absolute"
              top="15px"
              right={3}
            >
              {badge.text}
            </Badge>
          )}
        </Text>
      </Box>
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
