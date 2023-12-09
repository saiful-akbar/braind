import AuthLayout from "@/layouts/AuthLayout";
import { Link } from "@inertiajs/react";
import { Typography } from "@mui/material";
import React from "react";

const Dashboard = (props) => {
  return (
    <div>
      <Typography variant="h3" component="h1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
        reiciendis a perspiciatis ducimus odio quae natus quia consequatur.
        Nesciunt aspernatur maiores enim quidem unde nisi animi quae porro
        provident iusto!
      </Typography>

      <Link href={route("division")}>Division</Link>
    </div>
  );
};

/**
 * Layout
 */
Dashboard.layout = (page) => <AuthLayout children={page} title="Dashboard" />;

export default Dashboard;
