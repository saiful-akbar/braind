import DownloadButton from "@/components/Buttons/DownloadButton";
import RefreshButton from "@/components/Buttons/RefreshButton";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { Link, router, usePage } from "@inertiajs/react";
import { Box, Button, Grid } from "@mui/material";
import { saveAs } from "file-saver";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import FilterStatusKantor from "./Partials/FilterStatusKantor";
import SearchKantor from "./Partials/SearchKantor";

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
        responseType: "blob",
        url: route("kantor.export"),
        params: {
          ...params,
          _token: app.csrf,
        },
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

  return (
    <>
      <Header
        title="Kantor"
        action={
          access.create && (
            <Button
              disableElevation
              type="button"
              variant="contained"
              component={Link}
              href={route("kantor.create")}
            >
              Tambah Kantor
            </Button>
          )
        }
      />

      <Box component="main" sx={{ mt: 5 }}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item md={2} xs={12}>
            <DownloadButton
              color="primary"
              title="Ekspor excel"
              onClick={handleExport}
            />

            <RefreshButton color="primary" onClick={handleRefreshClick} />
          </Grid>

          {access.destroy && (
            <Grid item xs={12} md={5}>
              <FilterStatusKantor />
            </Grid>
          )}

          <Grid item xs={12} md={5}>
            <SearchKantor />
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
