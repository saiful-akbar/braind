import { Add } from "@mui/icons-material";
import { Fab, Grid, Tooltip } from "@mui/material";
import React, { Fragment, useState } from "react";
import FormUpload from "./Partials/FormUpload";
import { useCallback } from "react";
import { usePage } from "@inertiajs/react";
import Image from "./Partials/Image";

/**
 * Komponen galeri untuk halaman profil kantor.
 *
 * @returns {React.ReactElement}
 */
const TabGaleri = () => {
  const { data } = usePage().props;
  const galleries = data.galeri;
  console.log(data);

  /**
   * State
   */
  const [open, setOpen] = useState(false);

  /**
   * fungsi untuk membuka modal create
   */
  const toggleModalCreate = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, [setOpen]);

  return (
    <Fragment>
      <Grid container spacing={3}>
        {galleries.map((gallery) => (
          <Grid key={gallery.id} item md={4} sm={6} xs={12}>
            <Image
              src={gallery.uri}
              title={gallery.judul}
              description={gallery.keterangan}
              createdAt={gallery.created_at}
            />
          </Grid>
        ))}
      </Grid>

      <Tooltip title="Unggah Gambar" disableInteractive placement="left">
        <Fab
          color="primary"
          size="medium"
          onClick={toggleModalCreate}
          sx={{
            position: "fixed",
            zIndex: 1,
            bottom: 20,
            right: 20,
          }}
        >
          <Add />
        </Fab>
      </Tooltip>

      {/* Form upload gambar ke galeri */}
      <FormUpload open={open} onClose={toggleModalCreate} />
    </Fragment>
  );
};

export default TabGaleri;
