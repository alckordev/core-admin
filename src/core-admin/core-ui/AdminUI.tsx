import { ComponentType, Fragment } from "react";
import { CoreAdminUI, CoreAdminUIProps } from "../core/AdminUI";
import { AuthCallback, LoginPage } from "./auth";
import {
  Layout as DefaultLayout,
  LoadingPage,
  NotFound,
  Notification,
} from "./layout";

export const AdminUI = ({ notification, ...rest }: AdminUIProps) => {
  return (
    <Fragment>
      <CoreAdminUI {...rest} />
      {/* notifications */}
    </Fragment>
  );
};

export interface AdminUIProps extends CoreAdminUIProps {
  notification?: ComponentType;
}

AdminUI.defaultProps = {
  layout: DefaultLayout,
  catchAll: NotFound,
  loading: LoadingPage,
  loginPage: LoginPage,
  authCallbackPage: AuthCallback,
  notification: Notification,
};
