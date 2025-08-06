import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import colors from "./foundations/colors";
import typography from "./foundations/typography";

const overrides = {
  colors,
  fonts: typography.fonts,
  fontWeights: typography.fontWeights,
  letterSpacings: typography.letterSpacings,
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("gray.50", "navy.900")(props),
        fontFamily: "'Verdana', sans-serif",
        letterSpacing: "-0.5px",
      },
      input: {
        color: mode("gray.700", "gray.300")(props),
      },
      html: {
        fontFamily: "'Verdana', sans-serif",
      },
    }),
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
};

const theme = extendTheme(overrides);

export default theme;
