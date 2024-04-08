import cover from "@/assets/images/profil_cover.jpg";
import { usePage } from "@inertiajs/react";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";

/**
 * Komponen partials Hero untuk halaman profil kantor.
 *
 * @returns {React.ReactElement}
 */
const Hero = () => {
  const { data: kantor } = usePage().props;

  return (
    <Paper
      elevation={3}
      sx={{
        overflow: "hidden",
        position: "relative",
        borderRadius: "16px",
        zIndex: 0,
        height: "290px",
      }}
    >
      <Box
        sx={{
          height: "100%",
          color: "rgb(255, 255, 255)",
          background: `linear-gradient(rgba(0, 75, 80, 0.8), rgba(0, 75, 80, 0.8)) center center / cover no-repeat, url(${cover})`,
          backgroundPosition: "center center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 4,
          pb: 7,
          textAlign: "center",
        }}
      >
        <Typography component="div" variant="h4">
          {kantor.nama}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Hero;
