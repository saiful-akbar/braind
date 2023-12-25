import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

/**
 * Komponen modal untuk konfirmasi hepus
 */
const DeleteConfirmationModal = React.memo((props) => {
  const { open, title, loading, onDelete, onClose } = props;

  /**
   * fungsi untuk menutup modal
   */
  const handleClose = () => {
    if (!loading) onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="span">
          {title}
        </Typography>

        <Tooltip title="Tutup" disableInteractive>
          <IconButton type="button" onClick={handleClose} disabled={loading}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </DialogTitle>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <LoadingButton
          fullWidth
          type="button"
          variant="contained"
          color="error"
          loading={loading}
          onClick={onDelete}
          startIcon={<DeleteIcon />}
          loadingIndicator="Menghapus..."
        >
          Hapus
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
});

/**
 * Prop types
 */
DeleteConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  loading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

/**
 * Default props.
 */
DeleteConfirmationModal.defaultProps = {
  title: "Hapus",
  loading: false,
  message: "Apakah Anda yakin ingin menghapus item ini?",
};

export default DeleteConfirmationModal;
