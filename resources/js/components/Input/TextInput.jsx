import { TextField } from "@mui/material";
import { memo } from "react";

/**
 * Komponen text input
 */
const TextInput = memo((props) => {
  return <TextField {...props} />;
});

export default TextInput;
