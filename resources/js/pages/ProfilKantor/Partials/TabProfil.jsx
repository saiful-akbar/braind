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
  Fab,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { memo, useCallback, useState } from "react";

/**
 * Komponen about kantor untuk halaman profil kantor
 */
const TabProfil = memo(() => {
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
  } = useForm({
    keterangan: data.profil?.keterangan ?? "",
    aktifitas: data.profil?.aktifitas ?? "",
    area_pengawasan: data.profil?.area_pengawasan ?? "",
    _token: csrf,
  });

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
    setData({
      keterangan: data.profil?.keterangan ?? "",
      aktifitas: data.profil?.aktifitas ?? "",
      area_pengawasan: data.profil?.area_pengawasan ?? "",
    });

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

      const url = route("profil-kantor.update", {
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
      <Grid container spacing={3} alignItems="flex-start">
        <Grid item xs={12} sm={6} md={4}>
          <CardPaper title="Tentang" sx={{ minHeight: "400px" }}>
            <CardContent>
              <Typography variant="body2">
                {data.profil?.keterangan ?? ""}
              </Typography>
            </CardContent>
          </CardPaper>
        </Grid>

        <Grid item xs={12} sm={6} md={8} container spacing={3}>
          <Grid item xs={12}>
            <CardPaper
              title="Aktifitas"
              sx={{
                minHeight: (theme) => `calc(200px - ${theme.spacing(1.5)})`,
              }}
            >
              <CardContent>
                <Typography variant="body2">
                  {data.profil?.aktifitas ?? ""}
                </Typography>
              </CardContent>
            </CardPaper>
          </Grid>

          <Grid item xs={12}>
            <CardPaper
              title="Area Pengawasan"
              sx={{
                minHeight: (theme) => `calc(200px - ${theme.spacing(1.5)})`,
              }}
            >
              <CardContent>
                <Typography variant="body2">
                  {data.profil?.area_pengawasan ?? ""}
                </Typography>
              </CardContent>
            </CardPaper>
          </Grid>
        </Grid>
      </Grid>

      <Tooltip title="Edit Profil" disableInteractive placement="left">
        <Fab
          color="primary"
          size="medium"
          sx={{
            position: "fixed",
            right: 20,
            bottom: 20,
            zIndex: 1,
          }}
          onClick={handleOpenModal}
        >
          <Edit />
        </Fab>
      </Tooltip>

      {access.update && (
        <Modal
          open={open}
          maxWidth="md"
          onClose={handleCloseModal}
          title="Ubah Profil Kantor"
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <DialogContent dividers sx={{ p: 3 }}>
            <Stack direction="column" spacing={3}>
              <TextField
                fullWidth
                multiline
                rows={5}
                label="Keterangan"
                type="text"
                name="keterangan"
                value={formData.keterangan}
                onChange={handleInputChange}
                error={Boolean(errors.keterangan)}
                helperText={errors.keterangan}
                disabled={processing}
              />

              <TextField
                fullWidth
                multiline
                rows={5}
                label="Aktifitas"
                type="text"
                name="aktifitas"
                value={formData.aktifitas}
                onChange={handleInputChange}
                error={Boolean(errors.aktifitas)}
                helperText={errors.aktifitas}
                disabled={processing}
              />

              <TextField
                fullWidth
                multiline
                rows={5}
                label="Area Pengawasan"
                type="text"
                name="area_pengawasan"
                value={formData.area_pengawasan}
                onChange={handleInputChange}
                error={Boolean(errors.area_pengawasan)}
                helperText={errors.area_pengawasan}
                disabled={processing}
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 3 }}>
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

export default TabProfil;
