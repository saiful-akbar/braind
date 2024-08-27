import CardPaper from "@/components/CardPaper";
import SelectInput from "@/components/Input/SelectInput";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { TabContext, TabList } from "@mui/lab";
import { Box, CardContent, Grid, Tab, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

/**
 * month options
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
 * Chart SBP
 */
const ChartSbp = () => {
  const dispatch = useDispatch();
  const date = new Date();
  const currentYear = date.getFullYear();

  /**
   * fungsi untuk mengambil bulan saat ini.
   */
  const currentMonth = useCallback(() => {
    const month = date.getMonth() + 1;

    return month < 10 ? `0${month}` : month;
  }, [date]);

  /**
   * state
   */
  const [xLabels, setXLabels] = useState([]);
  const [series, setSeries] = useState([]);
  const [yearOptions, setYearOptions] = useState([
    {
      label: currentYear,
      value: currentYear,
    },
  ]);

  const [query, setQuery] = useState({
    tab: "kantor",
    year: currentYear,
    month: currentMonth(),
  });

  /**
   * fungsi untuk request data chart sbp
   */
  const fetchData = useCallback(
    async (parameters) => {
      try {
        const response = await axios({
          method: "get",
          url: route("sbp.chart"),
          responseType: "json",
          params: parameters,
        });

        if (response.status === 200) {
          const { data } = response.data;

          setSeries(data.series);
          setXLabels(data.x_labels);
        }
      } catch (error) {
        dispatch(
          openNotification({
            status: "error",
            message: `${error.response.status} - Gagal mengambil data SBP.`,
          })
        );
      }
    },
    [setSeries, setXLabels, dispatch]
  );

  /**
   * fetch data sbp
   */
  useEffect(() => {
    fetchData(query);
  }, []);

  /**
   * Fetch tahun sbp
   */
  useEffect(() => {
    const fetchTahun = async () => {
      try {
        const response = await axios({
          method: "get",
          url: route("sbp.chart.years"),
          responseType: "json",
        });

        const { status } = response;
        const { data } = response.data;

        if (status === 200 && data.length > 0) {
          setYearOptions(
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
            message: `${status} - Gagal mengambil tahun SBP`,
          })
        );
      }
    };

    fetchTahun();
  }, []);

  /**
   * fungsi untuk menangani ketika select tahun dirubah
   */
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setQuery((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      fetchData({
        ...query,
        [name]: value,
      });
    },
    [fetchData, setQuery, query]
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
          <Grid item xs={12}>
            <TabContext value={query.tab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  variant="fullWidth"
                  indicatorColor="secondary"
                  onChange={handleTabChange}
                >
                  <Tab label="Kantor" value="kantor" />
                  <Tab label="Bulanan" value="monthly" />
                </TabList>
              </Box>
            </TabContext>
          </Grid>

          <Grid item xs={12} container spacing={3} justifyContent="flex-end">
            <Grid item md={6} xs={12}>
              <SelectInput
                fullWidth
                size="small"
                label="Tahun"
                name="year"
                items={yearOptions}
                value={query.year}
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>

            {query.tab === "kantor" && (
              <Grid item md={6} xs={12}>
                <SelectInput
                  fullWidth
                  size="small"
                  label="Bulan"
                  name="month"
                  items={monthOptions}
                  value={query.month}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <BarChart
                margin={{ left: 100, top: 70 }}
                height={400}
                series={series}
                xAxis={[{ data: xLabels, scaleType: "band" }]}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                borderTop: 1,
                borderColor: "divider",
                pt: 2,
              }}
            >
              <Typography variant="subtitle2">
                Tindak Lanjut meliputi :
              </Typography>

              <Typography variant="body2">
                BMN (Barang Milik Negara), Penyidikan, Ultimum Remidium dan
                Tidak ada pelanggaran
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </CardPaper>
  );
};

export default ChartSbp;
