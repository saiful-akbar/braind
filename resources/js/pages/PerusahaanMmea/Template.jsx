import React from "react";
import PropTypes from "prop-types";
import AuthLayout from "@/layouts/AuthLayout";
import { Box, Button } from "@mui/material";
import { usePage } from "@inertiajs/react";
import Header from "@/components/Header";
import ModalFormPerusahaanMmea from "./Partials/ModalFormPerusahaanMmea";
import usePerusahaanMmea from "@/hooks/usePerusahaaMmea";
import { Add } from "@mui/icons-material";

/**
 * Komponen template untuk halaman perusahaan cukai MMEA.
 *
 * @param {Object} props
 * @returns {React.ReactElement}
 */
const PerusahaanMmeaTemplate = ({ children }) => {
  const { access } = usePage().props;
  const { modalForm } = usePerusahaanMmea();

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

      {/* Modal form create & update */}
      <ModalFormPerusahaanMmea />
    </AuthLayout>
  );
};

PerusahaanMmeaTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PerusahaanMmeaTemplate;
