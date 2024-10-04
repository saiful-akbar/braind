import React, { memo } from "react";
import PropTypes from "prop-types";
import { FormControlLabel, Switch } from "@mui/material";

/**
 * Komponen switch input
 */
const SwitchInput = memo((props) => {
  const { label, labelPlacement = "end", ...rest } = props;

  return (
    <FormControlLabel
      label={label}
      labelPlacement={labelPlacement}
      control={<Switch {...rest} />}
    />
  );
});

SwitchInput.propTypes = {
  label: PropTypes.string,
  labelPlacement: PropTypes.string,
};

export default SwitchInput;
