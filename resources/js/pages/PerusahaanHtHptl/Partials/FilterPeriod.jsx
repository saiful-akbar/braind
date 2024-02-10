import CardPaper from "@/components/CardPaper";
import DateInput from "@/components/Input/DateInput";
import dateFormat from "@/utils";
import { useForm, usePage } from "@inertiajs/react";
import { FilterList } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { CardContent, Grid } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useCallback } from "react";

/**
 * Komponen parsial perusahaan cukai HT + HPTL untuk filter tanggal input.
 *
 * @returns {React.ReactElement}
 */
const FilterPeriod = () => {
  const { app } = usePage().props;
  const { params } = app.url;
  const { data, setData, get, processing } = useForm({
    ...params,
    page: 1,
    start_period: params.start_period ?? null,
    end_period: params.end_period ?? null,
  });

  /**
   * Update form
   */
  useEffect(() => {
    setData({
      ...params,
      page: 1,
      start_period: params.start_period ?? null,
      end_period: params.end_period ?? null,
    });
  }, [params]);

  /**
   * fungsi untuk menangani ketika periode diisi
   */
  const handleChange = useCallback(
    (name, value) => {
      setData(name, dateFormat(value));
    },
    [setData]
  );

  /**
   * fungsi untuk menangani ketika periode di submit
   */
  const handleSubmit = (e) => {
    get(route("perusahaan-hthptl"), {
      preserveScroll: true,
    });
  };

  return (
    <CardPaper title="Periode Input">
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <DateInput
              size="small"
              label="Periode awal"
              value={dayjs(data.start_period)}
              disabled={processing}
              onChange={(value) => handleChange("start_period", value)}
            />
          </Grid>

          <Grid item xs={12} md={5}>
            <DateInput
              size="small"
              label="Periode akhir"
              value={dayjs(data.end_period)}
              disabled={processing}
              onChange={(value) => handleChange("end_period", value)}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <LoadingButton
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              startIcon={<FilterList />}
              disabled={Boolean(
                processing ||
                  data.start_period === null ||
                  data.end_period === null
              )}
            >
              Filter
            </LoadingButton>
          </Grid>
        </Grid>
      </CardContent>
    </CardPaper>
  );
};

export default FilterPeriod;
