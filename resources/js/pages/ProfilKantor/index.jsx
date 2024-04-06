import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { Box, Grid } from "@mui/material";
import React, { Fragment } from "react";
import Hero from "./Partials/Hero";
import TabProfil from "./Partials/TabProfil";
import TabGaleri from "./Partials/TabGaleri";
import TabVideo from "./Partials/TabVideo";

/**
 * list content
 */
const contents = [
  {
    key: "profil",
    component: <TabProfil />,
  },
  {
    key: "galeri",
    component: <TabGaleri />,
  },
  {
    key: "video",
    component: <TabVideo />,
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

      <Box component="main" sx={{ mt: 5, mb: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Hero />
          </Grid>

          <Grid item xs={12}>
            {contents.map(
              ({ key, component }) =>
                tab === key && <div key={key}>{component}</div>
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
