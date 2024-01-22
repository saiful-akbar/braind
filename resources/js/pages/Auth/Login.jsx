import React from "react";
import GuestLayout from "@/layouts/GuestLayout";
import { Box, Grid } from "@mui/material";
import FormLogin from "./Partials/FormLogin";
import bgLogin from "@/assets/images/login.webp";

/**
 * Halaman login
 */
const Login = () => {
  return (
    <Grid
      container
      spacing={0}
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url(${bgLogin})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Grid
        item
        lg={5}
        md={6}
        xs={12}
        sx={(theme) => ({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: {
            lg: 6,
            md: 4,
            xs: 2,
          },
          backgroundColor: {
            md: "background.paper",
          },
          backgroundImage: {
            md: "none",
            xs:
              theme.palette.mode === "dark"
                ? "linear-gradient(to right bottom, rgba(22, 28, 36, 0.8), rgba(22, 28, 36, 1))"
                : "linear-gradient(to right bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1))",
          },
        })}
      >
        <FormLogin />
      </Grid>

      <Grid
        item
        lg={7}
        md={6}
        xs={0}
        sx={{
          position: "relative",
          "&:before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: (theme) => {
              return theme.palette.mode === "dark"
                ? "linear-gradient(to left, rgba(22, 28, 36, 0.6), rgba(22, 28, 36, 1))"
                : "linear-gradient(to left, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 1))";
            },
          },
        }}
      />
    </Grid>
  );
};

Login.layout = (page) => <GuestLayout title="Login" children={page} />;

export default Login;
