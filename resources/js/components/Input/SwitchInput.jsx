import React, { memo } from "react";
import PropTypes from "prop-types";
import { FormControlLabel, Switch } from "@mui/material";

/**
 * Komponen switch input
 */
const SwitchInput = memo((props) => {
  const { label, labelPlacement, ...rest } = props;

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

SwitchInput.defaultProps = {
  labelPlacement: "end",
};

export default SwitchInput;
