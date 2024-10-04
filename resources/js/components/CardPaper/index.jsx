import React, { memo } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader } from "@mui/material";

/**
 * Komponen Card
 */
const CardPaper = memo(
  ({ title = "", subheader = "", children, action, sx = {}, ...rest }) => {
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
            titleTypographyProps={{
              variant: "subtitle1",
            }}
            subheader={subheader}
            subheaderTypographyProps={{
              variant: "body2",
              sx: {
                mt: 1,
              },
            }}
            action={action}
          />
        )}

        {children}
      </Card>
    );
  }
);

/**
 * Prop types
 */
CardPaper.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  action: PropTypes.node,
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default CardPaper;
