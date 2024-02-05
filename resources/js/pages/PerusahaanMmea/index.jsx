import CardPaper from "@/components/CardPaper";
import { CardContent, Grid } from "@mui/material";
import React from "react";
import FilterPeriodPerusahaanMmea from "./Partials/FilterPeriodPerusahaanMmea";
import TablePerusahaanMmea from "./Partials/TablePerusahaanMmea";
import PerusahaanMmeaTemplate from "./Template";

/**
 * Halaman perusahaan cukai MMEA.
 *
 * @returns {React.ReactElement}
 */
const PerusahaanMmea = (props) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FilterPeriodPerusahaanMmea />
      </Grid>

      <Grid item xs={12}>
        <CardPaper>
          <CardContent>
            <Grid container spacing={3}>
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
