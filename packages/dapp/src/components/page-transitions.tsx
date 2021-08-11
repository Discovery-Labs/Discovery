import React from "react";
import { SlideFade } from "@chakra-ui/react";

interface Children {
  children: React.ReactNode
}
const PageTransition = (props: Children) => {
  return <SlideFade in>{props.children}</SlideFade>;
};

export default PageTransition;
