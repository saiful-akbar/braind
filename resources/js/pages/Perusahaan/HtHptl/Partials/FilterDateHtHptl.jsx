import CardPaper from "@/components/CardPaper";
import DateInput from "@/components/Input/DateInput";
import { useForm, usePage } from "@inertiajs/react";
import { LoadingButton } from "@mui/lab";
import { CardContent, Grid } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

/**
 * Komponen parsial perusahaan cukai HT + HPTL untuk filter tanggal input.
 *
 * @returns {React.ReactElement}
 */
const FilterDateHtHptl = () => {
  const { app } = usePage().props;
  const { params } = app.url;
  const { data } = useForm({
    ...params,
    start_period: params?.start_period,
    end_period: params?.end_period,
    _token: app.csrf,
  });

  return (
    <CardPaper title="Periode Input">
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <DateInput
              size="small"
              label="Periode awal"
              value={dayjs(data.start_period)}
            />
          </Grid>

          <Grid item xs={12} md={5}>
            <DateInput
              size="small"
              label="Periode akhir"
              value={dayjs(data.end_period)}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <LoadingButton fullWidth variant="contained" color="secondary">
              Filter
            </LoadingButton>
          </Grid>
        </Grid>
      </CardContent>
    </CardPaper>
  );
};

export default FilterDateHtHptl;
