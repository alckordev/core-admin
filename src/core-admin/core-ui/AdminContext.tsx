import { defaultTheme } from "./defaultTheme";
import { ThemeProvider } from "./layout";

export const AdminContext = (props: any) => {
  const { theme = defaultTheme, children, ...rest } = props;

  return (
    <div {...rest}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </div>
  );
};
