import { Add } from "@mui/icons-material";
import { Fab, Grid, Tooltip } from "@mui/material";
import React, { Fragment, useState } from "react";
import FormUpload from "./Partials/FormUpload";
import { useCallback } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Image from "./Partials/Image";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { useDispatch } from "react-redux";
import { openNotification } from "@/redux/reducers/notificationReducer";

/**
 * Komponen galeri untuk halaman profil kantor.
 *
 * @returns {React.ReactElement}
 */
const TabGaleri = () => {
  const { data, app, access } = usePage().props;
  const { csrf } = app;
  const { params } = app.url;
  const galleries = data.galeri.filter((galeri) => galeri.tipe === "gambar");
  const dispatch = useDispatch();

  /**
   * State
   */
  const [open, setOpen] = useState(false);

  /**
   * Form delete
   */
  const {
    data: formData,
    setData,
    delete: destroy,
    processing,
  } = useForm({
    id: null,
    _token: csrf,
  });

  /**
   * fungsi untuk membuka modal create
   */
  const toggleModalCreate = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, [setOpen]);

  /**
   * fungsi untuk menutup modal konfirmasi hapus
   */
  const closeDeleteConfirmation = useCallback(() => {
    setData("id", null);
  }, [setData]);

  /**
   * fungsi untuk menghapus gambar pada galeri kantor.
   */
  const handleDelete = useCallback(() => {
    const url = route("profil-kantor.galeri.destroy", {
      galeri: formData.id,
      _query: params,
    });

    destroy(url, {
      preserveScroll: true,
      preserveState: true,
      onFinish: () => closeDeleteConfirmation(),
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesalahan, Gambar gagal dihapus.",
          })
        );
      },
    });
  }, [destroy, params, dispatch, formData]);

  return (
    <Fragment>
      <Grid container spacing={3}>
        {galleries.map((gallery) => (
          <Grid key={gallery.id} item md={4} sm={6} xs={12}>
            <Image
              src={gallery.uri}
              title={gallery.judul}
              description={gallery.keterangan}
              createdAt={gallery.created_at}
              onDelete={() => setData("id", gallery.id)}
            />
          </Grid>
        ))}
      </Grid>

      {access.create && (
        <Tooltip title="Unggah Gambar" disableInteractive placement="left">
          <Fab
            color="primary"
            size="medium"
            onClick={toggleModalCreate}
            sx={{
              position: "fixed",
              zIndex: 1,
              bottom: 20,
              right: 20,
            }}
          >
            <Add />
          </Fab>
        </Tooltip>
      )}

      {/* Form upload gambar ke galeri */}
      {access.create && <FormUpload open={open} onClose={toggleModalCreate} />}

      {/* Modal delete */}
      <DeleteConfirmation
        open={Boolean(formData.id !== null)}
        title="Hapus Gambar"
        onDelete={handleDelete}
        onClose={closeDeleteConfirmation}
        loading={processing}
      />
    </Fragment>
  );
};

export default TabGaleri;
