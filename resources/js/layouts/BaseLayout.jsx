import React, { useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAppearance } from "@/redux/reducers/settingsReducer";
import { router } from "@inertiajs/react";
import { ThemeProvider } from "@mui/material/styles";
import NProgress from "nprogress";
import lightTheme from "@/themes/lightTheme";
import darkTheme from "@/themes/darkTheme";

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

  // Nprogress
  NProgress.configure({ showSpinner: false, includeCSS: true });

  /**
   * Jalankan nprogress dan
   * update tema sebelum komponen dirender.
   */
  useLayoutEffect(() => {
    router.on("start", () => NProgress.start());
    router.on("finish", () => NProgress.done());

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
