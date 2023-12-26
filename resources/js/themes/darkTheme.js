import { createTheme } from "@mui/material/styles";
import typography from "./typography";
import components from "./components";

export default createTheme({
  typography,
  components,
  palette: {
    mode: "dark",
    divider: "hsla(0, 0%, 100%, 0.14)",
    tooltip: {
      background: "rgba(255, 255, 255, 0.9)",
      text: "#333333",
    },
    background: {
      default: "#000",
      paper: "#0A0A0A",
    },
    primary: {
      main: "#ededed",
    },
    secondary: {
      main: "#2196F3",
    },
    text: {
      primary: "#ededed",
      secondary: "#a1a1a1",
    },
  },
});
