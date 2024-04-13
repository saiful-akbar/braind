import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { Add } from "@mui/icons-material";
import { Box, Button, CardContent, Grid } from "@mui/material";
import React, { Fragment, useCallback, useState } from "react";
import ModalFormPerusahaanExport from "./Partials/ModalFormPerusahaanExport";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDeleteConfirmation,
  closeRestoreConfirmation,
  openCreateForm,
  openFormlImport,
} from "@/redux/reducers/perusahaanExportReducer";
import FormFilterPeriodPerusahaanExport from "./Partials/FormFilterPeriodPerusahaanExport";
import CardPaper from "@/components/CardPaper";
import TablePerusahaanExport from "./Partials/TablePerusahaanExport";
import FormSearchPerusahaanExport from "./Partials/FormSearchPerusahaanExport";
import FormFilterStatusPerusahaanExport from "./Partials/FormFilterStatusPerusahaanExport";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import RestoreConfirmation from "@/components/RestoreConfirmation";
import { router } from "@inertiajs/react";
import TableActionButton from "@/components/Buttons/TableActionButton";
import { closeLoading, openLoading } from "@/redux/reducers/loadingReducer";
import { saveAs } from "file-saver";
import { openNotification } from "@/redux/reducers/notificationReducer";
import ModalFormImportPerusahaanExport from "./Partials/ModalFormImportPerusahaanExport";

/**
 * Halaman perusahaan export
 */
const PerusahaanExport = (props) => {
  const { access, app } = props;
  const { params } = app.url;
  const { csrf } = app;
  const dispatch = useDispatch();
  const perusahaanExport = useSelector((state) => state.perusahaanExport);

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
   * fungsi untuk mengapus data perusahaan
   */
  const handleDelete = useCallback(() => {
    const url = route(`perusahaan-export.${perusahaanExport.delete.type}`, {
      perusahaan: perusahaanExport.delete.id,
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
    perusahaanExport,
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
    const url = route("perusahaan-export.restore", {
      perusahaan: perusahaanExport.restore.id,
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
    perusahaanExport,
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
        url: route("perusahaan-export.export"),
        params,
      });

      if (response.status === 200) {
        saveAs(response.data, "perusahaan_export;_export.xlsx");
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
   * fungsi untuk cetak laporan PDF perusahaan export
   */
  const handlePrint = () => {
    window.open(
      route("perusahaan-export.report", {
        _query: params,
      })
    );
  };

  return (
    <Fragment>
      <Header
        title="Perusahaan Export"
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
            <FormFilterPeriodPerusahaanExport />
          </Grid>

          {/* Tabel */}
          <Grid item xs={12}>
            <CardPaper>
              <CardContent>
                <Grid container spacing={3} justifyContent="space-between">
                  <Grid item md={4} xs={12}>
                    <FormSearchPerusahaanExport />
                  </Grid>

                  {access.destroy && (
                    <Grid item md={4} xs={12}>
                      <FormFilterStatusPerusahaanExport />
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
                    <TablePerusahaanExport />
                  </Grid>
                </Grid>
              </CardContent>
            </CardPaper>
          </Grid>
        </Grid>
      </Box>

      {/* Modal form create & edit */}
      <ModalFormPerusahaanExport />

      {/* Modal konfirmasi delete */}
      <DeleteConfirmation
        title={perusahaanExport.delete.title}
        open={perusahaanExport.delete.open}
        onClose={handleCloseDeleteConfirmation}
        onDelete={handleDelete}
        loading={processing}
      />

      {/* Modal konfirmasi restore */}
      <RestoreConfirmation
        open={perusahaanExport.restore.open}
        title={perusahaanExport.restore.title}
        onClose={handleCloseRestoreConfirmation}
        onRestore={handleRestore}
        loading={processing}
      />

      {/* Modal form import excel */}
      <ModalFormImportPerusahaanExport />
    </Fragment>
  );
};

/**
 * Layout
 */
PerusahaanExport.layout = (page) => (
  <AuthLayout title="Perusahaan Export" children={page} />
);

export default PerusahaanExport;
