import React, { useState } from "react";
import PropTypes from "prop-types";
import Header from "@/components/Header";
import RefreshButton from "@/components/Buttons/RefreshButton";
import SearchFormDivision from "./Partials/SearchFormDivision";
import DisplayFilterDivision from "./Partials/DisplayFilterDivision";
import Loader from "@/components/Loader";
import { Link, router, usePage } from "@inertiajs/react";
import { Add, FileDownload } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Tooltip } from "@mui/material";
import { useCallback } from "react";
import { saveAs } from "file-saver";
import { useDispatch } from "react-redux";
import { openNotification } from "@/redux/reducers/notificationReducer";

/**
 * Template untuk halaman division
 */
const Template = ({ children }) => {
  const { app, access } = usePage().props;
  const { params } = app.url;
  const dispatch = useDispatch();

  // state
  const [loading, setLoading] = useState(false);

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

  /**
   * Fungsi untuk menangani ketika tombol export diklik
   */
  const handleExport = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: "get",
        url: route("division.export", { _query: params }),
        responseType: "blob",
      });

      saveAs(response.data, `Braind_Ekspor_Kanwil.xlsx`);
      setLoading(false);

      dispatch(
        openNotification({
          status: "success",
          message: "Ekspor kanwil berhasil.",
        })
      );
    } catch (error) {
      setLoading(false);

      console.log(error);

      dispatch(
        openNotification({
          status: "error",
          message: "Terjadi kesalahan, Ekspor kanwil gagal.",
        })
      );
    }
  }, [setLoading, params, dispatch]);

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
              disableElevation
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
              <IconButton type="button" onClick={handleExport}>
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

      <Loader open={loading} />
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
