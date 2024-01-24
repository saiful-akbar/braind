import TableActionButton from "@/components/Buttons/TableActionButton";
import CardPaper from "@/components/CardPaper";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { createKomoditi } from "@/redux/reducers/komoditiReducer";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { router, usePage } from "@inertiajs/react";
import { Box, Button, CardContent, Grid } from "@mui/material";
import { saveAs } from "file-saver";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import FilterStatusKomoditi from "./Partials/FilterStatusKomoditi";
import FormCommodity from "./Partials/FormKomoditi";
import SearchKomoditi from "./Partials/SearchKomoditi";

/**
 * Komponen template untuk halaman commodity.
 */
const KomoditiTemplate = ({ children }) => {
  const { access, app } = usePage().props;
  const { params } = app.url;
  const dispatch = useDispatch();

  // state
  const [loading, setLoading] = useState(false);

  /**
   * fungsi untuk membuka modal add commodity
   */
  const handleAdd = () => {
    dispatch(createKomoditi());
  };

  /**
   * fungsi untuk menangani ketika tombol refresh diklik
   */
  const handleReload = useCallback(() => {
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
        responseType: "blob",
        url: route("komoditi.export"),
        params: {
          ...params,
          _token: app.csrf,
        },
      });

      setLoading(false);
      saveAs(response.data, `braind_master_komoditi.xlsx`);
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
  }, [setLoading, dispatch, params, app]);

  return (
    <>
      <Header
        title="Kode Komoditi"
        action={
          access.create ? (
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleAdd}
            >
              Tambah Komoditi
            </Button>
          ) : null
        }
      />

      <Box component="main" sx={{ mt: 5 }}>
        <CardPaper>
          <CardContent>
            <Grid container spacing={3} justifyContent="space-between">
              {access.destroy && (
                <Grid item md={4.5} xs={12}>
                  <FilterStatusKomoditi />
                </Grid>
              )}

              <Grid item md={4.5} xs={12}>
                <SearchKomoditi />
              </Grid>

              <Grid item md={3} xs={12}>
                <TableActionButton
                  reload
                  export
                  import={access.create}
                  onReload={handleReload}
                  onExport={handleExport}
                />
              </Grid>
            </Grid>
          </CardContent>

          {children}
        </CardPaper>

        <FormCommodity />
        <Loader open={loading} />
      </Box>
    </>
  );
};

/**
 * Prop types
 */
KomoditiTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default KomoditiTemplate;
