import { ReactNode } from "react";
import { css, Global } from "@emotion/react";
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

  // console.log("ThemeProvider", theme);

  return (
    <ChakraProvider theme={theme}>
      <Global
        styles={css`
          body {
            position: static;
          }
        `}
      />
      {children}
    </ChakraProvider>
  );
};

export interface ThemeProviderProps {
  children: ReactNode;
  theme: object;
}
