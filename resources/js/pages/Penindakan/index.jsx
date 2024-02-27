import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { Add } from "@mui/icons-material";
import { Box, Button, CardContent, Grid } from "@mui/material";
import React, { Fragment, useCallback, useState } from "react";
import ModalFormPenindakan from "./Partials/ModalFormPenindakan";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDeleteConfirmation,
  closeRestoreConfirmation,
  openCreateForm,
  openFormlImport,
} from "@/redux/reducers/penindakanReducer";
import FormFilterPeriodPenindakan from "./Partials/FormFilterPeriodPenindakan";
import CardPaper from "@/components/CardPaper";
import TablePenindakan from "./Partials/TablePenindakan";
import FormSearchPenindakan from "./Partials/FormSearchPenindakan";
import FormFilterStatusPenindakan from "./Partials/FormFilterStatusPenindakan";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import RestoreConfirmation from "@/components/RestoreConfirmation";
import { router } from "@inertiajs/react";
import TableActionButton from "@/components/Buttons/TableActionButton";
import { closeLoading, openLoading } from "@/redux/reducers/loadingReducer";
import { saveAs } from "file-saver";
import { openNotification } from "@/redux/reducers/notificationReducer";
import ModalFormImportPenindakan from "./Partials/ModalFormImportPenindakan";

/**
 * Halaman Penindakan
 */
const Penindakan = (props) => {
  const { access, app } = props;
  const { params } = app.url;
  const { csrf } = app;
  const dispatch = useDispatch();
  const penindakan = useSelector((state) => state.penindakan);

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
   * fungsi untuk mengapus data penindakan
   */
  const handleDelete = useCallback(() => {
    const url = route(`penindakan.${penindakan.delete.type}`, {
      penindakan: penindakan.delete.id,
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
            message: "Terjadi kesalahan, gagal menghapus data penindakan.",
          })
        );
      },
    });
  }, [
    penindakan,
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
    const url = route("penindakan.restore", {
      penindakan: penindakan.restore.id,
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
            message: "Terjadi kesalahan, gagal memulihkan data penindakan.",
          })
        );
      },
    });
  }, [
    penindakan,
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
        url: route("penindakan.export"),
        params,
      });

      if (response.status === 200) {
        saveAs(response.data, "penindakan_export.xlsx");
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
        title="Penindakan"
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
            <FormFilterPeriodPenindakan />
          </Grid>

          {/* Tabel */}
          <Grid item xs={12}>
            <CardPaper>
              <CardContent>
                <Grid container spacing={3} justifyContent="space-between">
                  <Grid item md={4.5} xs={12}>
                    <FormSearchPenindakan />
                  </Grid>

                  {access.destroy && (
                    <Grid item md={4.5} xs={12}>
                      <FormFilterStatusPenindakan />
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
                    <TablePenindakan />
                  </Grid>
                </Grid>
              </CardContent>
            </CardPaper>
          </Grid>
        </Grid>
      </Box>

      {/* Modal form create & edit */}
      <ModalFormPenindakan />

      {/* Modal konfirmasi delete */}
      <DeleteConfirmation
        title={penindakan.delete.title}
        open={penindakan.delete.open}
        onClose={handleCloseDeleteConfirmation}
        onDelete={handleDelete}
        loading={processing}
      />

      {/* Modal konfirmasi restore */}
      <RestoreConfirmation
        open={penindakan.restore.open}
        title={penindakan.restore.title}
        onClose={handleCloseRestoreConfirmation}
        onRestore={handleRestore}
        loading={processing}
      />

      {/* Modal form import excel */}
      <ModalFormImportPenindakan />
    </Fragment>
  );
};

/**
 * Layout
 */
Penindakan.layout = (page) => <AuthLayout title="Penindakan" children={page} />;

export default Penindakan;
