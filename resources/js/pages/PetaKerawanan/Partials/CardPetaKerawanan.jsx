import { openDeleteConfirmation } from "@/redux/reducers/petaKerawananReducer";
import { utcToLocale } from "@/utils";
import { usePage } from "@inertiajs/react";
import { DeleteForever } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { useDispatch } from "react-redux";

/**
 * Komponen card untuk peta kerawanan.
 */
const CardPetaKerawanan = memo((props) => {
  const { isVideo, src, judul, keterangan, kantor, id, createdAt, onPreview } =
    props;
  const { access } = usePage().props;
  const dispatch = useDispatch();

  /**
   * fungsi untuk membuka modal delete confirmation
   */
  const handleOpenDeleteConfirmation = () => {
    dispatch(openDeleteConfirmation(id));
  };

  return (
    <Card elevation={3} id={id}>
      <CardHeader
        sx={{ display: "block" }}
        title={judul}
        titleTypographyProps={{
          variant: "subtitle1",
          component: "div",
          noWrap: true,
          title: judul,
        }}
        subheader={kantor}
        subheaderTypographyProps={{
          variant: "caption",
          component: "div",
          color: "text.secondary",
          noWrap: true,
          title: kantor,
        }}
      />

      {isVideo ? (
        <CardMedia
          component="iframe"
          frameBorder="0"
          src={src}
          sx={{ height: 200 }}
        />
      ) : (
        <CardActionArea onClick={onPreview}>
          <CardMedia
            component="img"
            src={src}
            loading="lazy"
            sx={{
              height: 200,
              objectFit: "cover",
            }}
          />
        </CardActionArea>
      )}

      <CardContent sx={{ height: "100px", overflow: "hidden" }}>
        <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
          {keterangan}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {utcToLocale(createdAt)}
        </Typography>

        {access.destroy && (
          <Button
            type="button"
            size="small"
            variant="outlined"
            color="error"
            startIcon={<DeleteForever />}
            onClick={handleOpenDeleteConfirmation}
          >
            Hapus
          </Button>
        )}
      </CardActions>
    </Card>
  );
});

const dataPropTypes = PropTypes.shape({});

/**
 * Prop types.
 */
CardPetaKerawanan.propTypes = {
  isVideo: PropTypes.bool,
  src: PropTypes.string.isRequired,
  judul: PropTypes.string.isRequired,
  keterangan: PropTypes.string.isRequired,
  kantor: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onPreview: PropTypes.func.isRequired,
};

/**
 * default peops.
 */
CardPetaKerawanan.defaultProps = {
  isVideo: true,
};

export default CardPetaKerawanan;
