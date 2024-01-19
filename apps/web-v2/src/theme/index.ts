import { theme } from "@chakra-ui/react";

import { colors } from "./colors";

export const senseTheme = {
  ...theme,
  config: {
    ...theme.config,
    initialColorMode: "system",
    useSystemColorMode: true,
  },
  styles: {
    ...theme.styles,
    global: {
      "html, body": {
        //color: "text.black.high",
        //bg: "brand.gray.50",
        fontFamily: "body",
        lineHeight: "base",
        fontSize: "md",
        fontWeight: "normal",
        letterSpacing: "normal",
      },
      svg: {
        fill: "currentColor",
      },
    },
  },
  fonts: {
    body: "'Lexend Variable', sans-serif",
    heading: "'Imagine', sans-serif",
    mono: "'Source Code Pro Variable', monospace",
  },
  sizes: {
    ...theme.sizes,
    container: {
      ...theme.sizes.container,
      "2xl": "1536px",
    },
  },
  colors,
  components: {
    ...theme.components,
  },
};
