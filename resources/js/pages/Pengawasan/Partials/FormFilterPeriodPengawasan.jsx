import CardPaper from "@/components/CardPaper";
import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";
import dateFormat from "@/utils";
import { useForm, usePage } from "@inertiajs/react";
import { FilterList } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { CardContent, Grid } from "@mui/material";
import dayjs from "dayjs";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

/**
 * Komponen filter periode untuk halaman perusahaan cukai MMEA.
 *
 * @returns {React.ReactElement}
 */
const FormFilterPeriodPengawasan = memo(() => {
  const { app } = usePage().props;
  const { params } = app.url;
  const pengawasan = useSelector((state) => state.pengawasan);
  const typeList = pengawasan.types.map((value) => ({
    label: value,
    value,
  }));

  // state
  const [types] = useState([{ label: "Semua", value: "semua" }, ...typeList]);

  /**
   * Form
   */
  const form = useForm({
    ...params,
    page: 1,
    type: params.type,
    start_period: params.start_period,
    end_period: params.end_period,
  });

  /**
   * Update value pada form saat komoponen dirender ulang
   */
  useEffect(() => {
    form.setData({
      ...params,
      page: 1,
      type: params.type,
      start_period: params.start_period,
      end_period: params.end_period,
    });
  }, [params]);

  /**
   * fungsi untuk menangani ketika form input diisi
   */
  const handleInputChange = useCallback(
    (e) => {
      form.setData(e.target.name, e.target.value);
    },
    [form]
  );

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
    form.get(route("pengawasan"), {
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <CardPaper title="Filter">
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <SelectInput
              fullWidth
              size="small"
              label="Tipe Pengawasan"
              name="type"
              items={types}
              value={form.data.type}
              onChange={handleInputChange}
              disabled={form.processing}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <DateInput
              fullWidth
              size="small"
              label="Periode Awal"
              value={dayjs(form.data.start_period)}
              onChange={(value) => handleDateChange("start_period", value)}
              disabled={form.processing}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <DateInput
              fullWidth
              size="small"
              label="Periode Akhir"
              value={dayjs(form.data.end_period)}
              onChange={(value) => handleDateChange("end_period", value)}
              disabled={form.processing}
            />
          </Grid>

          <Grid item xs={12} md={3}>
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

export default FormFilterPeriodPengawasan;
