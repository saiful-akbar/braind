import React from "react";
import PropTypes from "prop-types";
import AuthLayout from "@/layouts/AuthLayout";
import { Box, Button } from "@mui/material";
import { usePage } from "@inertiajs/react";
import Header from "@/components/Header";

/**
 * Komponen template untuk halaman perusahaan cukai MMEA.
 *
 * @param {Object} props
 * @returns {React.ReactElement}
 */
const PerusahaanMmeaTemplate = ({ children }) => {
  const { access } = usePage().props;

  return (
    <AuthLayout title="Perusahaan Cukai MMEA">
      <Header
        title="Perusahaan Cukai MMEA"
        action={
          access.create ? (
            <Button type="button" color="primary" variant="contained">
              Tambah Perusahaan
            </Button>
          ) : null
        }
      />

      <Box component="main" sx={{ mt: 5 }}>
        {children}
      </Box>
    </AuthLayout>
  );
};

PerusahaanMmeaTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PerusahaanMmeaTemplate;
