import CardPaper from "@/components/CardPaper";
import DateInput from "@/components/Input/DateInput";
import dateFormat from "@/utils";
import { router, usePage } from "@inertiajs/react";
import { Button, CardContent, Grid } from "@mui/material";
import dayjs from "dayjs";
import { useCallback, useState } from "react";

/**
 * komponen filter tanggal sbp
 */
const FilterDateSbp = () => {
  const { app } = usePage().props;
  const { params } = app.url;

  const [processing, setProcessing] = useState(false);
  const [data, setData] = useState({
    start_period: params.start_period ?? null,
    end_period: params.end_period ?? null,
  });

  /**
   * fungsi untuk menangani ketika form input dirubah
   */
  const handleChange = useCallback(
    (name, dateValue) => {
      setData((prevState) => ({
        ...prevState,
        [name]: dateFormat(dateValue),
      }));
    },
    [setData]
  );

  /**
   * fungsi ketika form di submit
   */
  const handleSubmit = () => {
    setProcessing(true);

    const url = route("sbp");
    const dataParams = {
      ...params,
      ...data,
      page: 1,
    };

    router.get(url, dataParams, {
      preserveScroll: true,
      onFinish: () => setProcessing(false),
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
              color="secondary"
              variant="contained"
              disabled={processing}
              onClick={handleSubmit}
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
