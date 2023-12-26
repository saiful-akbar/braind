import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

/**
 * Komponen select input
 */
const SelectInput = memo((props) => {
  const {
    label,
    error,
    fullWidth,
    helperText,
    items,
    inputProps,
    size,
    required,
    ...rest
  } = props;

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      size={size}
      required={required}
    >
      {label !== "" && <InputLabel>{label}</InputLabel>}

      <Select
        label={label}
        inputProps={{
          sx: {
            backgroundColor: "background.default",
            borderRadius: "8px",
          },
          ...inputProps,
        }}
        MenuProps={{
          slotProps: {
            paper: {
              sx: {
                borderRadius: "8px",
                border: 1,
                borderColor: "divider",
              },
            },
          },
        }}
        {...rest}
      >
        {items.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>

      {helperText !== "" && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});

/**
 * Item prop types
 */
const itemsTypes = PropTypes.shape({
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

/**
 * Prop type
 */
SelectInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  items: PropTypes.arrayOf(itemsTypes).isRequired,
  inputProps: PropTypes.object,
  size: PropTypes.string,
  required: PropTypes.bool,
};

/**
 * Default props
 */
SelectInput.defaultProps = {
  label: "",
  error: false,
  fullWidth: false,
  helperText: "",
  inputProps: {},
  size: "medium",
  required: false,
};

export default SelectInput;
