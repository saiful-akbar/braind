import React, { memo } from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@mui/material";
import { Download } from "@mui/icons-material";

/**
 * Komponen button download
 */
const DownloadButton = memo((props) => {
  const { title, iconSize, iconProps, ...rest } = props;

  return (
    <Tooltip title={title} disableInteractive>
      <IconButton {...rest}>
        <Download fontSize={iconSize} {...iconProps} />
      </IconButton>
    </Tooltip>
  );
});

/**
 * Prop types
 */
DownloadButton.propTypes = {
  title: PropTypes.string,
  iconSize: PropTypes.oneOf(["small", "medium", "large"]),
  iconProps: PropTypes.object,
};

/**
 * default props
 */
DownloadButton.defaultProps = {
  title: "Unduh",
  iconSize: "medium",
  iconProps: {},
};

export default DownloadButton;
