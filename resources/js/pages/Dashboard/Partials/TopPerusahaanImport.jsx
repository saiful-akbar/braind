import CardPaper from "@/components/CardPaper";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { numberFormat } from "@/utils";
import { TabContext, TabList } from "@mui/lab";
import {
  Box,
  CardContent,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen untuk menampilkan 5 data perusahaan import terbesar.
 *
 * @returns {React.ReactElement}
 */
const TopPerusahaanImport = () => {
  const dispatch = useDispatch();
  const selectedYear = useSelector(
    (state) => state.dashboard.topFiveCompanies.year
  );

  /**
   * state
   */
  const [tabValue, setTabValue] = useState("pib");
  const [data, setData] = useState([]);

  /**
   * fungsi untuk request data 5 besar perusahaan import.
   */
  const fetchData = useCallback(
    async (by = "pib", year = selectedYear) => {
      try {
        const response = await axios({
          method: "get",
          url: route("perusahaan-import.top-five"),
          params: {
            by,
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
            message: `${status} - Gagal mengambil data perusahaan import.`,
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
    fetchData(tabValue, selectedYear);
  }, [selectedYear]);

  /**
   * fungsi untuk menangani ketika tab di-klik atau dirubah.
   */
  const handleTabChange = useCallback(
    (event, value) => {
      setTabValue(value);
      fetchData(value, selectedYear);
    },
    [setTabValue, fetchData, selectedYear]
  );

  return (
    <CardPaper
      title="Perusahaan Impor"
      subheader={`Daftar 5 besar perusahaan impor tahun ${selectedYear}`}
      sx={{
        minHeight: 250,
      }}
    >
      <CardContent>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              variant="scrollable"
              indicatorColor="secondary"
            >
              <Tab label="PIB" value="pib" />
              <Tab label="Pembayaran" value="total_pembayaran" />
              <Tab label="Bea Masuk" value="bea_masuk" />
            </TabList>
          </Box>
        </TabContext>

        <TableContainer>
          <Table size="small" className="nowrap">
            <TableBody>
              {data.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
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
                      title={numberFormat(parseFloat(item.value))}
                    >
                      {numberFormat(parseFloat(item.value))}
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

export default TopPerusahaanImport;
