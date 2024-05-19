import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  colors: {
    blue: "#0076ff",
    blueHover: "#3391FF",
    green: "#10b981",
    white: "#ffffff",
    red: "#E1341E",
    transparent: "transparent",
    light: "#F6F6F6 ",
    darkBlue: "#004f98",
    greenScheme: {
      500: "#10b981",
    },
    switchBlueScheme: {
      500: "#0076ff",
    },
  },
  fonts: {
    heading: "Arial, serif",
    body: "sans-serif",
    mono: "Menlo, monospace",
  },
  breakpoints: {
    footerXM: "402px",
    footerSM: "620px",
    sm: "640px",
    md: "768px",
    nav: "850px",
    ml: "896px",
    lg: "1024px",
    xl: "1280px",
    xxl: "1600px",
  },
  Popover: {
    variants: {
      responsive: {
        popper: {
          maxWidth: "unset",
          width: "unset",
        },
      },
    },
  },
  fontSizes: {
    menuSize: "lg",
  },
  fontWeights: {},
  lineHeights: {},
  letterSpacings: {},
});
export default theme;