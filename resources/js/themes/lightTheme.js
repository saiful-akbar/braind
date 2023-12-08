import { createTheme } from "@mui/material/styles";
import typography from "./typography";
import components from "./components";

export default createTheme({
  typography,
  components,
  palette: {
    mode: "light",
    tooltip: {
      background: "rgba(51, 51, 51, 0.9)",
      text: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FAFAFA",
      sidebar: "#FAFAFA",
    },
    primary: {
      main: "#333333",
    },
    secondary: {
      main: "#1E88E5",
    },
    text: {
      primary: "#333333",
      secondary: "#999999",
      sidebar: "#666666",
    },
  },
});
