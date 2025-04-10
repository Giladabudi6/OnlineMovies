import { createTheme } from "@mui/material/styles";

/* Application Theme */
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#252624",
      paper: "#0D1440",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
    primary: {
      main: "#0288D1",
    },
    secondary: {
      main: "#03A9F4",
    },
  },

  components: {
    /* Button Styling */
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          padding: "10px 20px",
        },
        containedPrimary: {
          backgroundColor: "#03A9F4",
          "&:hover": {
            backgroundColor: "#0288D1",
          },
        },
        containedSecondary: {
          backgroundColor: "transparent",
          border: "2px solid #03A9F4",
          color: "#03A9F4",
          "&:hover": {
            backgroundColor: "#03A9F4",
            color: "#ffffff",
          },
        },
      },
    },
    /* Input Field Styling */
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#676767",
          color: "#ffffff",
          padding: "10px",
          borderRadius: "4px",
        },
      },
    },

    /* Card Styling */
    MuiCard: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          backgroundColor: "#0D1440",
          color: "#ffffff",
          borderRadius: "7px",
          padding: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          transition: "0.3s",
          "&:hover": {
            transform: "scale(1.02)",
          },
          width: "231px",
          minHeight: "350px",
        },
      },
    },

    /* Tabs Styling */
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: "50px",
          color: "#fff",
        },
        indicator: {
          backgroundColor: "#81D4FA",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "1.3rem",
          fontWeight: "bold",
          padding: "14px 28px",
          transition: "0.2s",
          borderRadius: "10px",
          color: "#81D4FA",
          "&:hover": {
            color: "#ffffff",
          },
          "&.Mui-selected": {
            color: "#81D4FA",
            fontWeight: "bold",
          },
        },
      },
    },

    /* Dialog Styling */
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0D1440",
          color: "white",
          borderRadius: 12,
          padding: "16px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: "#0D1440",
          color: "white",
          fontWeight: "bold",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          backgroundColor: "#0D1440",
          color: "white",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          backgroundColor: "#0D1440",
          color: "white",
          paddingBottom: "16px",
        },
      },
    },
  },
});

export default theme;