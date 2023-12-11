import React from "react";
import AuthLayout from "@/layouts/AuthLayout";
import { Link } from "@inertiajs/react";
import { Typography } from "@mui/material";
import Header from "@/components/Header";
import { Box } from "@mui/material";

/**
 * Halaman dashboard.
 */
const Dashboard = (props) => {
  console.log(props);
  
  return (
    <>
      <Header title="Dashboard" />

      <Box sx={{ my: 5 }}>
        <Typography variant="h3" component="h1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
          reiciendis a perspiciatis ducimus odio quae natus quia consequatur.
          Nesciunt aspernatur maiores enim quidem unde nisi animi quae porro
          provident iusto!
        </Typography>

        <Link href={route("division")}>Division</Link>
      </Box>
    </>
  );
};

/**
 * Layout
 */
Dashboard.layout = (page) => <AuthLayout title="Dashboard" children={page} />;

export default Dashboard;
