import CardPaper from "@/components/CardPaper";
import SelectInput from "@/components/Input/SelectInput";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { usePage } from "@inertiajs/react";
import { TabContext, TabList } from "@mui/lab";
import {
  Box,
  CardContent,
  Grid,
  Tab,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

/**
 * Month options
 */
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
 * Komponen grafik penerimaan.
 *
 * @returns {React.ReactElement}
 */
export default function ChartPenerimaan() {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { auth } = usePage().props;
  const { user } = auth;

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
    tab: "semua",
    year: currentYear,
    month: currentMonth(),
  });

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

  /**
   * fungsi untuk menangani kerika tab ditubah
   */
  const handleTabChange = useCallback(
    (event, newTabValue) => {
      setQuery((prevState) => ({
        ...prevState,
        tab: newTabValue,
      }));

      fetchData({
        ...query,
        tab: newTabValue,
      });
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
          <Grid item md={user.admin ? 6 : 12} xs={12}>
            <Typography variant="h6" component="div">
              Grafik Penerimaan
            </Typography>
          </Grid>

          {user.admin && (
            <Grid item xs={12} md={6}>
              <TabContext value={query.tab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    variant="fullWidth"
                    indicatorColor="secondary"
                    onChange={handleTabChange}
                  >
                    <Tab label="Semua Kantor" value="semua" />
                    <Tab label="Perkantor" value="perkantor" />
                  </TabList>
                </Box>
              </TabContext>
            </Grid>
          )}

          <Grid item md={6} xs={12}>
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

          <Grid item md={6} xs={12}>
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
              height={matches ? 500 : 450}
              series={series}
              xAxis={[{ scaleType: "band", data: xLabels }]}
              margin={{
                left: 100,
                top: Boolean(matches && query.tab === "perkantor") ? 210 : 80,
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </CardPaper>
  );
}
