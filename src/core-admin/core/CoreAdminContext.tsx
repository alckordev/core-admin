import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  AuthContext,
  convertLegacyAuthProvider,
  defaultAuthProvider,
} from "../auth";
import {
  convertLegacyDataProvider,
  DataProviderContext,
  defaultDataProvider,
} from "../data-provider";
import { AdminRouter } from "../routing";
import {
  AdminChildren,
  AuthProvider,
  DataProvider,
  LegacyAuthProvider,
  LegacyDataProvider,
} from "../types";

export const CoreAdminContext = (props: CoreAdminContextProps) => {
  const { authProvider, basename, children, dataProvider, queryClient } = props;

  if (!dataProvider) {
    throw new Error(
      `Missing dataProvider prop. core-admin requires a valid dataProvider function to work.`
    );
  }

  const finalQueryClient = useMemo(
    () => queryClient || new QueryClient(),
    [queryClient]
  );

  const finalAuthProvider = useMemo(
    () =>
      authProvider instanceof Function
        ? convertLegacyAuthProvider(authProvider)
        : authProvider,
    [authProvider]
  );

  const finalDataProvider = useMemo(
    () =>
      dataProvider instanceof Function
        ? convertLegacyDataProvider(dataProvider)
        : dataProvider,
    [dataProvider]
  );

  return (
    <AuthContext.Provider value={finalAuthProvider}>
      <DataProviderContext.Provider value={finalDataProvider}>
        <QueryClientProvider client={finalQueryClient}>
          <AdminRouter basename={basename}>{children}</AdminRouter>
        </QueryClientProvider>
      </DataProviderContext.Provider>
    </AuthContext.Provider>
  );
};

export interface CoreAdminContextProps {
  authProvider?: AuthProvider | LegacyAuthProvider;
  basename?: string;
  children?: AdminChildren;
  dataProvider?: DataProvider | LegacyDataProvider;
  queryClient?: QueryClient;
}

CoreAdminContext.defaultProps = {
  authProvider: defaultAuthProvider,
  dataProvider: defaultDataProvider,
};
