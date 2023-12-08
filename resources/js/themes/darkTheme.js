import { createTheme } from "@mui/material/styles";
import typography from "./typography";
import components from "./components";

export default createTheme({
  typography,
  components,
  palette: {
    mode: "dark",
    tooltip: {
      background: "rgba(255, 255, 255, 0.9)",
      text: "#333333",
    },
    background: {
      default: "#1D1D1D",
      paper: "#222222",
      sidebar: "#111111",
    },
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#2196F3",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#888888",
      sidebar: "#888888",
    },
  },
});
