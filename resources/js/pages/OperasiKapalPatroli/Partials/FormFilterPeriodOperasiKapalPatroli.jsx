import CardPaper from "@/components/CardPaper";
import DateInput from "@/components/Input/DateInput";
import dateFormat from "@/utils";
import { useForm, usePage } from "@inertiajs/react";
import { FilterList } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { CardContent, Grid } from "@mui/material";
import dayjs from "dayjs";
import React, { memo, useCallback, useEffect, useState } from "react";

/**
 * Komponen filter periode untuk halaman sarana operasi kapal patroli.
 *
 * @returns {React.ReactElement}
 */
const FormFilterPeriodOprasiKapalPatroli = memo(() => {
  const { app } = usePage().props;
  const { params } = app.url;
  const startPeriod = params.start_period ?? null;
  const endPeriod = params.end_period ?? null;

  /**
   * Form
   */
  const { data, setData, get, processing } = useForm({
    ...params,
    page: 1,
    start_period: startPeriod,
    end_period: endPeriod,
  });

  /**
   * State
   */
  const [disabledSubmit, setDisabledSubmit] = useState(
    Boolean(data.start_period === null || data.end_period === null)
  );

  /**
   * Update value pada form saat komoponen dirender ulang
   */
  useEffect(() => {
    setData({
      ...params,
      start_period: startPeriod,
      end_period: endPeriod,
      page: 1,
    });
  }, [params, startPeriod, endPeriod]);

  /**
   * Update state disableSubmit
   */
  useEffect(() => {
    setDisabledSubmit(
      Boolean(data.start_period === null || data.end_period === null)
    );
  }, [data, setDisabledSubmit]);

  /**
   * fungsi untuk mengatasi ketika form tanggal diisi.
   */
  const handleDateChange = useCallback(
    (name, value) => {
      setData(name, dateFormat(value));
    },
    [setData]
  );

  /**
   * Fungsi untuk menangani ketika form di submit
   */
  const handleSubmit = () => {
    get(route("operasi-kapal-patroli"), {
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <CardPaper title="Periode Input">
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <DateInput
              fullWidth
              size="small"
              label="Periode Awal"
              value={dayjs(data.start_period)}
              disabled={processing}
              onChange={(value) => handleDateChange("start_period", value)}
            />
          </Grid>

          <Grid item xs={12} md={5}>
            <DateInput
              fullWidth
              size="small"
              label="Periode Akhir"
              value={dayjs(data.end_period)}
              disabled={processing}
              onChange={(value) => handleDateChange("end_period", value)}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <LoadingButton
              fullWidth
              type="button"
              color="primary"
              variant="contained"
              onClick={handleSubmit}
              loading={processing}
              disabled={disabledSubmit}
              startIcon={<FilterList />}
            >
              Filter
            </LoadingButton>
          </Grid>
        </Grid>
      </CardContent>
    </CardPaper>
  );
});

export default FormFilterPeriodOprasiKapalPatroli;
