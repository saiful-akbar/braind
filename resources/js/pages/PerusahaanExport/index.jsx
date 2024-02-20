import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { Add } from "@mui/icons-material";
import { Box, Button, CardContent, Grid } from "@mui/material";
import React, { Fragment, useCallback } from "react";
import ModalFormPerusahaanExport from "./Partials/ModalFormPerusahaanExport";
import { useDispatch } from "react-redux";
import { openCreateForm } from "@/redux/reducers/perusahaanExportReducer";
import FormFilterPeriodPerusahaanExport from "./Partials/FormFilterPeriodPerusahaanExport";
import CardPaper from "@/components/CardPaper";
import TablePerusahaanExport from "./Partials/TablePerusahaanExport";
import FormSearchPerusahaanExport from "./Partials/FormSearchPerusahaanExport";
import FormFilterStatusPerusahaanExport from "./Partials/FormFilterStatusPerusahaanExport";

/**
 * Halaman perusahaan export
 */
const PerusahaanExport = (props) => {
  const { access } = props;
  const dispatch = useDispatch();

  /**
   * fungsi untuk membuka create form.
   * NB: Hanya user yang memiliki akses create yang dapat membuka form.
   */
  const handleOpenCreateForm = useCallback(() => {
    if (access.create) {
      dispatch(openCreateForm());
    }
  }, [dispatch, access]);

  return (
    <Fragment>
      <Header
        title="Perusahaan Export"
        action={
          access.create ? (
            <Button
              type="button"
              color="primary"
              variant="contained"
              onClick={handleOpenCreateForm}
              startIcon={<Add />}
            >
              Tambah
            </Button>
          ) : null
        }
      />

      <Box component="main" sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormFilterPeriodPerusahaanExport />
          </Grid>

          {/* Tabel */}
          <Grid item xs={12}>
            <CardPaper>
              <CardContent>
                <Grid container spacing={3} justifyContent="space-between">
                  <Grid item md={4.5} xs={12}>
                    <FormSearchPerusahaanExport />
                  </Grid>

                  {access.destroy && (
                    <Grid item md={4.5} xs={12}>
                      <FormFilterStatusPerusahaanExport />
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <TablePerusahaanExport />
                  </Grid>
                </Grid>
              </CardContent>
            </CardPaper>
          </Grid>
        </Grid>
      </Box>

      {/* Modal form create & edit */}
      <ModalFormPerusahaanExport />
    </Fragment>
  );
};

/**
 * Layout
 */
PerusahaanExport.layout = (page) => (
  <AuthLayout title="Perusahaan Export" children={page} />
);

export default PerusahaanExport;
