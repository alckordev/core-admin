import { ComponentType, ReactElement, ReactNode } from "react";
import { TablerIconsProps } from "@tabler/icons-react";
import { AuthActionType } from "./auth";

/**
 * Data types
 */
export type Identifier = string | number;

export interface CustomRecord {
  id: Identifier;
  [key: string]: any;
}

export interface UserIdentity {
  id: Identifier;
  fullName?: string;
  avatar?: string;
  [key: string]: any;
}

/**
 * Auth provider types
 */
export type AuthProvider = {
  login: (
    params: any
  ) => Promise<{ redirectTo?: string | boolean } | void | any>;
  logout: (params: any) => Promise<void | false | string>;
  checkAuth: (params: any) => Promise<void>;
  checkError: (params: any) => Promise<void>;
  getPermissions: (params: any) => Promise<any>;
  getIdentity?: () => Promise<UserIdentity>;
  handleCallback?: () => Promise<AuthRedirectResult | void | any>;
  [key: string]: any;
};

export type AuthRedirectResult = {
  redirectTo?: string | false;
  logoutOnFailure?: boolean;
};

export type LegacyAuthProvider = (
  type: AuthActionType,
  params?: any
) => Promise<any>;

/**
 * Data provider types
 */
export type DataProvider<ResourceType extends string = string> = {
  getList: <RecordType extends CustomRecord = any>(
    resource: ResourceType,
    params: GetListParams
  ) => Promise<GetListResult<RecordType>>;

  getOne: <RecordType extends CustomRecord = any>(
    resource: ResourceType,
    params: GetOneParams
  ) => Promise<GetOneResult<RecordType>>;

  [key: string]: any;
};

export interface GetListParams {
  pagination: any;
  sort: any;
  filter: any;
  meta?: any;
}

export interface GetListResult<RecordType extends CustomRecord = any> {
  data: RecordType[];
  total?: number;
  pageInfo?: {
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
  };
}

export interface GetOneParams<RecordType extends CustomRecord = any> {
  id: RecordType["id"];
  meta?: any;
}

export interface GetOneResult<RecordType extends CustomRecord = any> {
  data: RecordType;
}

export type LegacyDataProvider = (
  type: string,
  resource: string,
  params: any
) => Promise<any>;

export type RecordToStringFunction = (record: any) => string;

export interface ResourceDefinition {
  readonly name: string;
  readonly options?: any;
  readonly hasList?: boolean;
  readonly hasEdit?: boolean;
  readonly hasShow?: boolean;
  readonly hasCreate?: boolean;
  readonly icon?: any;
  readonly recordRepresentation?:
    | ReactElement
    | RecordToStringFunction
    | string;
}

/**
 * Misc types
 */
export type ResourceElement = ReactElement<ResourceProps>;

export type RenderResourceFunction = (permissions: any) => Promise<
  | ReactNode // (permissions) => <><Resource /><Resource /><Resource /></>;
  | Promise<ReactNode> // (permissions) => fetch().then(() => <><Resource /><Resource /><Resource /></>)
  | ResourceElement[] // (permissions) => [<Resource />, <Resource />, <Resource />]
  | Promise<ReactElement[]> // (permissions) => fetch().then(() => [<Resource />, <Resource />, <Resource />])
>;

export type AdminChildren = RenderResourceFunction | ReactNode;

export type TitleComponent = string | ReactElement<any>;

export type CatchAllComponent = ComponentType<{ title?: TitleComponent }>;

export type LoginComponent = ComponentType<{}> | ReactElement<any>;

export type DashboardComponent = ComponentType<any>;

export type LayoutComponent = ComponentType<CoreLayoutProps>;

export type LoadingComponent = ComponentType<any>;

export interface CoreLayoutProps {
  children?: ReactNode;
  dashboard?: DashboardComponent;
  title?: TitleComponent;
}

export interface ResourceOptions {
  label?: string;
  [key: string]: any;
}

export interface ResourceProps {
  intent?: "route" | "registration";
  name: string;
  list?: ComponentType<any> | ReactElement;
  create?: ComponentType<any> | ReactElement;
  edit?: ComponentType<any> | ReactElement;
  show?: ComponentType<any> | ReactElement;
  hasCreate?: boolean;
  hasEdit?: boolean;
  hasShow?: boolean;
  icon?: ComponentType<TablerIconsProps | any>;
  recordRepresentation?: ReactElement | RecordToStringFunction | string;
  options?: ResourceOptions;
  children?: ReactNode;
}
