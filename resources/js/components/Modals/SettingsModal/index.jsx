import { openSettings } from "@/redux/reducers/settingsReducer";
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";
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
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pl: 3,
        }}
      >
        <Typography variant="h6" component="div">
          Settings
        </Typography>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ color: "text.secondary" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <AppearanceSettings />
        <Divider sx={{ my: 2 }} />
      </DialogContent>
    </Dialog>
  );
}
