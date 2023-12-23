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
  const { label, error, helperText, ...rest } = props;

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
              size: "small",
              sx: {
                width: "100%",
              },
              InputProps: {
                sx: {
                  backgroundColor: "background.default",
                },
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
};

DateInput.defaultProps = {
  error: false,
};

export default DateInput;
