import React from "react";
import PropTypes from "prop-types";
import Header from "@/components/Header";
import { Link, router, usePage } from "@inertiajs/react";
import { Add, FileDownload } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Tooltip } from "@mui/material";
import RefreshButton from "@/components/Buttons/RefreshButton";
import { useCallback } from "react";
import SearchFormDivision from "./Partials/SearchFormDivision";
import DisplayFilterDivision from "./Partials/DisplayFilterDivision";

/**
 * Template untuk halaman division
 */
const Template = ({ children }) => {
  const { app, access } = usePage().props;
  const { params } = app.url;

  /**
   * Fungsi untuk request (fetch) data division.
   */
  const fetchData = useCallback((parameters) => {
    router.get(route("division"), parameters, {
      preserveScroll: true,
    });
  }, []);

  /**
   * fungsi untuk menangani ketika tombol refresh diklik.
   */
  const handleRefreshClick = useCallback(() => {
    fetchData(params);
  }, [params, fetchData]);

  return (
    <>
      <Header
        title="Master Kanwil"
        action={
          access.create && (
            <Button
              type="button"
              variant="contained"
              startIcon={<Add />}
              component={Link}
              href={route("division.create")}
            >
              Tambah
            </Button>
          )
        }
      />

      <Box component="main" sx={{ mt: 5 }}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item md={2} xs={12}>
            <Tooltip title="Ekspor excel" disableInteractive>
              <IconButton>
                <FileDownload />
              </IconButton>
            </Tooltip>

            <RefreshButton onClick={handleRefreshClick} />
          </Grid>

          {access.destroy && (
            <Grid item xs={12} md={5}>
              <DisplayFilterDivision />
            </Grid>
          )}

          <Grid item xs={12} md={5}>
            <SearchFormDivision />
          </Grid>

          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

/**
 * Prop types
 */
Template.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Template;
