import Header from "@/components/Header";
import { Link } from "@inertiajs/react";
import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment } from "react";

/**
 * Komponen template untuk halaman SBP
 */
const SbpTemplate = ({ children }) => {
  return (
    <Fragment>
      <Header
        title="Master SBP"
        action={
          <Button
            disableElevation
            type="button"
            color="primary"
            variant="contained"
            component={Link}
            href={route("sbp.create")}
          >
            Tambah SBP
          </Button>
        }
      />

      <Box component="main" sx={{ mt: 5 }}>
        {children}
      </Box>
    </Fragment>
  );
};

/**
 * Prop types
 */
SbpTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SbpTemplate;
