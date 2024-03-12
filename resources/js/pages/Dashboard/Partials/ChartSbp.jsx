import CardPaper from "@/components/CardPaper";
import SelectInput from "@/components/Input/SelectInput";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { CardContent, Divider, Grid, Typography } from "@mui/material";
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
  const xLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okc",
    "Nov",
    "Dec",
  ];

  /**
   * state
   */

  /**
   * state
   */
  const [year, setYear] = useState(currentYear);
  const [yearOptions, setYearOptions] = useState([
    {
      label: currentYear,
      value: currentYear,
    },
  ]);

  const [series, setSeries] = useState({
    jumlah: [...new Array(12)].map(() => 0),
    tindakLanjut: [...new Array(12)].map(() => 0),
  });

  /**
   * fungsi untuk request data chart sbp
   */
  const fetchData = useCallback(
    async (tahun) => {
      try {
        const response = await axios({
          method: "get",
          url: route("sbp.chart"),
          responseType: "json",
          params: {
            tahun,
          },
        });

        if (response.status === 200) {
          const { data } = response.data;

          setSeries({
            jumlah: data.jumlah,
            tindakLanjut: data.tindak_lanjut,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch(
          openNotification({
            status: "error",
            message: `${error.response.status} - Gagal mengambil data SBP.`,
          })
        );
      }
    },
    [setSeries, dispatch]
  );

  /**
   * fetch data sbp
   */
  useEffect(() => {
    fetchData(currentYear);
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
      fetchData(e.target.value);
    },
    [fetchData, setYear]
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
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <BarChart
              height={300}
              series={[
                {
                  data: series.jumlah,
                  label: "Jumlah",
                  id: "jumlah",
                },
                {
                  data: series.tindakLanjut,
                  label: "Tindak Lanjut",
                  id: "tindakLanjut",
                },
              ]}
              xAxis={[
                {
                  data: xLabels,
                  scaleType: "band",
                },
              ]}
            />
          </Grid>
        </Grid>
      </CardContent>
    </CardPaper>
  );
};

export default ChartSbp;
