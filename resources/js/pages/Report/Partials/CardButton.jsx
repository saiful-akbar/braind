import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

const CardButton = (props) => {
  return (
    <Card elevation={3}>
      <CardActionArea onClick={() => props.onClick()}>
        <CardContent
          sx={{
            minHeight: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

CardButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default CardButton;
