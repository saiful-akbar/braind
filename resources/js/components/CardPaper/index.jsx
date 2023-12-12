import React, { memo } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader } from "@mui/material";

/**
 * Komponen Card
 */
const CardPaper = memo(({ title, subheader, children, ...rest }) => {
  return (
    <Card elevation={0} variant="outlined" sx={{ p: 1 }} {...rest}>
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
};

/**
 * Default props
 */
CardPaper.defaultProps = {
  title: "",
  subheader: "",
};

export default CardPaper;
