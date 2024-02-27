import React from "react";
import PropTypes from "prop-types";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

/**
 * Komponen input date
 */
const DateInput = React.memo((props) => {
  const { label, error, helperText, size, required, ...rest } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]} sx={{ mt: -1 }}>
        <DatePicker
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

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  required: PropTypes.bool,
};

DateInput.defaultProps = {
  error: false,
  size: "medium",
  required: false,
};

export default DateInput;
