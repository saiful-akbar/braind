import { openSettings } from "@/redux/reducers/settingsReducer";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Tooltip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import AppearanceSettings from "./Partials/AppearanceSettings";

/**
 * Settings komponen
 *
 * @returns React.ReactElement
 */
export default function SettingsModal() {
  const { open } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  // fungsi untuk menutup dialog settings
  const handleClose = () => {
    dispatch(openSettings(false));
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="div">
          Pengaturan
        </Typography>

        <Tooltip title="Tutup" disableInteractive>
          <IconButton onClick={handleClose} sx={{ color: "text.secondary" }}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </DialogTitle>

      <DialogContent sx={{ borderTop: 1, borderColor: "divider" }}>
        <Box sx={{ mt: 3, mb: 1 }}>
          <AppearanceSettings />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
