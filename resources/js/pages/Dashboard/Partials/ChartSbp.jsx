import CardPaper from "@/components/CardPaper";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { CardContent } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
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
  const [dataset, setData] = useState([
    {
      jumlah: 0,
      tindak_lanjut: 0,
      bulan: "Jan",
    },
  ]);

  /**
   * fetch data sbp
   */
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: route("sbp.chart"),
          responseType: "json",
        });

        const { data: result, status } = response;

        if (status === 200 && result.data !== null) {
          setData(
            result.data.map((result) => ({
              jumlah: parseFloat(result.jumlah),
              tindak_lanjut: parseFloat(result.tindak_lanjut),
              bulan: result.bulan,
            }))
          );
        }
      } catch (error) {
        dispatch(
          openNotification({
            status: "error",
            message: "Gagal mengambil data chart SBP.",
          })
        );
      }
    };

    getData();
  }, []);

  /**
   * fungsi untuk memformat string decimal.
   *
   * @param {string} value
   * @returns number
   */
  const valueFormatter = (value) => {
    return parseFloat(value);
  };

  return (
    <CardPaper title={`Grafik SBP ${currentYear}`}>
      <CardContent>
        <BarChart
          height={300}
          dataset={dataset}
          series={[
            {
              dataKey: "jumlah",
              label: "Jumlah",
              valueFormatter,
            },
            {
              dataKey: "tindak_lanjut",
              label: "Tindak Lanjut",
              valueFormatter,
            },
          ]}
          xAxis={[
            {
              dataKey: "bulan",
              scaleType: "band",
            },
          ]}
        />
      </CardContent>
    </CardPaper>
  );
};

export default ChartSbp;
