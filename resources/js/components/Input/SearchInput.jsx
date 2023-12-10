import React from "react";
import PropTypes from "prop-types";
import { InputAdornment, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";

/**
 * Komponen search input
 */
const SearchInput = React.memo(({ value, onClear, ...rest }) => {
  return (
    <TextField
      {...rest}
      type="text"
      value={value}
      InputProps={{
        sx: {
          backgroundColor: "background.paper",
        },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
          </InputAdornment>
        ),
        endAdornment: value !== "" && (
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
};

/**
 * Default props
 */
SearchInput.defaultProps = {
  value: "",
};

export default SearchInput;
