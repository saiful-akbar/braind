import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { utcToLocale } from "@/utils";
import { usePage } from "@inertiajs/react";
import { Delete } from "@mui/icons-material";

/**
 * Komponen card image untuk galeri kantor
 */
const Image = memo((props) => {
  const { access } = usePage().props;

  return (
    <Card>
      <CardHeader
        title={props.title}
        titleTypographyProps={{
          variant: "subtitle1",
          component: "span",
        }}
        subheader={utcToLocale(props.createdAt)}
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

      <CardActionArea>
        <CardMedia
          component="img"
          src={props.src}
          height={200}
          loading="lazy"
          alt={props.title}
          sx={{
            objectFit: "cover",
          }}
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
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

Image.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  createdAt: PropTypes.string,
};

Image.defaultProps = {
  description: null,
};

export default Image;
