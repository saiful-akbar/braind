import { usePage } from "@inertiajs/react";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

/**
 * Komponen search input
 */
const SearchInput = React.memo((props) => {
  const { value, onClear, inputProps, ...rest } = props;
  const { app } = usePage().props;
  const { params } = app.url;
  const searchParam = params.search ?? "";

  return (
    <TextField
      {...rest}
      type="text"
      value={value}
      InputProps={{
        endAdornment: searchParam !== "" && (
          <InputAdornment position="end">
            <IconButton
              type="button"
              onClick={onClear}
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  color: "text.primary",
                },
              }}
            >
              <CancelIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
        ...inputProps,
      }}
    />
  );
});

/**
 * Prop types
 */
SearchInput.propTypes = {
  onClear: PropTypes.func.isRequired,
  value: PropTypes.string,
  inputProps: PropTypes.object,
};

/**
 * Default props
 */
SearchInput.defaultProps = {
  value: "",
};

export default SearchInput;
