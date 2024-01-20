import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Header from "@/components/Header";
import { Box, Button, CardContent, Grid } from "@mui/material";
import FilterDateHtHptl from "./Partials/FilterDateHtHptl";
import ModalActionHtHptl from "./Partials/ModalActionHtHptl";
import { useDispatch, useSelector } from "react-redux";
import { createPerusahaanHtHptl } from "@/redux/reducers/perusahaanHtHptlReducer";
import CardPaper from "@/components/CardPaper";
import RefreshButton from "@/components/Buttons/RefreshButton";
import DownloadButton from "@/components/Buttons/DownloadButton";
import { router, usePage } from "@inertiajs/react";
import Loader from "@/components/Loader";
import { saveAs } from "file-saver";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { useCallback } from "react";
import ExportImportButton from "@/components/Buttons/ExportImportButton";
import ImportHtHptl from "./Partials/ImportHtHptl";

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
      saveAs(response.data, `braind_perusahaan_cukai_ht_htpl.xlsx`);
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
        url: route("perusahaan.hthptl.export.template"),
        responseType: "blob",
      });

      // simpan hasil download dan tampilkan notifikasi download berhasil.
      if (response.status === 200) {
        saveAs(response.data, "template_impor_perusahaan_cukai_ht_hptl.xlsx");
        setLoading(false);
        dispatch(
          openNotification({
            status: "success",
            message: "Download template berhasil.",
          })
        );
      }
    } catch (error) {
      const { status } = error.response;

      setLoading(false);
      dispatch(
        openNotification({
          status: "error",
          message: `${status} - Terjadi kesalahan, download template gagal.`,
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
            <FilterDateHtHptl />
          </Grid>

          <Grid item xs={12}>
            <CardPaper>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={2} xs={12}>
                    <RefreshButton onClick={handleReload} title="Muat ulang" />

                    <ExportImportButton
                      onExport={handleExport}
                      onImport={toggleModalImport}
                      onDownloadTemplate={handleDownloadTemplate}
                    />
                  </Grid>

                  <Grid item md={5} xs={12}></Grid>

                  <Grid item md={5} xs={12}></Grid>

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
      <ModalActionHtHptl />

      {/* Komponen modal import excel */}
      <ImportHtHptl open={openImport} onClose={toggleModalImport} />

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
