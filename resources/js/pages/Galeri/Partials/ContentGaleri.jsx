import { usePage } from "@inertiajs/react";
import { Grid } from "@mui/material";
import { Fragment, memo, useState } from "react";
import { useSelector } from "react-redux";
import Lightbox from "yet-another-react-lightbox";
import CardGaleri from "./CardGaleri";

/**
 * Komponen content galeri
 */
const ContentGaleri = memo(() => {
  const { data } = usePage().props;
  const { slides } = useSelector((state) => state.galeri);

  const [index, setIndex] = useState(-1);

  /**
   * Open slide preview
   */
  const openSlides = (index) => {
    setIndex(index);
  };

  return (
    <Fragment>
      <Grid container spacing={3}>
        {data.map((galeri, index) => (
          <Grid key={galeri.id} item md={4} sm={6} xs={12}>
            <CardGaleri
              kantor={galeri.kantor.nama}
              id={galeri.id}
              createdAt={galeri.created_at}
              isVideo={Boolean(galeri.video_url !== null)}
              judul={galeri.judul}
              keterangan={galeri.keterangan}
              onPreview={() => openSlides(index)}
              src={
                Boolean(galeri.video_url !== null)
                  ? galeri.video_url
                  : galeri.gambar_url
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
    </Fragment>
  );
});

export default ContentGaleri;
