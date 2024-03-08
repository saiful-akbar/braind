import CardPaper from "@/components/CardPaper";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { CardContent } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
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
  const [series, setSeries] = useState({
    jumlah: [...new Array(12)].map(() => 0),
    tindakLanjut: [...new Array(12)].map(() => 0),
  });

  /**
   * fetch data sbp
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: route("sbp.chart"),
          responseType: "json",
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
    };

    fetchData();
  }, []);

  return (
    <CardPaper title={`Grafik SBP ${currentYear}`}>
      <CardContent>
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
      </CardContent>
    </CardPaper>
  );
};

export default ChartSbp;
