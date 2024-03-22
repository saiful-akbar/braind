import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { Box, Grid } from "@mui/material";
import React, { Fragment } from "react";
import Hero from "./Partials/Hero";

/**
 * Komponen halaman profil kantor
 *
 * @returns {React.ReactElement}
 */
const ProfilKantor = () => {
  return (
    <Fragment>
      <Header title="Profil Kantor" />

      <Box component="main" sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Hero />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

ProfilKantor.layout = (page) => (
  <AuthLayout title="Profil Kantor" children={page} />
);

export default ProfilKantor;
