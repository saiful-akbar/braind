import React, { useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAppearance } from "@/redux/reducers/appearanceReducer";
import { router } from "@inertiajs/react";
import { ThemeProvider } from "@mui/material/styles";
import NProgress from "nprogress";
import CssBaseline from "@mui/material/CssBaseline";
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
  const appearance = useSelector((state) => state.appearance);

  // Nprogress
  NProgress.configure({ showSpinner: false, includeCSS: true });

  /**
   * Jalankan nprogress dan
   * update tema sebelum komponen dirender.
   */
  useLayoutEffect(() => {
    router.on("start", () => NProgress.start());
    router.on("finish", () => NProgress.done());

    switch (appearanceStorage) {
      case "dark":
        dispatch(setAppearance("dark"));
        break;

      case "light":
        dispatch(setAppearance("light"));
        break;

      default:
        dispatch(setAppearance(mode));
        localStorage.setItem("appearance", "auto");
        break;
    }
  }, []);

  /**
   * Update tema dan local storage pada browser
   */
  useEffect(() => {
    document.querySelector("html").dataset.appearance = mode;
  }, [appearance]);

  return (
    <ThemeProvider theme={appearance.mode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
