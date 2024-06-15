import CardPaper from "@/components/CardPaper";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { numberFormat } from "@/utils";
import {
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen untuk menampilkan 5 data perusahaan HT HPTL terbesar.
 *
 * @returns {React.ReactElement}
 */
const TopPerusahaanHtHptl = () => {
  const dispatch = useDispatch();
  const selectedYear = useSelector(
    (state) => state.dashboard.topFiveCompanies.year
  );

  /**
   * state
   */
  const [data, setData] = useState([]);

  /**
   * fungsi untuk request data 5 besar perusahaan HT HPTL.
   */
  const fetchData = useCallback(
    async (year = selectedYear) => {
      try {
        const response = await axios({
          method: "get",
          url: route("perusahaan-hthptl.top-five"),
          responseType: "json",
          params: {
            year,
          },
        });

        if (response.status === 200) {
          setData(response.data.data);
        }
      } catch (error) {
        const { status } = error.response;

        dispatch(
          openNotification({
            status: "error",
            message: `${status} - Gagal mengambil data perusahaan HT HPTL.`,
          })
        );
      }
    },
    [dispatch, setData]
  );

  /**
   * request data untuk pertama kali setelah komponen dirender.
   */
  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);

  return (
    <CardPaper
      title="Perusahaan HT + HPTL"
      subheader={`Daftar 5 besar perusahaan HT + HPTL tahun ${selectedYear}`}
      sx={{
        minHeight: 250,
      }}
    >
      <CardContent>
        <TableContainer>
          <Table size="small" className="nowrap">
            <TableHead>
              <TableRow>
                <TableCell align="center">No.</TableCell>
                <TableCell align="left">Perusahaan</TableCell>
                <TableCell align="right">Jumlah CK1</TableCell>
                <TableCell align="right">Jumlah Cukai</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Tidak ada data perusahaan.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item, key) => (
                  <TableRow key={key} align="center">
                    <TableCell>{key + 1}</TableCell>

                    <TableCell title={item.nama_perusahaan}>
                      {item.nama_perusahaan}
                    </TableCell>

                    <TableCell
                      align="right"
                      title={numberFormat(parseFloat(item.jumlah_ck))}
                    >
                      {numberFormat(parseFloat(item.jumlah_ck))}
                    </TableCell>

                    <TableCell
                      align="right"
                      title={numberFormat(parseFloat(item.jumlah_cukai))}
                    >
                      {numberFormat(parseFloat(item.jumlah_cukai))}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </CardPaper>
  );
};

export default TopPerusahaanHtHptl;
