import TableActionButton from "@/components/Buttons/TableActionButton";
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
import { useDispatch } from "react-redux";
import FilterPeriod from "./Partials/FilterPeriod";
import FilterStatus from "./Partials/FilterStatus";
import ImportExcel from "./Partials/ImportExcel";
import ModalForm from "./Partials/ModalForm";
import Search from "./Partials/Search";
import { Add } from "@mui/icons-material";

/**
 * Template intuk halaman perusahaan cukai HT + HPTL
 *
 * @returns {React.ReactElement}
 */
const PerusahaanHtHptlTemplate = ({ children }) => {
  const dispatch = useDispatch();
  const { app, access } = usePage().props;
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
        url: route("perusahaan-hthptl.export"),
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
   * Toggle buka dan tutup modal import
   */
  const toggleModalImport = useCallback(() => {
    setOpenImport((prevState) => !prevState);
  }, [setOpenImport]);

  /**
   * fungsi untuk menangani print report PDF
   */
  const handlePrint = () => {
    window.open(
      route("perusahaan-hthptl.report", {
        _query: params,
      })
    );
  };

  return (
    <Fragment>
      <Header
        title="Perusahaan Cukai HT + HPTL"
        action={
          access.create ? (
            <Button
              color="primary"
              variant="contained"
              onClick={handleOpenCreateModal}
              startIcon={<Add />}
            >
              Tambah
            </Button>
          ) : null
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
                  <Grid item md={4} xs={12}>
                    <Search />
                  </Grid>

                  {access.destroy && (
                    <Grid item md={4} xs={12}>
                      <FilterStatus />
                    </Grid>
                  )}

                  <Grid item md={4} xs={12}>
                    <TableActionButton
                      reload
                      export
                      print
                      import={access.create}
                      onReload={handleReload}
                      onExport={handleExport}
                      onImport={toggleModalImport}
                      onPrint={handlePrint}
                    />
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
