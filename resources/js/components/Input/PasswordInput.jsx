import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";

/**
 * Komponen password input
 */
const PasswordInput = React.memo(({ disabled, iconSize, ...rest }) => {
  const [show, setShow] = React.useState(false);
  const [title, setTitle] = React.useState("Sembunyikan password");

  /**
   * Update title
   */
  useEffect(() => {
    setTitle(show ? "Sembunyikan password" : "Tampilkan password");
  }, [show]);

  /**
   * Fungsi untuk mengatasi ketika
   * button toggle password diklik
   */
  const handleClick = useCallback(() => {
    setShow((prevState) => !prevState);
  }, [setShow, setTitle]);

  return (
    <TextField
      {...rest}
      type={show ? "text" : "password"}
      disabled={disabled}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title={title}>
              <IconButton onClick={handleClick} disabled={disabled}>
                {show ? (
                  <VisibilityOffIcon fontSize={iconSize} />
                ) : (
                  <VisibilityIcon fontSize={iconSize} />
                )}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
});

/**
 * Prop types
 */
PasswordInput.propTypes = {
  disabled: PropTypes.bool,
  iconSize: PropTypes.string,
};

/**
 * Default props
 */
PasswordInput.defaultProps = {
  disabled: false,
  iconSize: "medium",
};

export default PasswordInput;
