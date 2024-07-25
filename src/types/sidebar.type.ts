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
} | undefined;
//* type for Route
export type TRoute = {
  path: string;
  element: ReactNode;
};
