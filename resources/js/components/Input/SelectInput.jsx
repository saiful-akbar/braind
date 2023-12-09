import React, { memo } from "react";
import PropTypes from "prop-types";
import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";

/**
 * Komponen select input
 */
const SelectInput = memo((props) => {
  const { label, error, fullWidth, children, helperText, ...rest } = props;

  return (
    <FormControl fullWidth={fullWidth} error={error}>
      {label !== "" && <InputLabel>{label}</InputLabel>}

      <Select
        label={label}
        inputProps={{
          sx: {
            backgroundColor: "background.default",
          },
        }}
        MenuProps={{
          slotProps: {
            paper: {
              sx: {
                borderRadius: 2,
              },
            },
          },
        }}
        {...rest}
      >
        {children}
      </Select>

      {helperText !== "" && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});

/**
 * Prop type
 */
SelectInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  children: PropTypes.node.isRequired,
  helperText: PropTypes.string,
};

/**
 * Default props
 */
SelectInput.defaultProps = {
  label: "",
  error: false,
  fullWidth: false,
  helperText: "",
};

export default SelectInput;
