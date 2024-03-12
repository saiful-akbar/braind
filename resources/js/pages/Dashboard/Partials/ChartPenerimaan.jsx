import { LineChart } from "@mui/x-charts/LineChart";
import CardPaper from "@/components/CardPaper";
import { CardContent } from "@mui/material";
import { useDispatch } from "react-redux";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { useEffect, useState } from "react";
import { numberFormat } from "@/utils";

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
  "Oct",
  "Nov",
  "Dec",
];

export default function ChartPenerimaan() {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();

  /**
   * State
   */
  const [series, setSeries] = useState([
    {
      label: "Target Bea Masuk",
      data: [...Array(12)].map(() => 0),
    },
    {
      label: "Target Bea Keluar",
      data: [...Array(12)].map(() => 0),
    },
    {
      label: "Target Cukai",
      data: [...Array(12)].map(() => 0),
    },
    {
      label: "Realisasi Bea Masuk",
      data: [...Array(12)].map(() => 0),
    },
    {
      label: "Realisasi Bea Keluar",
      data: [...Array(12)].map(() => 0),
    },
    {
      label: "Realisasi Cukai",
      data: [...Array(12)].map(() => 0),
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: route("penerimaan.chart"),
          responseType: "json",
        });

        if (response.status === 200) {
          const { data: result } = response.data;
          setSeries(
            result.map((resultValue) => ({
              label: resultValue.label,
              data: resultValue.data.map((dataValue) => parseFloat(dataValue)),
            }))
          );
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
    };

    fetchData();
  }, [dispatch, setSeries]);

  return (
    <CardPaper title={`Grafik Penerimaan ${currentYear}`}>
      <CardContent>
        <LineChart
          height={500}
          margin={{ left: 100, top: 200 }}
          series={series}
          xAxis={[{ scaleType: "point", data: xLabels }]}
        />
      </CardContent>
    </CardPaper>
  );
}
