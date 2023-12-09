import SelectInput from "@/components/Input/SelectInput";
import { setAppearance } from "@/redux/reducers/settingsReducer";
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen partials appearance settings
 */
const AppearanceSettings = () => {
  const dispatch = useDispatch();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const mode = prefersDarkMode ? "dark" : "light";

  // state
  const [value, setValue] = useState("light");

  // Update value
  useEffect(() => {
    setValue(localStorage.getItem("appearance") || "auto");
  }, []);

  // fungsi untuk merubah tema
  const handleChange = useCallback(
    (event) => {
      const { value: selectValue } = event.target;
      const html = document.querySelector("html");

      if (selectValue === "light" || selectValue === "dark") {
        html.dataset.appearance = selectValue;
        localStorage.setItem("appearance", selectValue);
        setValue(selectValue);
        dispatch(setAppearance(selectValue));
      } else {
        html.dataset.appearance = mode;
        localStorage.setItem("appearance", "auto");
        setValue("auto");
        dispatch(setAppearance(mode));
      }
    },
    [setValue, dispatch, mode]
  );

  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={4}>
        <Typography variant="subtitle2">Appearance</Typography>
      </Grid>

      <Grid item xs={4}>
        <FormControl fullWidth>
          <SelectInput size="small" value={value} onChange={handleChange}>
            <MenuItem value="auto">Auto</MenuItem>
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </SelectInput>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default AppearanceSettings;
