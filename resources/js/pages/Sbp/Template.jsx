import TableActionButton from "@/components/Buttons/TableActionButton";
import CardPaper from "@/components/CardPaper";
import Header from "@/components/Header";
import useSbp from "@/hooks/useSbp";
import { Box, Button, CardContent, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment } from "react";
import FilterDateSbp from "./Partials/FilterDateSbp";
import FilterStatusSbp from "./Partials/FilterStatusSbp";
import ModalFormSbp from "./Partials/ModalFormSbp";
import SearchSbp from "./Partials/SearchSbp";
import { usePage } from "@inertiajs/react";
import ModalFormImportSbp from "./Partials/ModalFormImportSbp";
import { Add } from "@mui/icons-material";

/**
 * Komponen template untuk halaman SBP
 *
 * @param {children} props
 * @return {React.ReactElement}
 */
const SbpTemplate = ({ children }) => {
  const { exportExcel, reload, openModalForm } = useSbp();
  const { openForm: openFormImport } = useSbp().importExcel;
  const { access, app } = usePage().props;
  const { params } = app.url;

  /**
   * fungsi untuk menangani print PDF
   */
  const handlePrint = () => {
    window.open(
      route("sbp.report", {
        _query: params,
      })
    );
  };

  return (
    <Fragment>
      <Header
        title="SBP"
        action={
          access.create ? (
            <Button
              type="button"
              color="primary"
              variant="contained"
              onClick={() => openModalForm()}
              startIcon={<Add />}
            >
              Tambah
            </Button>
          ) : null
        }
      />

      {/* Komponen untuk table */}
      <Box component="main" sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FilterDateSbp />
          </Grid>

          <Grid item xs={12}>
            <CardPaper>
              <CardContent>
                <Grid container spacing={3} justifyContent="space-between">
                  <Grid item xs={12} md={4}>
                    <SearchSbp />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FilterStatusSbp />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TableActionButton
                      reload
                      import
                      export
                      print
                      onReload={reload}
                      onExport={exportExcel}
                      onImport={openFormImport}
                      onPrint={handlePrint}
                    />
                  </Grid>
                </Grid>
              </CardContent>

              {children}
            </CardPaper>
          </Grid>
        </Grid>
      </Box>

      {/* Komponen modal form create & update */}
      <ModalFormSbp />

      {/* Komponen modal form import */}
      <ModalFormImportSbp />
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
