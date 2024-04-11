import { usePage } from "@inertiajs/react";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

/**
 * Komponen search input
 */
const SearchInput = React.memo((props) => {
  const { value, onClear, InputProps, disabled, ...rest } = props;
  const { app } = usePage().props;
  const { params } = app.url;

  // state
  const [searchParams, setSearchParams] = useState(params.search ?? "");

  /**
   * Update searchParams
   */
  useEffect(() => {
    setSearchParams(params.search ?? "");
  }, [setSearchParams, params]);

  return (
    <TextField
      {...rest}
      type="text"
      value={value}
      disabled={disabled}
      InputProps={{
        endAdornment: searchParams !== "" && (
          <InputAdornment position="end">
            <IconButton
              type="button"
              size="small"
              onClick={onClear}
              disabled={disabled}
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
        ...InputProps,
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
  InputProps: PropTypes.object,
  disabled: PropTypes.bool,
};

/**
 * Default props
 */
SearchInput.defaultProps = {
  value: "",
  disabled: false,
};

export default SearchInput;
