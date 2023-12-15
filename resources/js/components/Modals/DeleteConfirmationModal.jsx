import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Typography,
  Alert,
  Tooltip,
  AlertTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";

/**
 * Komponen modal untuk konfirmasi hepus
 */
const DeleteConfirmationModal = React.memo((props) => {
  const { open, title, loading, onDelete, onClose, message } = props;

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

      <DialogContent>
        <Alert severity="error">
          <AlertTitle>Peringatan</AlertTitle>
          {message}
        </Alert>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <LoadingButton
          fullWidth
          disableElevation
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
  message: PropTypes.string,
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
