import { Flex, Heading, VStack, Text } from "@chakra-ui/react";

export const Ready = () => {
  return (
    <Flex align="center" justify="center" minWidth="100vw" minHeight="100vh">
      <VStack>
        <Heading>Core Admin, is ready!</Heading>
        <Text>You can now add resources</Text>
      </VStack>
    </Flex>
  );
};
