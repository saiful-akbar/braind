import React, { memo } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader } from "@mui/material";

/**
 * Komponen Card
 */
const CardPaper = memo(({ title, subheader, children, sx, ...rest }) => {
  return (
    <Card
      elevation={3}
      variant="elevation"
      sx={{
        py: 1,
        px: {
          md: 1,
          xs: 0,
        },
        ...sx,
      }}
      {...rest}
    >
      {title !== "" && (
        <CardHeader
          title={title}
          subheader={subheader}
          titleTypographyProps={{
            variant: "h6",
          }}
          subheaderTypographyProps={{
            variant: "body2",
            sx: {
              mt: 1,
            },
          }}
        />
      )}

      {children}
    </Card>
  );
});

/**
 * Prop types
 */
CardPaper.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

/**
 * Default props
 */
CardPaper.defaultProps = {
  title: "",
  subheader: "",
  sx: {},
};

export default CardPaper;
