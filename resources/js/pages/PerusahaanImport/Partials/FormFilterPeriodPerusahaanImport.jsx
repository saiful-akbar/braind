import CardPaper from "@/components/CardPaper";
import DateInput from "@/components/Input/DateInput";
import dateFormat from "@/utils";
import { useForm, usePage } from "@inertiajs/react";
import { FilterList } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { CardContent, Grid } from "@mui/material";
import dayjs from "dayjs";
import React, { memo, useCallback, useEffect } from "react";

/**
 * Komponen filter periode untuk halaman perusahaan cukai MMEA.
 *
 * @returns {React.ReactElement}
 */
const FormFilterPeriodPerusahaanImport = memo(() => {
  const { app } = usePage().props;
  const { params } = app.url;

  /**
   * Form
   */
  const form = useForm({
    ...params,
    page: 1,
    start_period: params.start_period ?? null,
    end_period: params.end_period ?? null,
  });

  /**
   * Update value pada form saat komoponen dirender ulang
   */
  useEffect(() => {
    form.setData({
      ...params,
      page: 1,
      start_period: params.start_period ?? null,
      end_period: params.end_period ?? null,
    });
  }, [params]);

  /**
   * fungsi untuk mengatasi ketika form tanggal diisi.
   */
  const handleDateChange = useCallback(
    (name, value) => {
      form.setData(name, dateFormat(value));
    },
    [form]
  );

  /**
   * Fungsi untuk menangani ketika form di submit
   */
  const handleSubmit = () => {
    form.get(route("perusahaan-import"), {
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
              value={dayjs(form.data.start_period)}
              onChange={(value) => handleDateChange("start_period", value)}
              disabled={form.processing}
            />
          </Grid>

          <Grid item xs={12} md={5}>
            <DateInput
              fullWidth
              size="small"
              label="Periode Akhir"
              value={dayjs(form.data.end_period)}
              onChange={(value) => handleDateChange("end_period", value)}
              disabled={form.processing}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <LoadingButton
              fullWidth
              type="button"
              color="primary"
              variant="contained"
              onClick={handleSubmit}
              loading={form.processing}
              startIcon={<FilterList />}
              disabled={Boolean(
                form.data.start_period === null || form.data.end_period === null
              )}
            >
              Filter
            </LoadingButton>
          </Grid>
        </Grid>
      </CardContent>
    </CardPaper>
  );
});

export default FormFilterPeriodPerusahaanImport;
