import DeleteConfirmation from "@/components/DeleteConfirmation";
import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import {
  closeDeleteConfirmation,
  openCreateForm,
} from "@/redux/reducers/petaKerawananReducer";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { router } from "@inertiajs/react";
import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Grid } from "@mui/material";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentPetaKerawanan from "./Partials/ContentPetaKerawanan";
import FormFilterKantorPetaKerawanan from "./Partials/FormFilterKantorPetaKerawanan";
import FormFilterPetaKerawanan from "./Partials/FormFilterPetaKerawanan";
import FormSearchPetaKerawanan from "./Partials/FormSearchPetaKerawanan";
import ModalFormPetaKerawanan from "./Partials/ModalFormPetaKerawanan";
import PaginationPetaKerawanan from "./Partials/PaginationPetaKerawanan";

/**
 * Halaman peta kerawanan kantor.
 *
 * @returns {React.ReactElement}
 */
const PetaKerawanan = (props) => {
  const { access, auth, app } = props;
  const { user } = auth;
  const { params } = app.url;
  const dispatch = useDispatch();
  const petaKerawanan = useSelector((state) => state.petaKerawanan);

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
   * fungsi untuk hapus data peta kerawanan
   */
  const handleDelete = () => {
    const url = route(`peta-kerawanan.${petaKerawanan.delete.type}`, {
      petaKerawanan: petaKerawanan.delete.id,
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
              message: "Terjadi kesalahan. Gagal menghapus peta kerawanan.",
            })
          );
        },
      });
    }
  };

  return (
    <Fragment>
      <Header
        title="Peta Kerawanan"
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
                <FormFilterKantorPetaKerawanan />
              </Grid>
            )}

            <Grid item xs={12} sm={6} md={4}>
              <FormFilterPetaKerawanan />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormSearchPetaKerawanan />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <ContentPetaKerawanan />
          </Grid>

          <Grid item xs={12}>
            <PaginationPetaKerawanan />
          </Grid>
        </Grid>
      </Box>

      {access.create && <ModalFormPetaKerawanan />}

      {access.destroy && (
        <DeleteConfirmation
          open={petaKerawanan.delete.open}
          title={petaKerawanan.delete.title}
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
PetaKerawanan.layout = (page) => (
  <AuthLayout title="PetaKerawanan" children={page} />
);

export default PetaKerawanan;
