import React, { useCallback, useEffect, useState } from "react";
import { closeSbpForm } from "@/redux/reducers/sbpReducer";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "@mui/icons-material";
import TextInput from "@/components/Input/TextInput";
import { LoadingButton } from "@mui/lab";

/**
 * Komponen partials untuk form create dan update SBP
 */
const FormSbp = () => {
  const sbp = useSelector((state) => state.sbp);
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // state
  const [data, setData] = useState(sbp.data);
  const [errors, setErrors] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [title, setTitle] = useState("Tambah SBP");

  /**
   * Update title sbp
   */
  useEffect(() => {
    const { type } = sbp;
    setTitle(type === "create" ? "Tambah SBP" : "Edit SBP");
  }, [sbp.type, setTitle]);

  /**
   * fungsi untuk menutup dialog
   */
  const handleClose = () => {
    if (!processing) {
      dispatch(closeSbpForm());
    }
  };

  /**
   * fungsi untuk mengatasi ketika form input diisi
   */
  const handleInputChange = useCallback(
    (e) => {
      setData(e.target.name, e.target.value);
    },
    [setData]
  );

  return (
    <Dialog
      open={sbp.open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      scroll="paper"
      component="form"
      autoComplete="off"
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" component="div">
          {sbp.type === "create" ? "Tambah SBP" : "Edit SBP"}
        </Typography>

        <Tooltip title="Tutup" disableInteractive>
          <IconButton onClick={handleClose}>
            <Close sx={{ color: "text.secondary" }} />
          </IconButton>
        </Tooltip>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 3 }}>
        <Stack direction="column" spacing={2}>
          <TextInput
            fullWidth
            required
            size="small"
            type="number"
            label="Jumlah"
            name="jumlah"
            value={data.jumlah}
            onChange={handleInputChange}
            disabled={processing}
            error={Boolean(errors?.jumlah)}
            helperText={errors?.jumlah}
          />

          <TextInput
            fullWidth
            required
            size="small"
            type="number"
            label="Tidak lanjut"
            name="tindak_lanjut"
            value={data.tindak_lanjut}
            onChange={handleInputChange}
            disabled={processing}
            error={Boolean(errors?.tindak_lanjut)}
            helperText={errors?.tindak_lanjut}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button type="button" variant="outlined" onClick={handleClose}>
          Batal
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={processing}
        >
          Simpan
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default FormSbp;
