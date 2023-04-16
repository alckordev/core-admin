import { IconButton, useColorMode } from "@chakra-ui/react";
import { IconMoon, IconSun } from "@tabler/icons-react";

export const ToggleThemeButton = (props: any) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Change theme"
      icon={colorMode === "dark" ? <IconMoon /> : <IconSun />}
      bg="transparent"
      boxShadow="none"
      height={70}
      px={4}
      rounded="none"
      onClick={toggleColorMode}
    />
  );
};
