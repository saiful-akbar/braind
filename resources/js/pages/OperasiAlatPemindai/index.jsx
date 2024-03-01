import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { Add } from "@mui/icons-material";
import { Box, Button, CardContent, Grid } from "@mui/material";
import React, { Fragment, useCallback, useState } from "react";
import ModalFormOprasilAlatPemindai from "./Partials/ModalFormOprasiAlatPemindai";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDeleteConfirmation,
  closeRestoreConfirmation,
  openCreateForm,
  openFormlImport,
} from "@/redux/reducers/operasiAlatPemindaiReducer";
import FormFilterPeriodOprasilAlatPemindai from "./Partials/FormFilterPeriodOprasiAlatPemindai";
import CardPaper from "@/components/CardPaper";
import TableOprasilAlatPemindai from "./Partials/TableOprasiAlatPemindai";
import FormSearchOprasilAlatPemindai from "./Partials/FormSearchOprasiAlatPemindai";
import FormFilterStatusOprasilAlatPemindai from "./Partials/FormFilterStatusOprasiAlatPemindai";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import RestoreConfirmation from "@/components/RestoreConfirmation";
import { router } from "@inertiajs/react";
import TableActionButton from "@/components/Buttons/TableActionButton";
import { closeLoading, openLoading } from "@/redux/reducers/loadingReducer";
import { saveAs } from "file-saver";
import { openNotification } from "@/redux/reducers/notificationReducer";
import ModalFormImportOprasilAlatPemindai from "./Partials/ModalFormImportOprasiAlatPemindai";

/**
 * Halaman sarana oprasi alat pemindai
 */
const OprasilAlatPemindai = (props) => {
  const { access, app } = props;
  const { params } = app.url;
  const { csrf } = app;
  const dispatch = useDispatch();
  const operasiAlatPemindai = useSelector((state) => state.operasiAlatPemindai);

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
   * fungsi untuk mengapus data sarana operasi alat pemindai
   */
  const handleDelete = useCallback(() => {
    const url = route(
      `operasi-alat-pemindai.${operasiAlatPemindai.delete.type}`,
      {
        operasi: operasiAlatPemindai.delete.id,
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
    operasiAlatPemindai,
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
    const url = route("operasi-alat-pemindai.restore", {
      operasi: operasiAlatPemindai.restore.id,
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
    operasiAlatPemindai,
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
        url: route("operasi-alat-pemindai.export"),
        params,
      });

      if (response.status === 200) {
        saveAs(response.data, "operasi_alat_pemindai_export.xlsx");
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
        title="Oprasi Alat Pemindai"
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
            <FormFilterPeriodOprasilAlatPemindai />
          </Grid>

          {/* Tabel */}
          <Grid item xs={12}>
            <CardPaper>
              <CardContent>
                <Grid container spacing={3} justifyContent="space-between">
                  <Grid item md={4.5} xs={12}>
                    <FormSearchOprasilAlatPemindai />
                  </Grid>

                  {access.destroy && (
                    <Grid item md={4.5} xs={12}>
                      <FormFilterStatusOprasilAlatPemindai />
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
                    <TableOprasilAlatPemindai />
                  </Grid>
                </Grid>
              </CardContent>
            </CardPaper>
          </Grid>
        </Grid>
      </Box>

      {/* Modal form create & edit */}
      <ModalFormOprasilAlatPemindai />

      {/* Modal konfirmasi delete */}
      <DeleteConfirmation
        title={operasiAlatPemindai.delete.title}
        open={operasiAlatPemindai.delete.open}
        onClose={handleCloseDeleteConfirmation}
        onDelete={handleDelete}
        loading={processing}
      />

      {/* Modal konfirmasi restore */}
      <RestoreConfirmation
        open={operasiAlatPemindai.restore.open}
        title={operasiAlatPemindai.restore.title}
        onClose={handleCloseRestoreConfirmation}
        onRestore={handleRestore}
        loading={processing}
      />

      {/* Modal form import excel */}
      <ModalFormImportOprasilAlatPemindai />
    </Fragment>
  );
};

/**
 * Layout
 */
OprasilAlatPemindai.layout = (page) => (
  <AuthLayout title="Operasi Alat Pemindai" children={page} />
);

export default OprasilAlatPemindai;
