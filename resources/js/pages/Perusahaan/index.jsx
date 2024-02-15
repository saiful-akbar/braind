import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { Add } from "@mui/icons-material";
import { Box, Button, CardContent, Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import ModalFormPerusahaan from "./Partials/ModalFormPerusahaan";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDeleteConfirmation,
  openCreateForm,
} from "@/redux/reducers/perusahaanReducer";
import CardPaper from "@/components/CardPaper";
import TablePerusahaan from "./Partials/TablePerusahaan";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { router } from "@inertiajs/react";

/**
 * Komponen halaman master perusahaan.
 *
 * @returns {React.ReactElement}
 */
const Perusahaan = (props) => {
  const { access, app } = props;
  const { params } = app.url;
  const dispatch = useDispatch();
  const perusahaan = useSelector((state) => state.perusahaan);

  /**
   * state
   */
  const [processing, setProcessing] = useState(false);

  /**
   * fungsi untuk mmebuka modal form untuk
   * menambah data perusahaan.
   */
  const handleOpenCreateForm = () => {
    dispatch(openCreateForm());
  };

  /**
   * fungsi untuk menutup modal delete confirmation
   */
  const handleCloseDeleteConfirmation = useCallback(() => {
    if (!processing) {
      dispatch(closeDeleteConfirmation());
    }
  }, [processing, dispatch]);

  /**
   * fungsi untuk mengapus data perusahaan
   */
  const handleDelete = useCallback(() => {
    const url = route(`master-perusahaan.${perusahaan.delete.type}`, {
      perusahaan: perusahaan.delete.id,
      _query: params,
    });

    router.visit(url, {
      method: "delete",
      preserveScroll: true,
      preserveState: true,
      data: {
        _token: app.csrf,
      },
      onStart: () => {
        setProcessing(true);
      },
      onFinish: () => {
        setProcessing(false);
        handleCloseDeleteConfirmation();
      },
    });
  }, [perusahaan, params.app, setProcessing, handleCloseDeleteConfirmation]);

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
        <CardPaper>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TablePerusahaan />
              </Grid>
            </Grid>
          </CardContent>
        </CardPaper>
      </Box>

      {/* Komponen modal form create & update */}
      <ModalFormPerusahaan />

      {/* Komponen modal konfirmasi hapus */}
      <DeleteConfirmation
        open={Boolean(perusahaan.delete.id !== null)}
        title={perusahaan.delete.title}
        onClose={handleCloseDeleteConfirmation}
        onDelete={handleDelete}
        loading={processing}
      />

      {/* Komponen modal konfirmasi restore */}
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
