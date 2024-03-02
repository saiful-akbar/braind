import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { Add } from "@mui/icons-material";
import { Box, Button, CardContent, Grid } from "@mui/material";
import React, { Fragment, useCallback, useState } from "react";
import ModalFormOperasilKapalPatroli from "./Partials/ModalFormOperasiKapalPatroli";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDeleteConfirmation,
  closeRestoreConfirmation,
  openCreateForm,
  openFormlImport,
} from "@/redux/reducers/operasiKapalPatroliReducer";
import FormFilterPeriodOperasilKapalPatroli from "./Partials/FormFilterPeriodOperasiKapalPatroli";
import CardPaper from "@/components/CardPaper";
import TableOperasilKapalPatroli from "./Partials/TableOperasiKapalPatroli";
import FormSearchOperasilKapalPatroli from "./Partials/FormSearchOperasiKapalPatroli";
import FormFilterStatusOperasilKapalPatroli from "./Partials/FormFilterStatusOperasiKapalPatroli";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import RestoreConfirmation from "@/components/RestoreConfirmation";
import { router } from "@inertiajs/react";
import TableActionButton from "@/components/Buttons/TableActionButton";
import { closeLoading, openLoading } from "@/redux/reducers/loadingReducer";
import { saveAs } from "file-saver";
import { openNotification } from "@/redux/reducers/notificationReducer";
import ModalFormImportOperasilKapalPatroli from "./Partials/ModalFormImportOperasiKapalPatroli";

/**
 * Halaman sarana oprasi kapal patroli
 */
const OperasilKapalPatroli = (props) => {
  const { access, app } = props;
  const { params } = app.url;
  const { csrf } = app;
  const dispatch = useDispatch();
  const operasiKapalPatroli = useSelector((state) => state.operasiKapalPatroli);

  /**
   * State
   */
  const [processing, setProcessing] = useState(false);

  /**
   * fungsi untuk membuka create form.
   * NB: Hanya user yang memiliki akses create yang dapat membuka form.
   */
  const handleOpenCreateForm = useCallback(() => {
    if (access.create) {
      dispatch(openCreateForm());
    }
  }, [dispatch, access]);

  /**
   * fungsi untuk menutup modal delete confirmation
   */
  const handleCloseDeleteConfirmation = useCallback(() => {
    if (!processing) {
      dispatch(closeDeleteConfirmation());
    }
  }, [processing, dispatch]);

  /**
   * fungsi untuk mengapus data sarana operasi kapal patroli
   */
  const handleDelete = useCallback(() => {
    const url = route(
      `operasi-kapal-patroli.${operasiKapalPatroli.delete.type}`,
      {
        operasi: operasiKapalPatroli.delete.id,
        _query: params,
      }
    );

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
            message: "Terjadi kesalahan, gagal menghapus data operasi.",
          })
        );
      },
    });
  }, [
    operasiKapalPatroli,
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
    const url = route("operasi-kapal-patroli.restore", {
      operasi: operasiKapalPatroli.restore.id,
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
            message: "Terjadi kesalahan, gagal memulihkan data operasi.",
          })
        );
      },
    });
  }, [
    operasiKapalPatroli,
    setProcessing,
    params,
    csrf,
    handleCloseRestoreConfirmation,
    dispatch,
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
        url: route("operasi-kapal-patroli.export"),
        params,
      });

      if (response.status === 200) {
        saveAs(response.data, "operasi_kapal-patroli_export.xlsx");
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
  const handleOpenFormImport = useCallback(() => {
    dispatch(openFormlImport());
  }, [dispatch]);

  return (
    <Fragment>
      <Header
        title="Oprasi Kapal Patroli"
        action={
          access.create ? (
            <Button
              type="button"
              color="primary"
              variant="contained"
              onClick={handleOpenCreateForm}
              startIcon={<Add />}
            >
              Tambah
            </Button>
          ) : null
        }
      />

      <Box component="main" sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormFilterPeriodOperasilKapalPatroli />
          </Grid>

          {/* Tabel */}
          <Grid item xs={12}>
            <CardPaper>
              <CardContent>
                <Grid container spacing={3} justifyContent="space-between">
                  <Grid item md={4.5} xs={12}>
                    <FormSearchOperasilKapalPatroli />
                  </Grid>

                  {access.destroy && (
                    <Grid item md={4.5} xs={12}>
                      <FormFilterStatusOperasilKapalPatroli />
                    </Grid>
                  )}

                  <Grid item md={3} xs={12}>
                    <TableActionButton
                      reload
                      export
                      import={access.create}
                      onReload={handleReload}
                      onExport={handleExport}
                      onImport={handleOpenFormImport}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TableOperasilKapalPatroli />
                  </Grid>
                </Grid>
              </CardContent>
            </CardPaper>
          </Grid>
        </Grid>
      </Box>

      {/* Modal form create & edit */}
      <ModalFormOperasilKapalPatroli />

      {/* Modal konfirmasi delete */}
      <DeleteConfirmation
        title={operasiKapalPatroli.delete.title}
        open={operasiKapalPatroli.delete.open}
        onClose={handleCloseDeleteConfirmation}
        onDelete={handleDelete}
        loading={processing}
      />

      {/* Modal konfirmasi restore */}
      <RestoreConfirmation
        open={operasiKapalPatroli.restore.open}
        title={operasiKapalPatroli.restore.title}
        onClose={handleCloseRestoreConfirmation}
        onRestore={handleRestore}
        loading={processing}
      />

      {/* Modal form import excel */}
      <ModalFormImportOperasilKapalPatroli />
    </Fragment>
  );
};

/**
 * Layout
 */
OperasilKapalPatroli.layout = (page) => (
  <AuthLayout title="Operasi Kapal Patroli" children={page} />
);

export default OperasilKapalPatroli;
