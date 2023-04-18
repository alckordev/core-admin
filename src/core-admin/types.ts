import { ComponentType, ReactElement, ReactNode } from "react";

/**
 * Misc types
 */
export type ResourceElement = ReactElement<ResourceProps>;

export type RenderResourceFunction = (permissions: any) =>
  | ReactNode // (permissions) => <><Resource /><Resource /><Resource /></>;
  | Promise<ReactNode> // (permissions) => fetch().then(() => <><Resource /><Resource /><Resource /></>)
  | ResourceElement[] // (permissions) => [<Resource />, <Resource />, <Resource />]
  | Promise<ReactElement[]>; // (permissions) => fetch().then(() => [<Resource />, <Resource />, <Resource />])

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

export interface ResourceProps {}
