import { createTheme } from "@mui/material/styles";
import typography from "./typography";
import components from "./components";
import { lightShadow as shadows } from "./shadows";

export default createTheme({
  typography,
  components,
  shadows,
  palette: {
    mode: "light",
    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
      tooltip: "rgba(69, 79, 91, 0.8)",
    },
    text: {
      primary: "#212b36",
      secondary: "#637381",
    },
    primary: {
      light: "#454F5B",
      main: "#212B36",
      dark: "#161C24",
      contrastText: "#fff",
    },
    secondary: {
      light: "#5BE49B",
      main: "#00A76F",
      dark: "#007867",
      contrastText: "#fff",
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
