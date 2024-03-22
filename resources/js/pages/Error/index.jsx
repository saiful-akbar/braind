import BaseLayout from "@/layouts/BaseLayout";
import { Head, Link } from "@inertiajs/react";
import { Box, Button, Grid, Typography } from "@mui/material";

export default function Error({ status }) {
  const title = {
    503: "503 | Service Unavailable",
    500: "500 | Server Error",
    404: "404 | Page Not Found",
    403: "403 | Forbidden",
  }[status];

  const description = {
    503: "Maaf, kami sedang melakukan pemeliharaan. Silakan periksa kembali segera.",
    500: "Ups, ada yang tidak beres dengan server kami.",
    404: "Maaf, halaman yang Anda cari tidak dapat ditemukan.",
    403: "Maaf, Anda dilarang mengakses halaman ini.",
  }[status];

  return (
    <>
      <Head title={status} />

      <Box
        component="main"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          overflow: "hidden",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="h3" component="h1">
              {title}
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="body1" component="div" color="text.secondary">
              {description}
            </Typography>
          </Grid>

          {status === 404 && (
            <Grid item>
              <Button
                type="button"
                color="primary"
                size="large"
                variant="contained"
                component={Link}
                href={route("dashboard")}
                sx={{ mt: 3 }}
              >
                Kembali ke Dashboard
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}

Error.layout = (page) => <BaseLayout children={page} />;
