import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Header from "@/components/Header";
import { Box, Button, Grid } from "@mui/material";
import FilterDateHtHptl from "./Partials/FilterDateHtHptl";
import ModalActionHtHptl from "./Partials/ModalActionHtHptl";
import { useDispatch, useSelector } from "react-redux";
import { createPerusahaanHtHptl } from "@/redux/reducers/perusahaanHtHptlReducer";

/**
 * Template intuk halaman perusahaan cukai HT + HPTL
 *
 * @returns {React.ReactElement}
 */
const PerusahaanHtHptlTemplate = ({ children }) => {
  const perusahaanHtHptl = useSelector((state) => state.perusahaanHtHptl);
  const dispatch = useDispatch();

  /**
   * Fungsi untuk mmebuka form tambah data perusahaan cukai Ht + HPTL
   */
  const handleOpenCreateModal = () => {
    dispatch(createPerusahaanHtHptl());
  };

  return (
    <Fragment>
      <Header
        title="Perusahaan Cukai HT + HPTL"
        action={
          <Button
            color="primary"
            variant="contained"
            onClick={handleOpenCreateModal}
          >
            Tambah perusahaan
          </Button>
        }
      />

      {/* Komponen utama, tabel data perusahaan cukai HT + HPTL */}
      <Box component="main" sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FilterDateHtHptl />
          </Grid>

          <Grid item xs={12} container spacing={3}>
            <Grid item md={2} xs={12}></Grid>

            <Grid item md={5} xs={12}></Grid>

            <Grid item md={5} xs={12}></Grid>

            <Grid item xs={12}>
              {children}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Komponen modal create & update */}
      <ModalActionHtHptl />
    </Fragment>
  );
};

/**
 * Prop types
 */
PerusahaanHtHptlTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PerusahaanHtHptlTemplate;
