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
  const { label, error, fullWidth, helperText, items, inputProps, ...rest } =
    props;

  return (
    <FormControl fullWidth={fullWidth} error={error}>
      {label !== "" && <InputLabel>{label}</InputLabel>}

      <Select
        label={label}
        inputProps={{
          sx: {
            backgroundColor: "background.default",
          },
          ...inputProps,
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
};

export default SelectInput;
