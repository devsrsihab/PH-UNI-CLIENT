import { ReactNode } from "react";

//* type for user path
export type TUserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};

//* type for Route
export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};
//* type for Route
export type TRoute = {
  path: string;
  element: ReactNode;
};
