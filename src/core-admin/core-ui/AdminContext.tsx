import { CoreAdminContext } from "../core";
import { defaultTheme } from "./defaultTheme";
import { ThemeProvider } from "./layout";

export const AdminContext = (props: any) => {
  const { theme = defaultTheme, children, ...rest } = props;

  return (
    <CoreAdminContext {...rest}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CoreAdminContext>
  );
};
