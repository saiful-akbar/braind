import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { Box, Grid } from "@mui/material";
import ChartSbp from "./Partials/ChartSbp";
import TopPerusahaanExport from "./Partials/TopPerusahaanExport";

/**
 * Halaman dashboard.
 */
const Dashboard = (props) => {
  return (
    <>
      <Header title="Dashboard" />

      <Box sx={{ my: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ChartSbp />
          </Grid>

          <Grid item xs={12} md={6}>
            <TopPerusahaanExport />
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
