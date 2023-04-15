import { useMemo } from "react";
import { useTheme as useChakraTheme } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/theme-utils";

export const useTheme = (themeOverride?: object) => {
  const chakraTheme = useChakraTheme();

  const initialTheme = themeOverride || chakraTheme;

  const theme = useMemo(() => extendTheme(initialTheme), [initialTheme]);

  return theme;
};
