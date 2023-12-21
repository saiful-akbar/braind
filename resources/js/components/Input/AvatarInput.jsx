import React, { memo } from "react";
import PropTypes from "prop-types";
import { Avatar, Box, ButtonBase } from "@mui/material";

/**
 * Komponen input avatar
 */
const AvatarInput = memo((props) => {
  const { width, height, preview, ...rest } = props;

  return (
    <Box
      sx={{
        height,
        width,
        "input[type=file]": {
          display: "none",
        },
      }}
    >
      <label>
        <ButtonBase component="span" sx={{ borderRadius: "50%" }}>
          <Avatar
            src={preview}
            sx={{
              height,
              width,
              border: 5,
              borderRadius: "50%",
              borderColor: "divider",
            }}
          />
        </ButtonBase>

        <input type="file" accept="image/*" {...rest} />
      </label>
    </Box>
  );
});

/**
 * Prop types
 */
AvatarInput.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  preview: PropTypes.string,
};

/**
 * Default props
 */
AvatarInput.defaultProps = {
  height: 150,
  width: 150,
  preview: "",
};

export default AvatarInput;
