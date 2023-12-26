import { createTheme } from "@mui/material/styles";
import typography from "./typography";
import components from "./components";

export default createTheme({
  typography,
  components,
  palette: {
    mode: "light",
    divider: "rgba(0,0,0,.08)",
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    primary: {
      main: "#171717",
    },
    secondary: {
      main: "#1E88E5",
    },
    text: {
      primary: "#171717",
      secondary: "#666666",
    },
  },
});
