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
import { useDispatch } from "react-redux";

/**
 * Komponen untuk menampilkan 5 data perusahaan HT HPTL terbesar.
 *
 * @returns {React.ReactElement}
 */
const TopPerusahaanHtHptl = () => {
  const dispatch = useDispatch();

  /**
   * state
   */
  const [data, setData] = useState([]);

  /**
   * fungsi untuk request data 5 besar perusahaan HT HPTL.
   */
  const fetchData = useCallback(async () => {
    try {
      const response = await axios({
        method: "get",
        url: route("perusahaan-hthptl.top-five"),
        responseType: "json",
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
  }, [dispatch, setData]);

  /**
   * request data untuk pertama kali setelah komponen dirender.
   */
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CardPaper title="5 Besar perusahaan HT HPTL">
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
                  <TableCell colSpan={3} align="center">
                    Tidak ada data perusahaan HT HPTL.
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
