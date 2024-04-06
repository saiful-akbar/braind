import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { usePage } from "@inertiajs/react";
import { utcToLocale } from "@/utils";
import { Delete } from "@mui/icons-material";

/**
 * Komponen video kantor
 */
const Video = memo((props) => {
  const { id, url, title, description, createdAt, onDelete } = props;
  const { access } = usePage().props;

  return (
    <Card elevation={3}>
      <CardHeader
        title={title}
        titleTypographyProps={{
          variant: "subtitle1",
          component: "span",
        }}
        subheader={utcToLocale(createdAt)}
        subheaderTypographyProps={{
          variant: "body2",
          component: "div",
        }}
        action={
          access.remove && (
            <Tooltip title="Hapus" disableInteractive>
              <IconButton color="error" onClick={() => onDelete(id)}>
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          )
        }
      />

      <CardMedia
        sx={{ height: 250, width: "100%" }}
        component="iframe"
        width="640"
        height="390"
        src={url}
        title={title}
        allowFullScreen
      />

      <CardContent sx={{ height: 120 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          component="div"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
});

/**
 * Prop types
 */
Video.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Video;
