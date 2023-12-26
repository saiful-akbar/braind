import Header from "@/components/Header";
import { createSbp } from "@/redux/reducers/sbpReducer";
import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import FormSbp from "./Partials/FormSbp";

/**
 * Komponen template untuk halaman SBP
 */
const SbpTemplate = ({ children }) => {
  const dispatch = useDispatch();

  /**
   * fungsi untuk membuka modal (dialog) form
   * untuk menambah SBP baru.
   */
  const openModalForm = () => {
    dispatch(createSbp());
  };

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
            onClick={openModalForm}
          >
            Tambah SBP
          </Button>
        }
      />

      <Box component="main" sx={{ mt: 5 }}>
        {children}
      </Box>

      <FormSbp />
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
