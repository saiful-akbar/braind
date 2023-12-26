import CloseIcon from "@mui/icons-material/Close";
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
const RestoreConfirmationModal = React.memo((props) => {
  const { open, title, loading, onRestore, onClose, ...rest } = props;

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

      <DialogActions sx={{ p: 3 }}>
        <LoadingButton
          fullWidth
          disableElevation
          type="button"
          variant="contained"
          color="primary"
          loading={loading}
          onClick={onRestore}
          loadingIndicator="Memulihkan..."
        >
          Pulihkan
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
});

/**
 * Prop types
 */
RestoreConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  loading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onRestore: PropTypes.func.isRequired,
};

/**
 * Default props.
 */
RestoreConfirmationModal.defaultProps = {
  title: "Pulihkan",
  loading: false,
};

export default RestoreConfirmationModal;
