import { createTheme, responsiveFontSizes } from "@mui/material";
// A custom theme for this app
const theme = responsiveFontSizes(
  createTheme({
    breakpoints: {
      // values: {
      //   xs: 0,
      //   // sm: 1280,
      //   // md: 1366,
      //   // lg: 1600,
      //   // xl: 1920,
      //   // xxl: 1920,
      //   // qhd: 2560,
      //   // wqhd: 3440,
      //   // uhd: 3840,
      //   sm: 600,
      //   md: 960,
      //   lg: 1280,
      //   xl: 1920,
      // },
    },
    palette: {
      common: {
        white: "#F8F8F8",
      },
      primary: {
        main: "#2C57B3",
        dark: "#000000",
        light: "#FFFFFF",
      },
      secondary: {
        main: "#36588C",
      },
      error: {
        main: "#ef5350",
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif !important",
      // fontWeight:"600"
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          ::-webkit-scrollbar {
            width: 5px;
          }
          ::-webkit-scrollbar-track {
            background-color: #f1f1f1;
          }
          ::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 6px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: #555;
          }
        `,
      },
      MuiTypography: {
        styleOverrides: {
          // title of page -> page header
          h1: {
            fontSize: "25px !important",
            fontWeight: "bold",
          },
          h2: {
            fontSize: "18px !important",
            fontWeight: "bold",
          },
          h3: {
            fontSize: "20px !important",
          },
          h4: {
            fontSize: "16px !important",
          },
          h5: {
            fontSize: "14px !important",
          },
          h6: {
            fontSize: "12px !important",
          },
          // table content
          subtitle1: {
            fontSize: 18,
            // fontWeight: "bold",
            // letterSpacing: 0,
          },
          caption: {
            fontSize: 16,
            fontWeight: "bold",
            letterSpacing: 0,
          },
          // table header
          subtitle2: {
            fontSize: 14,
            color: "#1A1A1A",
            letterSpacing: 0,
          },
          // body -> cards texts - provider groups, patient, etc.
          body1: {
            fontSize: 16,
            color: "#4A4B4D",
            letterSpacing: 0,
            fontWeight: "400",
          },
          // another lables - font: 12
          body2: {
            fontSize: 12,
            letterSpacing: 0,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            // padding: '7px 11px !important'
          }
        }
      },
      MuiAutocomplete: {
        styleOverrides: {

        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            // borderBottom: 'none !important',
            '&.MuiInput-root:before': {
              borderBottom: 'none !important',
            },
            '&.MuiInput-root:after': {
              borderBottom: 'none !important',
            },
          },
        }
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            // padding: '7px 11px'
          }
        }
      }
    },
  })
);

export default theme;
