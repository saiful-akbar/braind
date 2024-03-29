import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { Box, Grid } from "@mui/material";
import React, { Fragment } from "react";
import About from "./Partials/About";
import Hero from "./Partials/Hero";

/**
 * list content
 */
const contents = [
  {
    key: "profil",
    component: <About />,
  },
];

/**
 * Komponen halaman profil kantor
 *
 * @returns {React.ReactElement}
 */
const ProfilKantor = () => {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get("tab") ?? "profil";

  return (
    <Fragment>
      <Header title="Profil Kantor" />

      <Box component="main" sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Hero />
          </Grid>

          <Grid item md={4} sm={6} xs={12}>
            {contents.map((content) =>
              tab === content.key ? (
                <Box key={content.key}>{content.component}</Box>
              ) : (
                <About key={content.key} />
              )
            )}
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
