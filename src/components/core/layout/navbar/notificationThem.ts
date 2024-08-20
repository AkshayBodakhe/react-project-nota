import { createTheme } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title1: true;
    title2: true;
    title3: true;
    lgBody1: true;
    lgBody2: true;
    body3: true;
    body4: true;
    body5: true;
    body6: true;
    link: true;
  }
}
interface ExtendedTypographyOptions extends TypographyOptions {
  title1: React.CSSProperties;
  title2: React.CSSProperties;
  title3: React.CSSProperties;
  lgBody1: React.CSSProperties;
  lgBody2: React.CSSProperties;
  body3: React.CSSProperties;
  body4: React.CSSProperties;
  body5: React.CSSProperties;
  body6: React.CSSProperties;
  link: React.CSSProperties;
}

// Typescript module augmentation
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    // xxs: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    lg1: true;
    xl: true;
    xl1: true;
    xxl: true;
  }
}

const palette = {
  primary: {
    main: "#35599D",
    light: "#486CB1"
  },
  secondary: {
    main: "#fff"
  },
  background: {
    default: "#DDDDDD"
  },
  common: { white: "#FFF" }
};

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // Extra small devices (portrait phones)
      sm: 600, // Small devices (landscape phones)
      md: 960, // Medium devices (tablets)
      lg: 1280, // Large devices (desktops)
      lg1: 1366, // Large devices (desktops)
      xl: 1440, // Extra large devices (large desktops)
      xl1: 1536, // Large devices (desktops)
      xxl: 1920 // Extra extra large devices (large desktops)
    }
  },
  palette: {
    primary: {
      main: palette.primary.main,
      light: palette.primary.light
    },
    secondary: {
      main: palette.secondary.main
    },
    background: {
      default: palette.background.default
    }
  },
  typography: {
    fontFamily: "Figtree, sans-serif",

    title1: {
      fontFamily: "Figtree, sans-serif",
      fontSize: "18px",
      letterSpacing: "0.25%"
    },
    title2: {
      fontFamily: "Figtree, sans-serif",
      fontSize: "16px",
      letterSpacing: "0.15%"
    },
    title3: {
      fontFamily: "Figtree, sans-serif",
      fontSize: "14px",
      letterSpacing: "1%"
    },
    lgBody1: {
      fontFamily: "Figtree, sans-serif",
      fontSize: "24px",
      letterSpacing: "1%"
    },
    lgBody2: {
      fontFamily: "Figtree, sans-serif",
      fontSize: "18px",
      letterSpacing: "0.8%"
    },
    body3: {
      fontFamily: "Figtree, sans-serif",
      fontSize: "12px",
      letterSpacing: "0.2%"
    },
    body4: {
      fontFamily: "Figtree, sans-serif",
      fontSize: "10px",
      letterSpacing: "0.4%"
    }
  } as ExtendedTypographyOptions,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          "&.MuiButton-containedPrimary": {
            boxShadow: "none",
            "&:hover": {
              backgroundColor: palette.primary.light
            }
          }
        }
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          "&.Mui-selected": {
            backgroundColor: palette.primary.main,
            color: "white",
            "&:hover": {
              backgroundColor: palette.primary.light
            }
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          "&.MuiMenu-paper": {
            boxShadow: "none",
            border: ".8px solid lightgrey"
          }
        }
      }
    }
  }
});
