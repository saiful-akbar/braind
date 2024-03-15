import CardPaper from "@/components/CardPaper";
import SelectInput from "@/components/Input/SelectInput";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { TabContext, TabList } from "@mui/lab";
import {
  Box,
  CardContent,
  Divider,
  Grid,
  Tab,
  Typography,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

/**
 * Chart SBP
 */
const ChartSbp = () => {
  const dispatch = useDispatch();
  const date = new Date();
  const currentYear = date.getFullYear();

  /**
   * state
   */
  const [xLabels, setXLabels] = useState([]);
  const [series, setSeries] = useState([]);
  const [tabValue, setTabValue] = useState("month");
  const [year, setYear] = useState(currentYear);
  const [yearOptions, setYearOptions] = useState([
    { label: currentYear, value: currentYear },
  ]);

  /**
   * fungsi untuk request data chart sbp
   */
  const fetchData = useCallback(
    async (year = currentYear, by = tabValue) => {
      try {
        const response = await axios({
          method: "get",
          url: route("sbp.chart"),
          responseType: "json",
          params: {
            by,
            year,
          },
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
    fetchData(currentYear, tabValue);
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

        if (response.status === 200) {
          const { data } = response.data;
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
      setYear(e.target.value);
      fetchData(e.target.value, tabValue);
    },
    [fetchData, setYear, tabValue]
  );

  /**
   * fungsi untuk menangani kerika tab ditubah
   */
  const handleTabChange = useCallback(
    (event, newTabValue) => {
      setTabValue(newTabValue);
      fetchData(year, newTabValue);
    },
    [setTabValue, year, fetchData]
  );

  return (
    <CardPaper>
      <CardContent>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Grafik SPB</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <SelectInput
              fullWidth
              size="small"
              label="Tahun"
              items={yearOptions}
              value={year}
              onChange={(e) => handleInputChange(e)}
            />
          </Grid>

          <Grid item xs={12}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  variant="fullWidth"
                  onChange={handleTabChange}
                  indicatorColor="secondary"
                >
                  <Tab label="By Month" value="month" />
                  <Tab label="By Kantor" value="kantor" />
                </TabList>
              </Box>
            </TabContext>

            <Box sx={{ mt: 3 }}>
              <BarChart
                height={300}
                series={series}
                xAxis={[{ data: xLabels, scaleType: "band" }]}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </CardPaper>
  );
};

export default ChartSbp;
