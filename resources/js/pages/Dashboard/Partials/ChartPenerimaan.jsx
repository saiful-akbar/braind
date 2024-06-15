import CardPaper from "@/components/CardPaper";
import SelectInput from "@/components/Input/SelectInput";
import { openNotification } from "@/redux/reducers/notificationReducer";
import Kantor from "@/services/kantorService";
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
import { BarChart } from "@mui/x-charts/BarChart";
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

  const [kantorOptions, setKantorOptions] = useState([
    {
      label: "Semua Kantor",
      value: "all",
    },
  ]);

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
    kantor: "all",
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
   * fungsi untuk mengambil data kantor untuk select kantor
   */
  const fetchKantor = useCallback(async () => {
    try {
      const response = await Kantor.getAll();
      const data = response.data.map((kantor) => ({
        label: kantor.nama,
        value: kantor.id,
      }));

      if (response.code === 200) {
        setKantorOptions((prevState) => prevState.concat(data));
      }
    } catch (error) {
      dispatch(
        openNotification({
          status: "error",
          message: "Gagal mengambil data kantor untuk grafik penerimaan.",
        })
      );
    }
  }, []);

  /**
   * Request data grafik penerimaan saat setelah komponen selessai di render.
   */
  useEffect(() => {
    fetchYear();
    fetchData(query);

    if (user.admin) {
      fetchKantor();
    }
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
          spacing={{ md: 5, xs: 3 }}
          justifyContent="space-between"
          alignItems="center"
        >
          {user.admin && (
            <Grid item xs={12}>
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

          <Grid item md={user.admin ? 4 : 6} xs={12}>
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

          <Grid item md={user.admin ? 4 : 6} xs={12}>
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

          {user.admin && (
            <Grid item md={4} xs={12}>
              <SelectInput
                fullWidth
                size="small"
                label="Kantor"
                name="kantor"
                value={query.kantor}
                items={kantorOptions}
                onChange={handleInputChange}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <BarChart
              height={400}
              series={series}
              margin={{
                left: 100,
                top: Boolean(matches && query.tab === "perkantor") ? 220 : 90,
              }}
              xAxis={[
                {
                  scaleType: "band",
                  data: xLabels,
                  colorMap: {
                    type: "ordinal",
                    colors: [
                      "#ccebc5",
                      "#a8ddb5",
                      "#7bccc4",
                      "#4eb3d3",
                      "#2b8cbe",
                      "#08589e",
                    ],
                  },
                },
              ]}
            />
          </Grid>
        </Grid>
      </CardContent>
    </CardPaper>
  );
}
