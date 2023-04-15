import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { useTheme } from "./useTheme";

/**
 * This sets the Chakra initial theme.
 *
 * @param props
 * @param props.children The rest of yout application
 * @param props.theme The initial theme object
 */
export const ThemeProvider = ({
  children,
  theme: themeOverride,
}: ThemeProviderProps) => {
  const theme = useTheme(themeOverride);

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export interface ThemeProviderProps {
  children: ReactNode;
  theme: object;
}
