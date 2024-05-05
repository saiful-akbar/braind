import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { Box, Grid } from "@mui/material";
import React, { Fragment } from "react";
import CardButton from "./Partials/CardButton";
import ModalFormReport from "./Partials/ModalFormReport";
import { useDispatch } from "react-redux";
import { openForm } from "@/redux/reducers/reportReducer";

/**
 * Halaman report sarana operasi.
 *
 * @returns {React.ReactElement}
 */
const Report = () => {
  const dispatch = useDispatch();

  /**
   * fungsi untuk membuka modal form
   */
  const handleOpenForm = (title, route) => {
    dispatch(openForm({ title, route }));
  };

  return (
    <Fragment>
      <Header title="Report Sarana Operasi" />

      <Box component="main" sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item sm={4} xs={12}>
            <CardButton
              title="Laporan Pengoperasian Sarana Operasi (LPSO)"
              onClick={() => handleOpenForm("LPSO", "report.lpso")}
            />
          </Grid>

          <Grid item sm={4} xs={12}>
            <CardButton
              title="Rekapitulasi Monitoring Sarana Operasi (RMS)"
              onClick={() => handleOpenForm("RMS", "report.rms")}
            />
          </Grid>

          <Grid item sm={4} xs={12}>
            <CardButton
              title="Daftar Pemeliharaan Sarana Operasi (DPSO)"
              onClick={() => handleOpenForm("DPSO", "report.dpso")}
            />
          </Grid>
        </Grid>

        <ModalFormReport />
      </Box>
    </Fragment>
  );
};

Report.layout = (page) => {
  return <AuthLayout children={page} title="Report Sarana Operasi" />;
};

export default Report;
