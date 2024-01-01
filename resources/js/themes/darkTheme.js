import { createTheme } from "@mui/material/styles";
import typography from "./typography";
import components from "./components";
import { darkShadow as shadows } from "./shadows";

export default createTheme({
  typography,
  components,
  shadows,
  palette: {
    mode: "dark",
    tooltip: {
      background: "rgba(255, 255, 255, 0.9)",
      text: "#333333",
    },
    background: {
      default: "#161C24",
      paper: "#212B36",
      tooltip: "rgba(69, 79, 91, 0.7)",
    },
    text: {
      primary: "#ededed",
      secondary: "#a1a1a1",
    },
    primary: {
      main: "#FFF",
      dark: "#C4CDD5",
      contrastText: "#000",
    },
    secondary: {
      light: "#5BE49B",
      main: "#00A76F",
      dark: "#007867",
      contrastText: "#FFF",
    },
    info: {
      light: "#61F3F3",
      main: "#00B8D9",
      dark: "#006C9C",
    },
    success: {
      light: "#77ED8B",
      main: "#22C55E",
      dark: "#118D57",
    },
    warning: {
      light: "#FFD666",
      main: "#FFAB00",
      dark: "#B76E00",
    },
    error: {
      light: "#FFAC82",
      main: "#FF5630",
      dark: "#B71D18",
    },
  },
});
