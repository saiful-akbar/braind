import React from "react";
import PropTypes from "prop-types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { TextField, IconButton, Tooltip, InputAdornment } from "@mui/material";

/**
 * Komponen password input
 */
const PasswordInput = React.memo(
  ({ disabled, inputProps, iconSize, ...rest }) => {
    const [show, setShow] = React.useState(false);

    /**
     * Fungsi untuk mengatasi ketika
     * button toggle password diklik
     */
    const handleClick = (event) => {
      setShow((prevState) => !prevState);
    };

    return (
      <TextField
        {...rest}
        type={show ? "text" : "password"}
        disabled={disabled}
        InputProps={{
          sx: {
            backgroundColor: "background.default",
          },
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip
                title={show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              >
                <IconButton
                  onClick={handleClick}
                  disabled={disabled}
                  sx={{
                    color: "text.secondary",
                    "&:hover": {
                      color: "text.primary",
                    },
                  }}
                >
                  {show ? (
                    <VisibilityOffIcon fontSize={iconSize} />
                  ) : (
                    <VisibilityIcon fontSize={iconSize} />
                  )}
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
          ...inputProps,
        }}
      />
    );
  }
);

/**
 * Prop types
 */
PasswordInput.propTypes = {
  disabled: PropTypes.bool,
  inputProps: PropTypes.object,
  iconSize: PropTypes.string,
};

/**
 * Default props
 */
PasswordInput.defaultProps = {
  disabled: false,
  inputProps: {},
  iconSize: "medium",
};

export default PasswordInput;
