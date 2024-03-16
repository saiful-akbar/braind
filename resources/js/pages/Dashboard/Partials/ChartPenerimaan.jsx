import CardPaper from "@/components/CardPaper";
import SelectInput from "@/components/Input/SelectInput";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { CardContent, Grid, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { LineChart } from "@mui/x-charts/LineChart";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

/**
 * Komponen grafik penerimaan.
 *
 * @returns {React.ReactElement}
 */
export default function ChartPenerimaan() {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();

  /**
   * fungsi untuk mengambil data bulan saat ini.
   */
  const currentMonth = useCallback(() => {
    const month = new Date().getMonth() + 1;
    return Boolean(month < 10) ? `0${month}` : month;
  });

  /**
   * State
   */
  const [series, setSeries] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [yearsOptions, setYearsOptions] = useState([
    {
      label: currentYear,
      value: currentYear,
    },
  ]);

  const [query, setQuery] = useState({
    year: currentYear,
    month: currentMonth(),
  });

  const monthOptions = [
    {
      label: "Januari",
      value: "01",
    },
    {
      label: "Februari",
      value: "02",
    },
    {
      label: "Maret",
      value: "03",
    },
    {
      label: "April",
      value: "04",
    },
    {
      label: "Mei",
      value: "05",
    },
    {
      label: "Juni",
      value: "06",
    },
    {
      label: "Juli",
      value: "07",
    },
    {
      label: "Agustus",
      value: "08",
    },
    {
      label: "September",
      value: "09",
    },
    {
      label: "Oktober",
      value: "10",
    },
    {
      label: "November",
      value: "11",
    },
    {
      label: "Desember",
      value: "12",
    },
  ];

  /**
   * fungsi untuk fetch data
   */
  const fetchData = useCallback(
    async (parameters) => {
      try {
        const response = await axios({
          method: "get",
          responseType: "json",
          url: route("penerimaan.chart"),
          params: parameters,
        });

        if (response.status === 200) {
          const { data } = response.data;

          setSeries(data.series);
          setXLabels(data.x_labels);
        }
      } catch (error) {
        const { status } = error.response;

        dispatch(
          openNotification({
            status: "error",
            message: `${status} - Gagal mengambil data penerimaan.`,
          })
        );
      }
    },
    [setSeries, setXLabels, dispatch]
  );

  /**
   * fungsi untuk fetch daftar tahun penerimaan
   */
  const fetchYear = useCallback(async () => {
    try {
      const response = await axios({
        method: "get",
        url: route("penerimaan.chart.years"),
        responseType: "json",
      });

      const { status } = response;
      const { data } = response.data;
      if (response.status === 200 && data.length > 0) {
        const { data } = response.data;

        setYearsOptions(
          data.map((d) => ({
            label: d.tahun,
            value: d.tahun,
          }))
        );
      }
    } catch (error) {
      const { status } = error.response;
      dispatch(
        openNotification({
          status: "error",
          message: `${status} - Gagal mengambil tahun penerimaan.`,
        })
      );
    }
  }, [setYearsOptions, dispatch]);

  /**
   * Request data grafik penerimaan saat setelah komponen selessai di render.
   */
  useEffect(() => {
    fetchYear();
    fetchData(query);
  }, []);

  /**
   * fungsi untuk menangani ketika form input diubah
   */
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      fetchData({ ...query, [name]: value });
      setQuery((prevState) => ({ ...prevState, [name]: value }));
    },
    [setQuery, fetchData, query]
  );

  return (
    <CardPaper>
      <CardContent>
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item md={4} xs={12}>
            <Typography variant="h6" component="div">
              Grafik Penerimaan
            </Typography>
          </Grid>

          <Grid item md={4} xs={12}>
            <SelectInput
              fullWidth
              size="small"
              label="Tahun"
              name="year"
              value={query.year}
              items={yearsOptions}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <SelectInput
              fullWidth
              size="small"
              label="Bulan"
              name="month"
              value={query.month}
              items={monthOptions}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <BarChart
              height={350}
              series={series}
              xAxis={[{ scaleType: "band", data: xLabels }]}
              margin={{ left: 100 }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </CardPaper>
  );
}
