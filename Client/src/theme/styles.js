import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  colors: {
    brand: {
      50: "#e0f7fa",  // very light cyan
      100: "#b2ebf2",
      200: "#80deea",
      300: "#4dd0e1",
      400: "#26c6da",
      500: "#00bcd4", // Main cyan/teal color - similar to logo cyan
      600: "#00acc1",
      700: "#0097a7",
      800: "#00838f",
      900: "#006064",
    },
    brandScheme: {
      100: "#b2ebf2",
      200: "#26c6da",
      300: "#26c6da",
      400: "#26c6da",
      500: "#00bcd4",
      600: "#00acc1",
      700: "#0097a7",
      800: "#00838f",
      900: "#0097a7",
    },
    brandTabs: {
      100: "#b2ebf2",
      200: "#80deea",
      300: "#80deea",
      400: "#80deea",
      500: "#80deea",
      600: "#0097a7",
      700: "#00838f",
      800: "#006064",
      900: "#0097a7",
    },
    secondaryGray: {
      100: "#e1e8f0",
      200: "#d5dfe9",
      300: "#cbd5e3",
      400: "#bec8d6",
      500: "#8f9bbf",
      600: "#6e7ba8",
      700: "#536396",
      800: "#425283",
      900: "#2a3a66",
    },
    red: {
      100: "#ffebee",
      500: "#f44336",
      600: "#e53935",
    },
    blue: {
      50: "#e3f2fd",
      500: "#2196f3",
    },
    orange: {
      100: "#fff3e0",
      500: "#ffb74d",
    },
    green: {
      100: "#e0f2f1",
      400: "#26a69a",
      500: "#009688",
    },
    navy: {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3",
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
    },
    gray: {
      100: "#f7fafc",
      200: "#edf2f7",
      300: "#e2e8f0",
      400: "#cbd5e0",
      500: "#a0aec0",
      600: "#718096",
      700: "#4a5568",
      800: "#2d3748",
      900: "#1a202c",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("secondaryGray.300", "navy.900")(props),
        fontFamily: "Verdana, sans-serif",
        letterSpacing: "-0.5px",
      },
      input: {
        color: mode("gray.700", "gray.300")(props),
      },
      html: {
        fontFamily: "Verdana, sans-serif",
      },
    }),
  },
};
