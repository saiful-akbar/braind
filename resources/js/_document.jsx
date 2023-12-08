import React, { useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAppearance } from "./redux/reducers/appearanceReducer";

/**
 * Document element
 */
const Document = ({ children }) => {
  const appearanceStorage = localStorage.getItem("appearance") || "auto";
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const mode = prefersDark ? "dark" : "light";

  // redux
  const dispatch = useDispatch();
  const appearance = useSelector((state) => state.appearance);

  // set appearance pada redux state
  useLayoutEffect(() => {
    switch (appearanceStorage) {
      case "dark":
        dispatch(setAppearance("dark"));
        break;

      case "light":
        dispatch(setAppearance("light"));

        break;

      default:
        dispatch(setAppearance(mode));
        break;
    }
  }, []);

  // Update tema pada browser
  useEffect(() => {
    document.querySelector("html").dataset.appearance = mode;
    localStorage.setItem("appearance", mode);
  }, [appearance]);

  return <div>{children}</div>;
};

Document.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Document;
