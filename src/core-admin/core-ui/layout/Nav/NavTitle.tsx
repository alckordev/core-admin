import { Box } from "@chakra-ui/react";

export const NavTitle = (props: NavTitleProps) => {
  const { name } = props;

  return (
    <Box
      color="gray.500"
      fontSize="2xs"
      fontWeight="semibold"
      letterSpacing=".05em"
      opacity={0.5}
      px={3}
      py={5}
      pointerEvents="none"
      textTransform="uppercase"
    >
      {name}
    </Box>
  );
};

export interface NavTitleProps {
  name: string;
}
