import DownloadButton from "@/components/Buttons/DownloadButton";
import RefreshButton from "@/components/Buttons/RefreshButton";
import CardPaper from "@/components/CardPaper";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { Link, router, usePage } from "@inertiajs/react";
import { Box, Button, CardContent, Grid } from "@mui/material";
import { saveAs } from "file-saver";
import PropTypes from "prop-types";
import { Fragment, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import FilterStatusSbp from "./Partials/FilterStatusSbp";
import SearchSbp from "./Partials/SearchSbp";
import FilterDateSbp from "./Partials/FilterDateSbp";

/**
 * Komponen template untuk halaman SBP
 */
const SbpTemplate = ({ children }) => {
  const { params } = usePage().props.app.url;
  const dispatch = useDispatch();

  // state
  const [loading, setLoading] = useState(false);

  /**
   * fungsi reload
   */
  const handleReload = useCallback(() => {
    router.get(route("sbp"), params, {
      preserveScroll: true,
    });
  }, [params]);

  /**
   * fungsi untuk menangani export excel
   */
  const handleExport = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: "get",
        responseType: "blob",
        url: route("sbp.export"),
        params,
      });

      setLoading(false);
      saveAs(response.data, `braind_master_sbp.xlsx`);
      dispatch(
        openNotification({
          status: "success",
          message: "Ekspor SBP berhasil.",
        })
      );
    } catch (error) {
      setLoading(false);
      dispatch(
        openNotification({
          status: "error",
          message: "Terjadi kesalahan, Ekspor SBP gagal.",
        })
      );
    }
  }, [setLoading, dispatch, params, app]);

  return (
    <Fragment>
      <Header
        title="Master SBP"
        action={
          <Button
            type="button"
            color="primary"
            variant="contained"
            component={Link}
            href={route("sbp.create")}
          >
            Tambah SBP
          </Button>
        }
      />

      <Box component="main" sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FilterDateSbp />
          </Grid>

          <Grid item xs={12}>
            <CardPaper>
              <CardContent>
                <Grid container spacing={3} justifyContent="space-between">
                  <Grid item xs={12} md={2}>
                    <DownloadButton
                      title="Export excel"
                      onClick={handleExport}
                    />
                    <RefreshButton title="Muat ulang" onClick={handleReload} />
                  </Grid>

                  <Grid item xs={12} md={5}>
                    <FilterStatusSbp />
                  </Grid>

                  <Grid item xs={12} md={5}>
                    <SearchSbp />
                  </Grid>
                </Grid>
              </CardContent>

              {children}
            </CardPaper>
          </Grid>
        </Grid>
      </Box>

      <Loader open={loading} />
    </Fragment>
  );
};

/**
 * Prop types
 */
SbpTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SbpTemplate;
