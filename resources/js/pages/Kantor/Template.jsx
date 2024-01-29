import TableActionButton from "@/components/Buttons/TableActionButton";
import CardPaper from "@/components/CardPaper";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import {
  createKantor,
  openModalImportKantor,
} from "@/redux/reducers/kantorReducer";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { router, usePage } from "@inertiajs/react";
import { Box, Button, CardContent, Grid } from "@mui/material";
import { saveAs } from "file-saver";
import PropTypes from "prop-types";
import { Fragment, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import FilterStatusKantor from "./Partials/FilterStatusKantor";
import ModalFormKantor from "./Partials/ModalFormKantor";
import ModalImportKantor from "./Partials/ModalImportKantor";
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
  const handleReload = useCallback(() => {
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

      saveAs(response.data, "kantor_export.xlsx");
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
  }, [dispatch]);

  /**
   * fungsi untuk membuka modal import
   */
  const handleOpenModalImport = () => {
    dispatch(openModalImportKantor());
  };

  return (
    <Fragment>
      <Header
        title="Kantor"
        action={
          access.create ? (
            <Button type="button" variant="contained" onClick={handleFormOpen}>
              Tambah Kantor
            </Button>
          ) : null
        }
      />

      <Box component="main" sx={{ mt: 5 }}>
        <CardPaper>
          <CardContent>
            <Grid
              container
              spacing={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={12} md={4.5}>
                <SearchKantor />
              </Grid>

              {access.destroy && (
                <Grid item xs={12} md={4.5}>
                  <FilterStatusKantor />
                </Grid>
              )}

              <Grid item xs={12} md={3}>
                <TableActionButton
                  reload
                  export
                  import={access.create}
                  onReload={handleReload}
                  onExport={handleExport}
                  onImport={handleOpenModalImport}
                />
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

      {/* Komponen modal import */}
      <ModalImportKantor />
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
