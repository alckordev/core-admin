import { ComponentType, forwardRef } from "react";
import { Link, LinkProps, useMatch } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { TablerIconsProps } from "@tabler/icons-react";
import { useBasename } from "../../routing";
// import { motion } from "framer-motion";

export const MenuItemLink = forwardRef<any, MenuItemLinkProps>((props, ref) => {
  const { icon: Icon, onClick, name } = props;

  const basename = useBasename();

  const to =
    (typeof props.to === "string" ? props.to : props.to.pathname) || "";

  const match = useMatch({ path: to, end: to === `${basename}/` });

  return (
    <Box as="li" display="block" width="full" ref={ref}>
      <Box
        as={Link}
        to={to}
        onClick={onClick}
        display="block"
        opacity={!!match ? 1 : 0.5}
        px={6}
        py={3}
        _hover={{ opacity: 1 }}
      >
        <Box
          as={Icon}
          size={20}
          display="inline-block"
          verticalAlign="text-bottom"
          mr={2}
        />
        <Text as="span">{name}</Text>
      </Box>
    </Box>
  );
});

export type MenuItemLinkProps = LinkProps & {
  name: string;
  icon?: ComponentType<TablerIconsProps | any>;
};
