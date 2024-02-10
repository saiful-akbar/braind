import CardPaper from "@/components/CardPaper";
import DateInput from "@/components/Input/DateInput";
import dateFormat from "@/utils";
import { useForm, usePage } from "@inertiajs/react";
import { FilterList } from "@mui/icons-material";
import { Button, CardContent, Grid } from "@mui/material";
import dayjs from "dayjs";
import { useCallback, useEffect } from "react";

/**
 * komponen filter tanggal sbp
 */
const FilterDateSbp = () => {
  const { app } = usePage().props;
  const { params } = app.url;

  const { data, setData, processing, get } = useForm({
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
   * fungsi untuk menangani ketika form input dirubah
   */
  const handleChange = useCallback(
    (name, dateValue) => {
      setData(name, dateFormat(dateValue));
    },
    [setData]
  );

  /**
   * fungsi ketika form di submit
   */
  const handleSubmit = () => {
    get(route("sbp"), {
      preserveScroll: true,
    });
  };

  return (
    <CardPaper title="Periode Input">
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={5} xs={12}>
            <DateInput
              label="Periode awal"
              size="small"
              value={dayjs(data.start_period)}
              onChange={(value) => handleChange("start_period", value)}
              disabled={processing}
            />
          </Grid>

          <Grid item md={5} xs={12}>
            <DateInput
              label="Periode akhir"
              size="small"
              value={dayjs(data.end_period)}
              onChange={(value) => handleChange("end_period", value)}
              disabled={processing}
            />
          </Grid>

          <Grid item md={2} xs={12}>
            <Button
              fullWidth
              type="button"
              color="primary"
              variant="contained"
              onClick={handleSubmit}
              startIcon={<FilterList />}
              disabled={Boolean(
                processing ||
                  data.start_period === null ||
                  data.end_period === null
              )}
            >
              Filter
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </CardPaper>
  );
};

export default FilterDateSbp;
