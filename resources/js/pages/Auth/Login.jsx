import React from "react";
import GuestLayout from "@/layouts/GuestLayout";
import { Grid } from "@mui/material";
import FormLogin from "./Partials/FormLogin";
import loginCover from "@/assets/images/login_cover.jpg";

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
        backgroundImage: `url(${loginCover})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Grid
        item
        order={{ md: 2, xs: 1 }}
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
            md: "background.default",
          },
          backgroundImage: {
            md: "none",
            xs:
              theme.palette.mode === "dark"
                ? "linear-gradient(to right bottom, rgba(22, 28, 36, 0.9), rgba(22, 28, 36, 1))"
                : "linear-gradient(to right bottom, rgba(249, 250, 241, 0.9), rgba(249, 250, 241, 1))",
          },
        })}
      >
        <FormLogin />
      </Grid>

      <Grid
        item
        order={{ md: 1, xs: 2 }}
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
                ? "linear-gradient(to right, rgba(22, 28, 36, 0.5), rgba(22, 28, 36, 1))"
                : "linear-gradient(to right, rgba(249, 250, 241, 0.5), rgba(249, 250, 241, 1))";
            },
          },
        }}
      />
    </Grid>
  );
};

Login.layout = (page) => <GuestLayout title="Login" children={page} />;

export default Login;
