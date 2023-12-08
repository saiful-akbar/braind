import React from "react";
import PropType from "prop-types"
import { TextField } from "@mui/material";

/**
 * Komponen text input
 */
const TextInput = React.memo(({ ...rest }) => {
  return (
    <TextField
      {...rest}
      InputProps={{
        sx: {
          backgroundColor: "background.paper"
        }
      }}
    />
  )
});

export default TextInput;
