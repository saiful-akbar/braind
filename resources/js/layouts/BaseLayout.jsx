import { setAppearance } from "@/redux/reducers/settingsReducer";
import darkTheme from "@/themes/darkTheme";
import lightTheme from "@/themes/lightTheme";
import { useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Base layout
 */
const BaseLayout = ({ children }) => {
  const appearanceStorage = localStorage.getItem("appearance") || "auto";
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const mode = prefersDark ? "dark" : "light";

  // redux
  const dispatch = useDispatch();
  const { appearance } = useSelector((state) => state.settings);

  /**
   * Jalankan nprogress dan
   * update tema sebelum komponen dirender.
   */
  useLayoutEffect(() => {
    const html = document.querySelector("html");

    switch (appearanceStorage) {
      case "dark":
        dispatch(setAppearance("dark"));
        html.dataset.appearance = "dark";
        break;

      case "light":
        dispatch(setAppearance("light"));
        html.dataset.appearance = "light";
        break;

      default:
        dispatch(setAppearance(mode));
        html.dataset.appearance = mode;
        localStorage.setItem("appearance", "auto");
        break;
    }
  }, []);

  return (
    <ThemeProvider theme={appearance === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
