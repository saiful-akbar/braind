import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { Box, Grid } from "@mui/material";
import ChartSbp from "./Partials/ChartSbp";
import TopPerusahaanExport from "./Partials/TopPerusahaanExport";
import TopPerusahaanImport from "./Partials/TopPerusahaanImport";
import TopPerusahaanHtHptl from "./Partials/TopPerusahaanHtHptl";
import TopPerusahaanMmea from "./Partials/TopPerusahaanMmea";
import ChartPenerimaan from "./Partials/ChartPenerimaan";

/**
 * Halaman dashboard.
 */
const Dashboard = (props) => {
  return (
    <>
      <Header title="Dashboard" />

      <Box sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ChartSbp />
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

          <Grid item xs={12}>
            <ChartPenerimaan />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

/**
 * Layout
 */
Dashboard.layout = (page) => <AuthLayout title="Dashboard" children={page} />;

export default Dashboard;
