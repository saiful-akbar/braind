import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Komponen custom modal
 *
 * @param {object} props
 * @returns {React.ReactElement}
 */
const BaseModal = (props) => {
  const { open, maxWidth, loading, title, onClose, children, ...rest } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  /**
   * fungsi untuk menutup modal
   */
  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      {...rest}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="div">
          {title}
        </Typography>

        <Tooltip title="Tutup" disableInteractive>
          <IconButton onClick={handleClose} sx={{ color: "text.secondary" }}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </DialogTitle>

      {children}
    </Dialog>
  );
};

/**
 * Prop types
 */
BaseModal.propTypes = {
  open: PropTypes.bool,
  loading: PropTypes.bool,
  maxWidth: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

/**
 * Default props
 */
BaseModal.defaultProps = {
  open: false,
  loading: false,
  maxWidth: "lg",
};

export default BaseModal;
