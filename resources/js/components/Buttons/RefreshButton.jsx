import React, { memo } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@mui/material";

/**
 * Komponen tombol refresh
 */
const RefreshButton = memo((props) => {
  const { title, iconSize, iconProps, ...rest } = props;

  return (
    <Tooltip title={title} disableInteractive>
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
  title: PropTypes.string,
  iconSize: PropTypes.oneOf(["small", "medium", "large"]),
  iconProps: PropTypes.object,
};

/**
 * default props
 */
RefreshButton.defaultProps = {
  title: "Muat ulang",
  iconSize: "medium",
  iconProps: {},
};

export default RefreshButton;
