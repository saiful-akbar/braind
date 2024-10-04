import { TextField } from "@mui/material";
import { memo } from "react";
import PropTypes from "prop-types";

/**
 * Komponen text input
 */
const TextInput = memo(
  ({ type = "text", value = "", onChange = () => {}, ...rest }) => {
    return (
      <TextField
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        {...rest}
      />
    );
  }
);

TextInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

export default TextInput;
