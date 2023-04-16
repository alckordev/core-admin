import {
  Box,
  Container,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconHeartFilled } from "@tabler/icons-react";

export const AppFooter = (props: AppFooterProps) => {
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box
      as="footer"
      bg={bgColor}
      bottom={0}
      boxShadow="0 1px 1px rgba(0, 0, 0, .08)"
      color="gray.500"
      height="60px"
      left={{ base: "70px", md: 250 }}
      px="12px"
      py="20px"
      position="absolute"
      transition="all .3s ease-in-out"
      right={0}
    >
      <Container
        as={Flex}
        align="center"
        justify="space-between"
        maxW="100%"
        px={2}
      >
        <Text>2023 © Upzet.</Text>
        <Text
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          gap={1}
        >
          Crafted with <Box as={IconHeartFilled} size={16} color="red" /> by
          Alckor
        </Text>
      </Container>
    </Box>
  );
};

export interface AppFooterProps {}
