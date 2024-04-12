import { usePage } from "@inertiajs/react";
import { Grid } from "@mui/material";
import { memo } from "react";
import CardPetaKerawanan from "./CardPetaKerawanan";

/**
 * Komponen content peta kerawanan
 */
const ContentPetaKerawanan = memo(() => {
  const { data } = usePage().props;

  return (
    <Grid container spacing={3}>
      {data.map((petaKerawanan) => (
        <Grid key={petaKerawanan.id} item md={4} sm={6} xs={12}>
          <CardPetaKerawanan
            kantor={petaKerawanan.kantor.nama}
            id={petaKerawanan.id}
            createdAt={petaKerawanan.created_at}
            isVideo={Boolean(petaKerawanan.video_url !== null)}
            judul={petaKerawanan.judul}
            keterangan={petaKerawanan.keterangan}
            src={
              Boolean(petaKerawanan.video_url !== null)
                ? petaKerawanan.video_url
                : petaKerawanan.gambar_url
            }
          />
        </Grid>
      ))}
    </Grid>
  );
});

export default ContentPetaKerawanan;
