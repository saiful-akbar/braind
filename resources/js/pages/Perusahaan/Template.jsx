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

/**
 * Tamplate master perusahaan.
 *
 * @returns {React.ReactElement}
 */
const PerusahaanTemplate = ({ children }) => {
  const { access } = usePage().props;
  const { modalForm } = usePerusahaan();

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
