import { usePage } from "@inertiajs/react";
import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Fab,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Fragment, memo } from "react";
import Video from "./Partials/Video";

/**
 * Komponen untuk tab video kantor.
 */
const TabVideo = memo(() => {
  const { access, data } = usePage().props;
  const videos = data.galeri.filter((galeri) => galeri.tipe === "gambar");
  const youtubeUrl = "https://www.youtube.com/embed/tOxKW0n2vEA";

  return (
    <Fragment>
      <Grid container spacing={3}>
        {videos.map((video) => (
          <Grid key={video.id} item md={6} xs={12}>
            <Video
              title={video.judul}
              description={video.keterangan}
              createdAt={video.created_at}
              url={youtubeUrl}
              onDelete={() => {}}
            />
          </Grid>
        ))}
      </Grid>

      {/* Button add video */}
      {access.create && (
        <Tooltip title="Tambah Video" disableInteractive placement="left">
          <Fab
            color="primary"
            size="medium"
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
      )}
    </Fragment>
  );
});

export default TabVideo;
