import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { Add } from "@mui/icons-material";
import { Box, Button, CardContent, Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import ModalFormPerusahaan from "./Partials/ModalFormPerusahaan";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDeleteConfirmation,
  closeRestoreConfirmation,
  openCreateForm,
  openFormlImport,
} from "@/redux/reducers/perusahaanReducer";
import CardPaper from "@/components/CardPaper";
import TablePerusahaan from "./Partials/TablePerusahaan";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { router } from "@inertiajs/react";
import FormSearchPerusahaan from "./Partials/FormSearchPerusahaan";
import FormFilterStatusPerusahaan from "./Partials/FormFilterStatusPerusahaan";
import TableActionButton from "@/components/Buttons/TableActionButton";
import { closeLoading, openLoading } from "@/redux/reducers/loadingReducer";
import { saveAs } from "file-saver";
import { openNotification } from "@/redux/reducers/notificationReducer";
import RestoreConfirmation from "@/components/RestoreConfirmation";
import ModalFormImportPerusahaan from "./Partials/ModalFormImportPerusahaan";

/**
 * Komponen halaman master perusahaan.
 *
 * @returns {React.ReactElement}
 */
const Perusahaan = (props) => {
  const { access, app, auth } = props;
  const { params } = app.url;
  const { csrf } = app;
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
  const handleOpenCreateForm = useCallback(() => {
    dispatch(openCreateForm());
  }, [dispatch]);

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
        _token: csrf,
      },
      onStart: () => setProcessing(true),
      onFinish: () => setProcessing(false),
      onSuccess: () => handleCloseDeleteConfirmation(),
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesalahan, gagal menghapus perusahaan.",
          })
        );
      },
    });
  }, [
    perusahaan,
    params,
    csrf,
    setProcessing,
    handleCloseDeleteConfirmation,
    dispatch,
  ]);

  /**
   * fungsi untuk menutup modal konfirmasi restore
   */
  const handleCloseRestoreConfirmation = useCallback(() => {
    dispatch(closeRestoreConfirmation());
  }, [dispatch]);

  /**
   * fungsi untuk request restore
   */
  const handleRestore = useCallback(() => {
    const url = route("master-perusahaan.restore", {
      perusahaan: perusahaan.restore.id,
      _query: params,
    });

    router.visit(url, {
      method: "patch",
      preserveScroll: true,
      preserveState: true,
      data: {
        _token: csrf,
      },
      onStart: () => setProcessing(true),
      onFinish: () => setProcessing(false),
      onSuccess: () => handleCloseRestoreConfirmation(),
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesalahan, gagal memulihkan perusahaan.",
          })
        );
      },
    });
  }, [
    perusahaan,
    setProcessing,
    dispatch,
    params,
    csrf,
    handleCloseRestoreConfirmation,
  ]);

  /**
   * fungsi untuk reload table
   */
  const handleReload = useCallback(() => {
    router.reload();
  }, []);

  /**
   * fungsi untuk export excel
   */
  const handleExport = useCallback(async () => {
    dispatch(openLoading());

    try {
      const response = await axios({
        method: "get",
        responseType: "blob",
        url: route("master-perusahaan.export"),
        params: {
          ...params,
        },
      });

      if (response.status === 200) {
        saveAs(response.data, "perusahaan_export.xlsx");
        dispatch(closeLoading());
        dispatch(
          openNotification({
            status: "success",
            message: "Export berhasil.",
          })
        );
      }
    } catch (error) {
      dispatch(closeLoading());
      dispatch(
        openNotification({
          status: "error",
          message: "Terjadi kesalahan. Export gagal.",
        })
      );
    }
  }, [params]);

  /**
   * fungsi untuk membuka modal form import
   */
  const handleOpenModalFormImport = useCallback(() => {
    dispatch(openFormlImport());
  }, [dispatch]);

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
              <Grid item xs={12} md={4.5}>
                <FormSearchPerusahaan />
              </Grid>

              {auth.user.admin && (
                <Grid item xs={12} md={4.5}>
                  <FormFilterStatusPerusahaan />
                </Grid>
              )}

              <Grid item xs={12} md={3}>
                <TableActionButton
                  reload
                  export
                  import={access.create}
                  onReload={handleReload}
                  onExport={handleExport}
                  onImport={handleOpenModalFormImport}
                />
              </Grid>

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
      <RestoreConfirmation
        open={Boolean(perusahaan.restore.id !== null)}
        title="Pulihkan"
        onClose={handleCloseRestoreConfirmation}
        onRestore={handleRestore}
        loading={processing}
      />

      {/* Komponen modal form import excel */}
      <ModalFormImportPerusahaan />
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
