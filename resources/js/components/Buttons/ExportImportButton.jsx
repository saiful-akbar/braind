import { usePage } from "@inertiajs/react";
import {
  AssignmentReturned,
  Download,
  MoreVert,
  Upload,
} from "@mui/icons-material";
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { Fragment } from "react";

/**
 * Button untuk export, import dan download template excel
 */
const ExportImportButton = (props) => {
  const { onExport, onImport, onDownloadTemplate } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { access } = usePage().props;

  /**
   * fungsi untuk membuka menu
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * fungsi untuk menutup menu
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * fungsi untuk export
   */
  const handleExport = () => {
    onExport();
    handleClose();
  };

  /**
   * fungsi untuk import
   */
  const handleImport = () => {
    onImport();
    handleClose();
  };

  /**
   * fungsi untuk download template
   */
  const handleDownloadTemplate = () => {
    onDownloadTemplate();
    handleClose();
  };

  return (
    <Fragment>
      <Tooltip title="Ekspor dan impor excel" disableInteractive>
        <IconButton onClick={handleClick}>
          <MoreVert />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{
          horizontal: "left",
          vertical: "top",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <MenuItem onClick={handleExport}>
          <ListItemIcon>
            <Download fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ekspor excel</ListItemText>
        </MenuItem>

        {access.create && <Divider />}

        {access.create && (
          <MenuItem onClick={handleImport}>
            <ListItemIcon>
              <Upload fontSize="small" />
            </ListItemIcon>
            <ListItemText>Impor excel</ListItemText>
          </MenuItem>
        )}

        {access.create && (
          <MenuItem onClick={handleDownloadTemplate}>
            <ListItemIcon>
              <AssignmentReturned fontSize="small" />
            </ListItemIcon>
            <ListItemText>Unduh template</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  );
};

/**
 * Prop types
 */
ExportImportButton.propTypes = {
  onExport: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
  onDownloadTemplate: PropTypes.func.isRequired,
};

export default ExportImportButton;
