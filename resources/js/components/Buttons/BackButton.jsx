import { Link } from "@inertiajs/react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { memo } from "react";

const BackButton = memo(({ ...rest }) => {
  return (
    <>
      <Box
        sx={{
          display: {
            md: "none",
            xs: "block",
          },
        }}
      >
        <Tooltip title="Kembali">
          <IconButton type="button" component={Link} {...rest}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          display: {
            md: "block",
            xs: "none",
          },
        }}
      >
        <Button
          disableElevation
          type="button"
          variant="outlined"
          component={Link}
          {...rest}
        >
          Kembali
        </Button>
      </Box>
    </>
  );
});

export default BackButton;
