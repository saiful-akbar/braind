import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import {
  closeDeleteConfirmation,
  closeRestoreConfirmation,
  openCreateForm,
} from "@/redux/reducers/perusahaanMmeaReducer";
import { router, usePage } from "@inertiajs/react";
import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalFormPerusahaanMmea from "./Partials/ModalFormPerusahaanMmea";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { openNotification } from "@/redux/reducers/notificationReducer";
import RestoreConfirmation from "@/components/RestoreConfirmation";

/**
 * Komponen template untuk halaman perusahaan cukai MMEA.
 *
 * @param {Object} props
 * @returns {React.ReactElement}
 */
const PerusahaanMmeaTemplate = ({ children }) => {
  const { access, app, auth } = usePage().props;
  const { params } = app.url;
  const { csrf } = app;
  const dispatch = useDispatch();
  const perusahaan = useSelector((state) => state.perusahaanMmea);

  /**
   * state
   */
  const [deleting, setDeleting] = useState(false);
  const [restoring, setRestoring] = useState(false);

  /**
   * fungsi untuk membuka form create
   */
  const handleOpenCreateForm = useCallback(() => {
    dispatch(openCreateForm());
  }, [dispatch]);

  /**
   * fungsi untuk menutup modal delete confirmation
   */
  const handleCloseDeleteConfirmation = useCallback(() => {
    if (!deleting) {
      dispatch(closeDeleteConfirmation());
    }
  }, [dispatch, deleting]);

  /**
   * fungsi untuk request delete data perusahaan mmea
   */
  const handleDelete = useCallback(() => {
    const url = route(`perusahaan-mmea.${perusahaan.delete.type}`, {
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
      onStart: () => setDeleting(true),
      onFinish: () => setDeleting(false),
      onSuccess: () => handleCloseDeleteConfirmation(),
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Terjasi kesalahan. Gagal menghapus data perusahaan.",
          })
        );
      },
    });
  }, [
    dispatch,
    perusahaan,
    params,
    setDeleting,
    csrf,
    handleCloseDeleteConfirmation,
  ]);

  /**
   * fungsi untuk menutup modal delete confirmation
   */
  const handleCloseRestoreConfirmation = useCallback(() => {
    if (!deleting) {
      dispatch(closeRestoreConfirmation());
    }
  }, [dispatch, deleting]);

  /**
   * fungsi untuk request delete data perusahaan mmea
   */
  const handleRestore = useCallback(() => {
    const url = route(`perusahaan-mmea.restore`, {
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
      onStart: () => setRestoring(true),
      onFinish: () => setRestoring(false),
      onSuccess: () => handleCloseRestoreConfirmation(),
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Terjasi kesalahan. Gagal memulihkan data perusahaan.",
          })
        );
      },
    });
  }, [
    dispatch,
    perusahaan,
    params,
    setRestoring,
    csrf,
    handleCloseRestoreConfirmation,
  ]);

  return (
    <AuthLayout title="Perusahaan Cukai MMEA">
      <Header
        title="Perusahaan Cukai MMEA"
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
        {children}
      </Box>

      {/* Modal form create & update */}
      <ModalFormPerusahaanMmea />

      {/* Modal delete confirmation */}
      {Boolean(access.remove || access.destroy) && (
        <DeleteConfirmation
          open={Boolean(perusahaan.delete.id !== null)}
          title={perusahaan.delete.title}
          loading={deleting}
          onClose={handleCloseDeleteConfirmation}
          onDelete={handleDelete}
        />
      )}

      {/* Modal restore confirmation */}
      {access.destroy && (
        <RestoreConfirmation
          open={Boolean(perusahaan.restore.id !== null)}
          title={perusahaan.restore.title}
          loading={restoring}
          onClose={handleCloseRestoreConfirmation}
          onRestore={handleRestore}
        />
      )}
    </AuthLayout>
  );
};

PerusahaanMmeaTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PerusahaanMmeaTemplate;
