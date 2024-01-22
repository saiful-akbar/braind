import ExportImportButton from "@/components/Buttons/ExportImportButton";
import RefreshButton from "@/components/Buttons/RefreshButton";
import CardPaper from "@/components/CardPaper";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { createPerusahaanHtHptl } from "@/redux/reducers/perusahaanHtHptlReducer";
import { router, usePage } from "@inertiajs/react";
import { Box, Button, CardContent, Grid } from "@mui/material";
import { saveAs } from "file-saver";
import PropTypes from "prop-types";
import React, { Fragment, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterPeriod from "./Partials/FilterPeriod";
import FilterStatus from "./Partials/FilterStatus";
import ImportExcel from "./Partials/ImportExcel";
import ModalForm from "./Partials/ModalForm";
import Search from "./Partials/Search";

/**
 * Template intuk halaman perusahaan cukai HT + HPTL
 *
 * @returns {React.ReactElement}
 */
const PerusahaanHtHptlTemplate = ({ children }) => {
  const perusahaanHtHptl = useSelector((state) => state.perusahaanHtHptl);
  const dispatch = useDispatch();
  const { app } = usePage().props;
  const { params } = app.url;

  // state
  const [loading, setLoading] = useState(false);
  const [openImport, setOpenImport] = useState(false);

  /**
   * Fungsi untuk mmebuka form tambah data perusahaan cukai Ht + HPTL
   */
  const handleOpenCreateModal = () => {
    dispatch(createPerusahaanHtHptl());
  };

  /**
   * fungsi untuk reload table
   */
  const handleReload = () => {
    router.reload();
  };

  /**
   * fungsi untuk menangani export excel
   */
  const handleExport = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: "get",
        responseType: "blob",
        url: route("perusahaan.hthptl.export"),
        params,
      });

      setLoading(false);
      saveAs(response.data, `EKSPOR_PERUSAHAAN_CUKAI_HT_HPTL.xlsx`);
      dispatch(
        openNotification({
          status: "success",
          message: "Ekspor berhasil.",
        })
      );
    } catch (error) {
      const { status } = error.response;

      setLoading(false);
      dispatch(
        openNotification({
          status: "error",
          message: `${status} - Terjadi kesalahan, Ekspor gagal.`,
        })
      );
    }
  }, [setLoading, dispatch, params]);

  /**
   * fungsi untuk download template import
   */
  const handleDownloadTemplate = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: "get",
        url: route("perusahaan.hthptl.import.template"),
        responseType: "blob",
      });

      if (response.status === 200) {
        setLoading(false);
        saveAs(response.data, "template_impor_perusahaan_cukai_ht_hptl.xlsx");
        dispatch(
          openNotification({
            status: "success",
            message: "Template berhasil diunduh.",
          })
        );
      }
    } catch (error) {
      setLoading(false);
      dispatch(
        openNotification({
          status: "error",
          message: "Terjadi kesalahan, template gagal diunduh.",
        })
      );
    }
  }, [dispatch, setLoading]);

  /**
   * Toggle buka dan tutup modal import
   */
  const toggleModalImport = useCallback(() => {
    setOpenImport((prevState) => !prevState);
  }, [setOpenImport]);

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
            <FilterPeriod />
          </Grid>

          <Grid item xs={12}>
            <CardPaper>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={2} xs={12}>
                    <ExportImportButton
                      onExport={handleExport}
                      onImport={toggleModalImport}
                      onDownloadTemplate={handleDownloadTemplate}
                    />

                    <RefreshButton onClick={handleReload} />
                  </Grid>

                  <Grid item md={5} xs={12}>
                    <FilterStatus />
                  </Grid>

                  <Grid item md={5} xs={12}>
                    <Search />
                  </Grid>

                  <Grid item xs={12}>
                    {children}
                  </Grid>
                </Grid>
              </CardContent>
            </CardPaper>
          </Grid>
        </Grid>
      </Box>

      {/* Komponen modal create & update */}
      <ModalForm />

      {/* Komponen modal import excel */}
      <ImportExcel open={openImport} onClose={toggleModalImport} />

      {/* komponen loading */}
      <Loader open={loading} />
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
