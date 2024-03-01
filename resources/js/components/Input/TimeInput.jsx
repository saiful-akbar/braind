import React from "react";
import PropTypes from "prop-types";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

/**
 * Komponen input time
 */
const TimeInput = React.memo((props) => {
  const { label, error, helperText, size, required, ...rest } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["MobileTimePicker"]} sx={{ mt: -1 }}>
        <MobileTimePicker
          fullWidth
          label={label}
          slotProps={{
            textField: {
              error,
              helperText,
              size,
              required,
              sx: {
                width: "100%",
              },
            },
          }}
          {...rest}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
});

TimeInput.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  required: PropTypes.bool,
};

TimeInput.defaultProps = {
  error: false,
  size: "medium",
  required: false,
};

export default TimeInput;
