import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { Add } from "@mui/icons-material";
import { Box, Button, CardContent, Grid } from "@mui/material";
import React, { Fragment, useCallback, useState } from "react";
import ModalFormPerusahaanImport from "./Partials/ModalFormPerusahaanImport";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDeleteConfirmation,
  closeRestoreConfirmation,
  openCreateForm,
  openFormlImport,
} from "@/redux/reducers/perusahaanImportReducer";
import FormFilterPeriodPerusahaanImport from "./Partials/FormFilterPeriodPerusahaanImport";
import CardPaper from "@/components/CardPaper";
import TablePerusahaanImport from "./Partials/TablePerusahaanImport";
import FormSearchPerusahaanImport from "./Partials/FormSearchPerusahaanImport";
import FormFilterStatusPerusahaanImport from "./Partials/FormFilterStatusPerusahaanImport";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import RestoreConfirmation from "@/components/RestoreConfirmation";
import { router } from "@inertiajs/react";
import TableActionButton from "@/components/Buttons/TableActionButton";
import { closeLoading, openLoading } from "@/redux/reducers/loadingReducer";
import { saveAs } from "file-saver";
import { openNotification } from "@/redux/reducers/notificationReducer";
import ModalFormImportPerusahaanImport from "./Partials/ModalFormImportPerusahaanImport";

/**
 * Halaman perusahaan Import
 */
const PerusahaanImport = (props) => {
  const { access, app } = props;
  const { params } = app.url;
  const { csrf } = app;
  const dispatch = useDispatch();
  const perusahaanImport = useSelector((state) => state.perusahaanImport);

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
    const url = route(`perusahaan-import.${perusahaanImport.delete.type}`, {
      perusahaan: perusahaanImport.delete.id,
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
    perusahaanImport,
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
    const url = route("perusahaan-import.restore", {
      perusahaan: perusahaanImport.restore.id,
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
    perusahaanImport,
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
        url: route("perusahaan-import.export"),
        params,
      });

      if (response.status === 200) {
        saveAs(response.data, "perusahaan_import_export.xlsx");
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
   * fungsi untuk cetak PDF report perusahaan import
   */
  const handlePrint = () => {
    window.open(
      route("perusahaan-import.report", {
        _query: params,
      })
    );
  };

  return (
    <Fragment>
      <Header
        title="Perusahaan Import"
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
            <FormFilterPeriodPerusahaanImport />
          </Grid>

          {/* Tabel */}
          <Grid item xs={12}>
            <CardPaper>
              <CardContent>
                <Grid container spacing={3} justifyContent="space-between">
                  <Grid item md={4} xs={12}>
                    <FormSearchPerusahaanImport />
                  </Grid>

                  {access.destroy && (
                    <Grid item md={4} xs={12}>
                      <FormFilterStatusPerusahaanImport />
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
                    <TablePerusahaanImport />
                  </Grid>
                </Grid>
              </CardContent>
            </CardPaper>
          </Grid>
        </Grid>
      </Box>

      {/* Modal form create & edit */}
      <ModalFormPerusahaanImport />

      {/* Modal konfirmasi delete */}
      <DeleteConfirmation
        title={perusahaanImport.delete.title}
        open={perusahaanImport.delete.open}
        onClose={handleCloseDeleteConfirmation}
        onDelete={handleDelete}
        loading={processing}
      />

      {/* Modal konfirmasi restore */}
      <RestoreConfirmation
        open={perusahaanImport.restore.open}
        title={perusahaanImport.restore.title}
        onClose={handleCloseRestoreConfirmation}
        onRestore={handleRestore}
        loading={processing}
      />

      {/* Modal form import excel */}
      <ModalFormImportPerusahaanImport />
    </Fragment>
  );
};

/**
 * Layout
 */
PerusahaanImport.layout = (page) => (
  <AuthLayout title="Perusahaan Import" children={page} />
);

export default PerusahaanImport;
