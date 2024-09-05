import {
  type NextComponentType,
  type NextPage,
  type NextPageContext,
} from "next";
import { type AppProps } from "next/app";
import { type LayoutKeys } from "./Layouts";

export type MyPage<P = object, IP = P> = NextPage<P, IP> & {
  Layout?: LayoutKeys;
};
export type MyAppProps = AppProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout: LayoutKeys;
  };
};
