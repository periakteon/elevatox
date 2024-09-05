import { type PropsWithChildren } from "react";

const NoLayout = (props: PropsWithChildren) => {
  return <>{props.children}</>;
};

export default NoLayout;
