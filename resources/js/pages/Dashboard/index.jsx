import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { Box, Grid, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChartPenerimaan from "./Partials/ChartPenerimaan";
import ChartSbp from "./Partials/ChartSbp";
import TopPerusahaanExport from "./Partials/TopPerusahaanExport";
import TopPerusahaanHtHptl from "./Partials/TopPerusahaanHtHptl";
import TopPerusahaanImport from "./Partials/TopPerusahaanImport";
import TopPerusahaanMmea from "./Partials/TopPerusahaanMmea";
import SelectInput from "@/components/Input/SelectInput";
import { setYearTopFiveCompanies } from "@/redux/reducers/dashboardReducer";

/**
 * Halaman dashboard.
 */
const Dashboard = (props) => {
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard);
  const currentYear = new Date().getFullYear();

  /**
   * State
   */
  const [yearOptions, setYearOptions] = useState([
    { label: currentYear, value: currentYear },
  ]);

  /**
   * Ambil tahun pada 4 tabel perusahaan untuk
   * select options 5 besar perusahaan.
   */
  useEffect(() => {
    const getYearsForCompany = async () => {
      try {
        const response = await axios({
          method: "get",
          url: route("dashboard.company-top-five-years"),
          responseType: "json",
        });

        if (response.status === 200) {
          setYearOptions(
            response.data.data.map((perusahaan) => ({
              label: perusahaan.tahun,
              value: perusahaan.tahun,
            }))
          );
        }
      } catch (error) {
        dispatch(
          openNotification({
            status: "error",
            message: "Gagal mengabil data tahun 5 besar perusahaan.",
          })
        );
      }
    };

    getYearsForCompany();
  }, []);

  /**
   * Fungsi untuk menangani ketika selest option tahun
   * pada section 5 besar perusahaan dirubah.
   *
   * @param {object} e
   */
  const handleTopFiveCompaniesChange = (e) => {
    dispatch(setYearTopFiveCompanies(e.target.value));
  };

  return (
    <Fragment>
      <Header title="Dashboard" />

      <Box sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ pb: 1, borderBottom: 1, borderColor: "divider" }}>
              <Typography variant="h6" component="h2">
                Grafik SBP
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <ChartSbp />
          </Grid>

          {/* Daftar 5 besar perusahaan */}
          <Grid item xs={12} container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  mt: 5,
                  pb: 1,
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Typography variant="h6" component="h2">
                  Daftar 5 besar perusahaan
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <SelectInput
                fullWidth
                size="small"
                name="year"
                label="Pilih Tahun"
                items={yearOptions}
                value={dashboard.topFiveCompanies.year}
                onChange={handleTopFiveCompaniesChange}
                inputProps={{
                  sx: {
                    borderRadius: "8px",
                    backgroundColor: "background.paper",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TopPerusahaanExport />
            </Grid>

            <Grid item xs={12} md={6}>
              <TopPerusahaanImport />
            </Grid>

            <Grid item xs={12} md={6}>
              <TopPerusahaanHtHptl />
            </Grid>

            <Grid item xs={12} md={6}>
              <TopPerusahaanMmea />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mt: 5, pb: 1, borderBottom: 1, borderColor: "divider" }}>
              <Typography variant="h6" component="h2">
                Grafik Penerimaan
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <ChartPenerimaan />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

/**
 * Layout
 */
Dashboard.layout = (page) => <AuthLayout title="Dashboard" children={page} />;

export default Dashboard;
