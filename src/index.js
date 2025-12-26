import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#3b82f6" },   // blue
    secondary: { main: "#a855f7" }, // purple
    success: { main: "#22c55e" },   // green
    warning: { main: "#f59e0b" },   // amber
    error: { main: "#ef4444" },     // red
    background: {
      default: "#f6f7fb",
      paper: "#ffffff"
    }
  },
  typography: {
    fontFamily: `"Inter", "Segoe UI", Roboto, Arial, sans-serif`,
    h3: { fontWeight: 900, fontSize: "3rem" },
    h4: { fontWeight: 900, fontSize: "2.3rem" },
    h5: { fontWeight: 900 },
    h6: { fontWeight: 800 },
    body1: { fontSize: "1.02rem" },
    button: { textTransform: "none", fontWeight: 800 }
  },
  shape: { borderRadius: 16 }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);