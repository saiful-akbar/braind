import React, { useCallback, useState, Fragment } from "react";
import PropTypes from "prop-types";
import DownloadButton from "@/components/Buttons/DownloadButton";
import RefreshButton from "@/components/Buttons/RefreshButton";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { Link, router, usePage } from "@inertiajs/react";
import { Box, Button, CardContent, Grid } from "@mui/material";
import { saveAs } from "file-saver";
import { useDispatch } from "react-redux";
import FilterStatusKantor from "./Partials/FilterStatusKantor";
import SearchKantor from "./Partials/SearchKantor";
import ModalFormKantor from "./Partials/ModalFormKantor";
import CardPaper from "@/components/CardPaper";
import { createKantor } from "@/redux/reducers/kantorReducer";

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
    router.get(route("kantor"), parameters, {
      preserveScroll: true,
    });
  }, []);

  /**
   * fungsi untuk menangani ketika tombol refresh diklik.
   */
  const handleRefresh = useCallback(() => {
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
        responseType: "blob",
        url: route("kantor.export"),
        params,
      });

      saveAs(response.data, `braind_master_kantor.xlsx`);
      setLoading(false);
      dispatch(
        openNotification({
          status: "success",
          message: "Ekspor kantor berhasil.",
        })
      );
    } catch (error) {
      setLoading(false);
      dispatch(
        openNotification({
          status: "error",
          message: "Terjadi kesalahan, Ekspor kantor gagal.",
        })
      );
    }
  }, [setLoading, params, dispatch, app]);

  /**
   * fungsi untuk mmebuka dialog form untuk create kantor.
   */
  const handleFormOpen = useCallback(() => {
    dispatch(createKantor());
  }, [dispatch])

  return (
    <Fragment>
      <Header
        title="Kantor"
        action={
          access.create && (
            <Button
              type="button"
              variant="contained"
              onClick={handleFormOpen}
            >
              Tambah kantor
            </Button>
          )
        }
      />

      <Box component="main" sx={{ mt: 5 }}>
        <CardPaper>
          <CardContent>
            <Grid container spacing={3} justifyContent="space-between">
              <Grid item md={2} xs={12}>
                <DownloadButton title="Ekspor excel" onClick={handleExport} />
                <RefreshButton onClick={handleRefresh} />
              </Grid>

              {access.destroy && (
                <Grid item xs={12} md={5}>
                  <FilterStatusKantor />
                </Grid>
              )}

              <Grid item xs={12} md={5}>
                <SearchKantor />
              </Grid>
            </Grid>
          </CardContent>

          {children}
        </CardPaper>
      </Box>

      {/* Komponen preloader */}
      <Loader open={loading} />

      {/* Komponen modal form */}
      <ModalFormKantor />
    </Fragment>
  );
};

/**
 * Prop types
 */
Template.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Template;
