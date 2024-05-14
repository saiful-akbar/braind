import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import ModalFormDokumen from "./Partials/ModalFormDokumen";
import { useDispatch } from "react-redux";
import { openCreateForm } from "@/redux/reducers/dokumenReducer";

/**
 * Halaman dokumen.
 *
 * @param {object} props
 * @returns {React.ReactElement}
 */
const Dokumen = (props) => {
  const { access } = props;
  const dispatch = useDispatch();

  /**
   * fungsi untuk membuka form create dokumen
   */
  const handleOpenCreateForm = () => {
    dispatch(openCreateForm());
  };

  return (
    <React.Fragment>
      <Header
        title="Dokumen"
        action={
          access.create && (
            <Button
              type="button"
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleOpenCreateForm}
            >
              Tambah
            </Button>
          )
        }
      />

      <Box component="main" sx={{ mt: 5 }}>
        <ModalFormDokumen />
      </Box>
    </React.Fragment>
  );
};

Dokumen.layout = (page) => <AuthLayout title="Dokumen" children={page} />;

export default Dokumen;
