import React from "react";

import {
  ChakraProvider,
  ColorModeScript,
  ColorModeScriptProps,
} from "@chakra-ui/react";

import { senseTheme } from "../theme";
import { ToggleColorModeHotkey } from "./ToggleColorModeHotkey";

type InicialColorMode = ColorModeScriptProps["initialColorMode"];

export type LayoutDefaultProps = React.PropsWithoutRef<{
  children: React.ReactNode;
}>;

export const LayoutDefault: React.FC<LayoutDefaultProps> = ({ children }) => {
  return (
    <ChakraProvider theme={senseTheme}>
      <ColorModeScript
        initialColorMode={
          senseTheme?.config?.initialColorMode as InicialColorMode
        }
      />
      <ToggleColorModeHotkey />
      {children}
    </ChakraProvider>
  );
};
