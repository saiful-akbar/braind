import { usePage } from "@inertiajs/react";
import { Grid } from "@mui/material";
import { memo } from "react";
import CardGaleri from "./CardGaleri";

/**
 * Komponen image petak
 */
const ContentGaleri = memo(() => {
  const { data, pagination, access } = usePage().props;

  return (
    <Grid container spacing={3}>
      {data.map((galeri) => (
        <Grid key={galeri.id} item md={4} sm={6} xs={12}>
          <CardGaleri
            kantor={galeri.kantor.nama}
            id={galeri.id}
            createdAt={galeri.created_at}
            isVideo={Boolean(galeri.video_url !== null)}
            judul={galeri.judul}
            keterangan={galeri.keterangan}
            src={
              Boolean(galeri.video_url !== null)
                ? galeri.video_url
                : galeri.gambar_url
            }
          />
        </Grid>
      ))}
    </Grid>
  );
});

export default ContentGaleri;
