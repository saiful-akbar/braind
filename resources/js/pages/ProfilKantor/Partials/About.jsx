import CardPaper from "@/components/CardPaper";
import Modal from "@/components/Modal";
import { useForm, usePage } from "@inertiajs/react";
import { Close, Edit, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  CardContent,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { memo, useCallback, useState } from "react";

/**
 * Komponen about kantor untuk halaman profil kantor
 */
const About = memo(() => {
  const { access, data, app } = usePage().props;
  const { params } = app.url;
  const { csrf } = app;

  /**
   * state
   */
  const [open, setOpen] = useState(false);

  /**
   * form data
   */
  const {
    data: formData,
    setData,
    processing,
    patch,
    errors,
    clearErrors,
  } = useForm({ keterangan: data.profil?.keterangan ?? "", _token: csrf });

  /**
   * fungsi untuk menangani ketika form diisi
   */
  const handleInputChange = useCallback(
    (e) => {
      setData(e.target.name, e.target.value);
    },
    [setData]
  );

  /**
   * fungsi untuk membuka modal form
   */
  const handleOpenModal = useCallback(() => {
    setData("keterangan", data.profil?.keterangan ?? "");
    clearErrors();
    setOpen(true);
  }, [clearErrors, setData, setOpen]);

  /**
   * fungsi untuk menutup modal
   */
  const handleCloseModal = useCallback(() => {
    if (!processing) setOpen(false);
  }, [processing, setOpen]);

  /**
   * fungsi untuk menangani ketika form di-submit
   */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const url = route("profil-kantor.update.keterangan", {
        _query: params,
      });

      patch(url, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => handleCloseModal(),
      });
    },
    [patch, handleCloseModal, params]
  );

  return (
    <>
      <CardPaper
        title="Tentang"
        action={
          access.update && (
            <Tooltip title="Edit">
              <IconButton onClick={handleOpenModal}>
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
          )
        }
      >
        <CardContent>
          <Typography variant="body2">
            {data.profil?.keterangan ?? ""}
          </Typography>
        </CardContent>
      </CardPaper>

      {access.update && (
        <Modal
          open={open}
          maxWidth="sm"
          onClose={handleCloseModal}
          title="Edit Keterangan"
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <DialogContent dividers sx={{ p: 3 }}>
            <TextField
              fullWidth
              label="Keterangan"
              type="text"
              name="keterangan"
              value={formData.keterangan}
              onChange={handleInputChange}
              error={Boolean(errors.keterangan)}
              helperText={errors.keterangan}
              disabled={processing}
              multiline
              rows={3}
            />
          </DialogContent>

          <DialogActions sx={{ p: 3 }}>
            <Button
              type="button"
              variant="outlined"
              color="primary"
              startIcon={<Close />}
              onClick={handleCloseModal}
              disabled={processing}
            >
              Tutup
            </Button>

            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<Save />}
              loading={processing}
            >
              Simpan
            </LoadingButton>
          </DialogActions>
        </Modal>
      )}
    </>
  );
});

export default About;
