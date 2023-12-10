import React from "react";
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
          backgroundColor: "background.paper",
        },
      }}
    />
  );
});

export default TextInput;
