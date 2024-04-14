import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { Add } from "@mui/icons-material";
import { Box, Button, CardContent, Grid } from "@mui/material";
import React, { Fragment, useCallback, useState } from "react";
import ModalFormOperasilAlatTelekomunikasi from "./Partials/ModalFormOperasiAlatTelekomunikasi";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDeleteConfirmation,
  closeRestoreConfirmation,
  openCreateForm,
  openFormlImport,
} from "@/redux/reducers/operasiAlatTelekomunikasiReducer";
import FormFilterPeriodOperasilAlatTelekomunikasi from "./Partials/FormFilterPeriodOperasiAlatTelekomunikasi";
import CardPaper from "@/components/CardPaper";
import TableOperasilAlatTelekomunikasi from "./Partials/TableOperasiAlatTelekomunikasi";
import FormSearchOperasilAlatTelekomunikasi from "./Partials/FormSearchOperasiAlatTelekomunikasi";
import FormFilterStatusOperasilAlatTelekomunikasi from "./Partials/FormFilterStatusOperasiAlatTelekomunikasi";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import RestoreConfirmation from "@/components/RestoreConfirmation";
import { router } from "@inertiajs/react";
import TableActionButton from "@/components/Buttons/TableActionButton";
import { closeLoading, openLoading } from "@/redux/reducers/loadingReducer";
import { saveAs } from "file-saver";
import { openNotification } from "@/redux/reducers/notificationReducer";
import ModalFormImportOperasilAlatTelekomunikasi from "./Partials/ModalFormImportOperasiAlatTelekomunikasi";

/**
 * Halaman sarana oprasi alat telekomunikasi
 */
const OperasilAlatTelekomunikasi = (props) => {
  const { access, app } = props;
  const { params } = app.url;
  const { csrf } = app;
  const dispatch = useDispatch();
  const operasiAlatTelekomunikasi = useSelector(
    (state) => state.operasiAlatTelekomunikasi
  );

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
   * fungsi untuk mengapus data sarana operasi alat telekomunikasi
   */
  const handleDelete = useCallback(() => {
    const url = route(
      `operasi-alat-telekomunikasi.${operasiAlatTelekomunikasi.delete.type}`,
      {
        operasi: operasiAlatTelekomunikasi.delete.id,
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
    operasiAlatTelekomunikasi,
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
    const url = route("operasi-alat-telekomunikasi.restore", {
      operasi: operasiAlatTelekomunikasi.restore.id,
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
    operasiAlatTelekomunikasi,
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
        url: route("operasi-alat-telekomunikasi.export"),
        params,
      });

      if (response.status === 200) {
        saveAs(response.data, "operasi_alat_telekomunikasi_export.xlsx");
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

  /**
   * cetak laporan PDF
   */
  const handlePrint = () => {
    window.open(
      route("operasi-alat-telekomunikasi.report", {
        _query: params,
      })
    );
  };

  return (
    <Fragment>
      <Header
        title="Operasi Alat Telekomunikasi"
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
            <FormFilterPeriodOperasilAlatTelekomunikasi />
          </Grid>

          {/* Tabel */}
          <Grid item xs={12}>
            <CardPaper>
              <CardContent>
                <Grid container spacing={3} justifyContent="space-between">
                  <Grid item md={4} xs={12}>
                    <FormSearchOperasilAlatTelekomunikasi />
                  </Grid>

                  {access.destroy && (
                    <Grid item md={4} xs={12}>
                      <FormFilterStatusOperasilAlatTelekomunikasi />
                    </Grid>
                  )}

                  <Grid item md={4} xs={12}>
                    <TableActionButton
                      reload
                      export
                      print
                      import={access.create}
                      onReload={handleReload}
                      onExport={handleExport}
                      onImport={handleOpenFormImport}
                      onPrint={handlePrint}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TableOperasilAlatTelekomunikasi />
                  </Grid>
                </Grid>
              </CardContent>
            </CardPaper>
          </Grid>
        </Grid>
      </Box>

      {/* Modal form create & edit */}
      <ModalFormOperasilAlatTelekomunikasi />

      {/* Modal konfirmasi delete */}
      <DeleteConfirmation
        title={operasiAlatTelekomunikasi.delete.title}
        open={operasiAlatTelekomunikasi.delete.open}
        onClose={handleCloseDeleteConfirmation}
        onDelete={handleDelete}
        loading={processing}
      />

      {/* Modal konfirmasi restore */}
      <RestoreConfirmation
        open={operasiAlatTelekomunikasi.restore.open}
        title={operasiAlatTelekomunikasi.restore.title}
        onClose={handleCloseRestoreConfirmation}
        onRestore={handleRestore}
        loading={processing}
      />

      {/* Modal form import excel */}
      <ModalFormImportOperasilAlatTelekomunikasi />
    </Fragment>
  );
};

/**
 * Layout
 */
OperasilAlatTelekomunikasi.layout = (page) => (
  <AuthLayout title="Operasi Alat Telekomunikasi" children={page} />
);

export default OperasilAlatTelekomunikasi;
