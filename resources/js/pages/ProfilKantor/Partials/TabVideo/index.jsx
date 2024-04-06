import { usePage } from "@inertiajs/react";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { memo } from "react";

/**
 * Komponen untuk tab video kantor.
 */
const TabVideo = memo(() => {
  const { access } = usePage().props;

  const youtubeUrl = "https://www.youtube.com/embed/tOxKW0n2vEA";

  return (
    <Grid container spacing={3}>
      {[...new Array(10)].map((i, key) => (
        <Grid key={key} item md={6} xs={12}>
          <Card elevation={3}>
            <CardHeader
              title="Vodeo"
              titleTypographyProps={{
                variant: "subtitle1",
                component: "span",
              }}
              // subheader={utcToLocale(props.createdAt)}
              subheaderTypographyProps={{
                variant: "body2",
                component: "div",
              }}
              action={
                access.remove && (
                  <Tooltip title="Hapus" disableInteractive>
                    <IconButton color="error">
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )
              }
            />

            <CardMedia
              sx={{
                height: 250,
                width: "100%",
              }}
              component="iframe"
              width="640"
              height="390"
              src={youtubeUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            <CardContent sx={{ height: 120 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
                sx={{
                  display: "inline",
                  WebkitLineClamp: 4,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  wordWrap: "break-word",
                }}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Laborum repellendus nesciunt odio accusamus vitae assumenda
                libero, fugit explicabo magni at cumque atque recusandae maxime.
                A libero at nisi ratione molestiae distinctio nesciunt aliquid,
                alias odio voluptates laboriosam consequatur? Similique quod
                sunt molestiae quasi laborum quia labore exercitationem
                necessitatibus in eum?
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});

export default TabVideo;
