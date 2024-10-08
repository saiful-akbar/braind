import SelectInput from "@/components/Input/SelectInput";
import { setAppearance } from "@/redux/reducers/settingsReducer";
import { FormControl, Grid, Typography, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
        <Typography variant="subtitle2">Tema</Typography>
      </Grid>

      <Grid item xs={4}>
        <FormControl fullWidth>
          <SelectInput
            size="small"
            value={value}
            onChange={handleChange}
            items={[
              { label: "Auto", value: "auto" },
              { label: "Terang", value: "light" },
              { label: "Gelap", value: "dark" },
            ]}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default AppearanceSettings;
