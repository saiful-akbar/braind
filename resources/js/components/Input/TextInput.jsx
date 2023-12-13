import React from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Komponen text input
 */
const TextInput = React.memo(({inputProps, ...rest }) => {
  return (
    <TextField
      {...rest}
      InputProps={{
        sx: {
          backgroundColor: "background.default",
        },
        ...inputProps,
      }}
    />
  );
});

/**
 * Prop types
 */
TextInput.propsTypes = {
  inputProps: PropTypes.object
};

/**
 * Default props
 */
TextInput.defaultProps = {
  inputProps: {},
};

export default TextInput;
