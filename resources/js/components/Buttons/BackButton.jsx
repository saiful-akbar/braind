import { Link } from "@inertiajs/react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton, Tooltip } from "@mui/material";
import { memo } from "react";

const BackButton = memo(({ ...rest }) => {
  return (
    <Tooltip title="Kembali">
      <IconButton type="button" component={Link} {...rest}>
        <ArrowBackIosNewIcon />
      </IconButton>
    </Tooltip>
  );
});

export default BackButton;
