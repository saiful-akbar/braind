import React, { memo } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@mui/material";

/**
 * Komponen tombol refresh
 */
const RefreshButton = memo((props) => {
  const { iconSize, iconProps, ...rest } = props;

  return (
    <Tooltip title="Segarkan" disableInteractive>
      <IconButton {...rest}>
        <RefreshIcon fontSize={iconSize} {...iconProps} />
      </IconButton>
    </Tooltip>
  );
});

/**
 * Prop types
 */
RefreshButton.propTypes = {
  iconSize: PropTypes.oneOf(["small", "medium", "large"]),
  iconProps: PropTypes.object,
};

/**
 * default props
 */
RefreshButton.defaultProps = {
  iconSize: "medium",
  iconProps: {},
};

export default RefreshButton;
