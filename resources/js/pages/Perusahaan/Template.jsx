import React from "react";
import PropTypes from "prop-types";
import AuthLayout from "@/layouts/AuthLayout";
import { Box, Button, Grid } from "@mui/material";
import Header from "@/components/Header";
import { usePage } from "@inertiajs/react";
import { useSelector } from "react-redux";
import usePerusahaan from "@/hooks/usePerusahaan";
import ModalFormPerusahaan from "./Partials/ModalFormPerusahaan";
import { Add } from "@mui/icons-material";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import RestoreConfirmation from "@/components/RestoreConfirmation";
import ModalFormImportPerusahaan from "./Partials/ModalFormImportPerusahaan";

/**
 * Tamplate master perusahaan.
 *
 * @returns {React.ReactElement}
 */
const PerusahaanTemplate = ({ children }) => {
  const { access } = usePage().props;
  const { modalForm, delete: destroy, restore } = usePerusahaan();
  const perusahaan = useSelector((state) => state.perusahaan);

  return (
    <AuthLayout title="Perusahaan">
      <Header
        title="Perusahaan"
        action={
          access.create ? (
            <Button
              type="button"
              color="primary"
              variant="contained"
              onClick={() => modalForm.open()}
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

      {/* Komponen modal form create & update */}
      <ModalFormPerusahaan />

      {/* Modal dialog konfirmasi hapus */}
      {Boolean(access.remove || access.destroy) && (
        <DeleteConfirmation
          open={Boolean(perusahaan.delete.id !== null)}
          title={perusahaan.delete.title}
          loading={perusahaan.delete.processing}
          onDelete={() => destroy.submit()}
          onClose={() => destroy.close()}
        />
      )}

      {/* Modal dialog konfirmasi pemulihan (restore) */}
      {access.destroy && (
        <RestoreConfirmation
          open={Boolean(perusahaan.restore.id !== null)}
          title={perusahaan.restore.title}
          loading={perusahaan.restore.processing}
          onRestore={() => restore.submit()}
          onClose={() => restore.close()}
        />
      )}

      {/* Komponen import excel */}
      {access.create && <ModalFormImportPerusahaan />}
    </AuthLayout>
  );
};

/**
 * Prop types
 */
PerusahaanTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PerusahaanTemplate;
