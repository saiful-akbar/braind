import { usePage } from "@inertiajs/react";
import { Grid } from "@mui/material";
import { memo, useState } from "react";
import CardPetaKerawanan from "./CardPetaKerawanan";
import { useSelector } from "react-redux";
import Lightbox from "yet-another-react-lightbox";

/**
 * Komponen content peta kerawanan
 */
const ContentPetaKerawanan = memo(() => {
  const { data } = usePage().props;
  const { slides } = useSelector((state) => state.galeri);

  /**
   * State
   */
  const [index, setIndex] = useState(-1);

  return (
    <>
      <Grid container spacing={3}>
        {data.map((peta, index) => (
          <Grid key={peta.id} item md={4} sm={6} xs={12}>
            <CardPetaKerawanan
              kantor={peta.kantor.nama}
              id={peta.id}
              createdAt={peta.created_at}
              isVideo={Boolean(peta.video_url !== null)}
              judul={peta.judul}
              keterangan={peta.keterangan}
              onPreview={() => setIndex(index)}
              src={
                Boolean(peta.video_url !== null)
                  ? peta.video_url
                  : peta.gambar_url
              }
            />
          </Grid>
        ))}
      </Grid>

      <Lightbox
        index={index}
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </>
  );
});

export default ContentPetaKerawanan;
