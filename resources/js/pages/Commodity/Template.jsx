import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";
import DownloadButton from "@/components/Buttons/DownloadButton";
import RefreshButton from "@/components/Buttons/RefreshButton";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { addCommodity } from "@/redux/reducers/commodityReducer";
import { router, usePage } from "@inertiajs/react";
import { Add } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import { saveAs } from "file-saver";
import { useDispatch } from "react-redux";
import FilterDisplayTableCommodity from "./Partials/FilterDisplayTableCommodity";
import FormCommodity from "./Partials/FormCommodity";
import SearchTableCommodity from "./Partials/SearchTableCommodity";
import { openNotification } from "@/redux/reducers/notificationReducer";

/**
 * Komponen template untuk halaman commodity.
 */
const CommodityTemplate = ({ children }) => {
  const { access } = usePage().props;
  const dispatch = useDispatch();

  // state
  const [loading, setLoading] = useState(false);

  /**
   * fungsi untuk membuka modal add commodity
   */
  const handleAdd = () => {
    dispatch(addCommodity());
  };

  /**
   * fungsi untuk menangani ketika tombol refresh diklik
   */
  const handleRefresh = useCallback(() => {
    router.reload();
  }, []);

  /**
   * fungsi untuk menangani export excel
   */
  const handleExport = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: "get",
        url: route("commodity.export"),
        responseType: "blob",
      });

      saveAs(response.data, `Braind_Ekspor_Komoditi.xlsx`);
      setLoading(false);

      dispatch(
        openNotification({
          status: "success",
          message: "Ekspor komoditi berhasil.",
        })
      );
    } catch (error) {
      setLoading(false);

      dispatch(
        openNotification({
          status: "error",
          message: "Terjadi kesalahan, Ekspor komoditi gagal.",
        })
      );
    }
  }, [setLoading, dispatch]);

  return (
    <>
      <Header
        title="Master Kode Komoditi"
        action={
          access.create && (
            <Button
              type="button"
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleAdd}
            >
              Tambah
            </Button>
          )
        }
      />

      <Box component="main" sx={{ mt: 5 }}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item md={2} xs={12}>
            <DownloadButton title="Ekspor Excel" onClick={handleExport} />
            <RefreshButton title="Segarkan" onClick={handleRefresh} />
          </Grid>

          {access.destroy && (
            <Grid item md={5} xs={12}>
              <FilterDisplayTableCommodity />
            </Grid>
          )}

          <Grid item md={5} xs={12}>
            <SearchTableCommodity />
          </Grid>

          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>

        <FormCommodity />
        <Loader open={loading} />
      </Box>
    </>
  );
};

/**
 * Prop types
 */
CommodityTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommodityTemplate;
