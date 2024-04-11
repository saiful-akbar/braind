import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import {
  closeDeleteConfirmation,
  openCreateForm,
} from "@/redux/reducers/galeriReducer";
import { router } from "@inertiajs/react";
import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Grid } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentGaleri from "./Partials/ContentGaleri";
import ModalFormGaleri from "./Partials/ModalFormGaleri";
import FormFilterGaleri from "./Partials/FormFilterGaleri";
import FormSearchGaleri from "./Partials/FormSearchGaleri";
import FormFilterKantorGaleri from "./Partials/FormFilterKantorGaleri";
import { openNotification } from "@/redux/reducers/notificationReducer";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import PaginationGaleri from "./Partials/PaginationGaleri";

/**
 * Halaman galeri kantor.
 *
 * @returns {React.ReactElement}
 */
const Galeri = (props) => {
  const { access, auth, app, data } = props;
  console.log(data);
  const { user } = auth;
  const { params } = app.url;
  const dispatch = useDispatch();
  const galeri = useSelector((state) => state.galeri);

  /**
   * state
   */
  const [deleteting, setDeleting] = React.useState(false);

  /**
   * fungsi untuk membuka modal form
   */
  const openModalForm = () => {
    dispatch(openCreateForm());
  };

  /**
   * fungsi untuk menutup modal delete confirmation
   */
  const handleCloseDeleteConfirmation = () => {
    dispatch(closeDeleteConfirmation());
  };

  /**
   * fungsi untuk hapus data galeri
   */
  const handleDelete = () => {
    const url = route(`galeri.${galeri.delete.type}`, {
      galeri: galeri.delete.id,
      _query: params,
    });

    if (access.destroy) {
      router.delete(url, {
        preserveScroll: true,
        preserveState: true,
        onStart: () => setDeleting(true),
        onFinish: () => {
          setDeleting(false);
          handleCloseDeleteConfirmation();
        },
        onError: () => {
          dispatch(
            openNotification({
              status: "error",
              message: "Terjadi kesalahan. Gagal menghapus galeri.",
            })
          );
        },
      });
    }
  };

  return (
    <Fragment>
      <Header
        title="Galeri"
        action={
          access.create && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={openModalForm}
            >
              Tambah
            </Button>
          )
        }
      />

      <Box component="main" sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} container spacing={2}>
            {user.admin && (
              <Grid item xs={12} sm={6} md={4}>
                <FormFilterKantorGaleri />
              </Grid>
            )}

            <Grid item xs={12} sm={6} md={4}>
              <FormFilterGaleri />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormSearchGaleri />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <ContentGaleri />
          </Grid>

          <Grid item xs={12}>
            <PaginationGaleri />
          </Grid>
        </Grid>
      </Box>

      {access.create && <ModalFormGaleri />}

      {access.destroy && (
        <DeleteConfirmation
          open={galeri.delete.open}
          title={galeri.delete.title}
          onDelete={handleDelete}
          onClose={handleCloseDeleteConfirmation}
          loading={deleteting}
        />
      )}
    </Fragment>
  );
};

/**
 * Layout
 */
Galeri.layout = (page) => <AuthLayout title="Galeri" children={page} />;

export default Galeri;
