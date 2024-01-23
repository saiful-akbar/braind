import ExportImportButton from "@/components/Buttons/ExportImportButton";
import RefreshButton from "@/components/Buttons/RefreshButton";
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
import SearchKantor from "./Partials/SearchKantor";
import ModalImportKantor from "./Partials/ModalImportKantor";

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

      saveAs(response.data, 'master_kantor_ekspor');
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
   * fungsi untuk download template import
   */
  const handleDownloadTemplate = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: "get",
        url: route("kantor.import.template"),
        responseType: "blob",
      });

      if (response.status === 200) {
        // simpan dan download template
        saveAs(response.data, "template_impor_kantor.xlsx");

        // hentikan loading dan tampilkan notifikasi.
        setLoading(false);
        dispatch(
          openNotification({
            status: "success",
            message: "Template berhasil diunduh.",
          })
        );
      }
    } catch (error) {
      // hentikan loading dan tampilkan notifikasi error
      setLoading(false);
      dispatch(
        openNotification({
          status: "error",
          message: "Terjadi kesalahan, gagal mengunduh template.",
        })
      );
    }
  }, [setLoading]);

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
          access.create && (
            <Button type="button" variant="contained" onClick={handleFormOpen}>
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
                <ExportImportButton
                  onExport={handleExport}
                  onDownloadTemplate={handleDownloadTemplate}
                  onImport={handleOpenModalImport}
                />

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
