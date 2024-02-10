import CardPaper from "@/components/CardPaper";
import { CardContent, Grid } from "@mui/material";
import React from "react";
import FilterPeriodPerusahaanMmea from "./Partials/FilterPeriodPerusahaanMmea";
import TablePerusahaanMmea from "./Partials/TablePerusahaanMmea";
import PerusahaanMmeaTemplate from "./Template";
import FormSearchPerusahaanMmea from "./Partials/FormSearchPerusahaanMmea";
import FilterStatusPerusahaanMmea from "./Partials/FilterStatusPerusahaanMmea";

/**
 * Halaman perusahaan cukai MMEA.
 *
 * @returns {React.ReactElement}
 */
const PerusahaanMmea = (props) => {
  const { access } = props;
  console.log(access);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FilterPeriodPerusahaanMmea />
      </Grid>

      <Grid item xs={12}>
        <CardPaper>
          <CardContent>
            <Grid container spacing={3} justifyContent="space-between">
              <Grid item xs={12} md={4.5}>
                <FormSearchPerusahaanMmea />
              </Grid>

              {access.destroy && (
                <Grid item xs={12} md={4.5}>
                  <FilterStatusPerusahaanMmea />
                </Grid>
              )}

              <Grid item xs={12}>
                <TablePerusahaanMmea />
              </Grid>
            </Grid>
          </CardContent>
        </CardPaper>
      </Grid>
    </Grid>
  );
};

/**
 * Layout
 */
PerusahaanMmea.layout = (page) => (
  <PerusahaanMmeaTemplate>{page}</PerusahaanMmeaTemplate>
);

export default PerusahaanMmea;
