import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { Add } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import React from "react";
import ModalFormPerusahaan from "./Partials/ModalFormPerusahaan";
import { useDispatch } from "react-redux";
import { openCreateForm } from "@/redux/reducers/perusahaanReducer";

/**
 * Komponen halaman master perusahaan.
 *
 * @returns {React.ReactElement}
 */
const Perusahaan = (props) => {
  const { access } = props;
  const dispatch = useDispatch();

  /**
   * fungsi untuk mmebuka modal form untuk
   * menambah data perusahaan.
   */
  const handleOpenCreateForm = () => {
    dispatch(openCreateForm());
  };

  return (
    <React.Fragment>
      <Header
        title="Perusahaan"
        action={
          access.create ? (
            <Button
              type="button"
              color="primary"
              variant="contained"
              startIcon={<Add />}
              onClick={handleOpenCreateForm}
            >
              Tambah
            </Button>
          ) : null
        }
      />

      {/* Komponen utama */}
      <Box component="main" sx={{ mt: 5 }}>
        <Grid container spacing={3}></Grid>
      </Box>

      {/* Komponen modal form create & update */}
      <ModalFormPerusahaan />
    </React.Fragment>
  );
};

/**
 * Layout
 */
Perusahaan.layout = (page) => (
  <AuthLayout title="Perusahaan">{page}</AuthLayout>
);

export default Perusahaan;
