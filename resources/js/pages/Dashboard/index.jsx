import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { Box, Typography } from "@mui/material";

/**
 * Halaman dashboard.
 */
const Dashboard = (props) => {
  console.log("Dashboard:", props);
  return (
    <>
      <Header title="Dashboard" />

      <Box sx={{ my: 5 }}>
        <Typography variant="h4">Dashboard</Typography>
      </Box>
    </>
  );
};

/**
 * Layout
 */
Dashboard.layout = (page) => <AuthLayout title="Dashboard" children={page} />;

export default Dashboard;
