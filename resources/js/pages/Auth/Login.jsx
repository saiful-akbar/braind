import React from "react";
import GuestLayout from "@/layouts/GuestLayout";
import { Box, Grid } from "@mui/material";
import FormLogin from "./Partials/FormLogin";

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
        backgroundImage: "url(https://picsum.photos/1080/?blur=3)",
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
        sx={({ palette }) => ({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: {
            lg: 6,
            md: 4,
            xs: 2,
          },
          backgroundColor: {
            md: "background.default",
            xs: palette.mode === "dark"
              ? "rgba(29, 29, 29, 0.9)"
              : "rgba(255, 255, 255, 0.9)",
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
                ? "linear-gradient(to left, rgba(29, 29, 29, 0.5), rgba(29, 29, 29, 1))"
                : "linear-gradient(to left, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1))";
            },
          },
        }}
      />
    </Grid>
  );
};

Login.layout = (page) => <GuestLayout title="Login" children={page} />;

export default Login;
