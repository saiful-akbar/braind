import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import Modal from "@/components/Modal";
import { useForm, usePage } from "@inertiajs/react";
import {
  DialogActions,
  DialogContent,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import TextInput from "@/components/Input/TextInput";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";

/**
 * Form upload image
 */
const FormUpload = memo((props) => {
  const { app } = usePage().props;
  const { csrf } = app;
  const { params } = app.url;

  /**
   * Form data
   */
  const { data, setData, processing, errors, clearErrors, reset, post } =
    useForm({
      gambar: "",
      judul: "",
      keterangan: "",
      _token: csrf,
    });

  /**
   * fungsi untuk menutup modal dialog
   */
  const handleClose = useCallback(() => {
    if (!processing) props.onClose();
  }, [processing, props.onClose]);

  /**
   * fungsi untuk menangani ketika gambar diupload
   */
  const handleImageChange = useCallback(
    (e) => {
      const { name, files } = e.target;

      if (files.length > 0) {
        setData(name, files[0]);
      }
    },
    [setData]
  );

  /**
   * fungsi untuk menangani ketika form input diisi
   */
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData(name, value);
    },
    [setData]
  );

  /**
   * fungsi untuk mengangani ketika form di-submit
   */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const url = route("profil-kantor.galeri.store", {
        _query: params,
      });

      post(url, {
        preserveScroll: true,
        onSuccess: () => reset(),
      });
    },
    [params, post, reset]
  );

  return (
    <Modal
      open={props.open}
      maxWidth="sm"
      title="Unggah Gambar"
      loading={processing}
      onClose={handleClose}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <DialogContent dividers sx={{ p: 3 }}>
        <Stack direction="column" spacing={3}>
          <TextField
            fullWidth
            required
            type="file"
            name="gambar"
            label="Gambar"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              accept: [".jpg", ".png", ".jpeg", ".webp", ".svg"].join(", "),
            }}
            onChange={handleImageChange}
            error={Boolean(errors.gambar)}
            helperText={errors.gambar}
            disabled={processing}
          />

          <TextField
            fullWidth
            required
            type="text"
            label="Judul"
            name="judul"
            value={data.judul}
            onChange={handleInputChange}
            error={Boolean(errors.judul)}
            helperText={errors.judul}
            disabled={processing}
          />

          <TextField
            fullWidth
            required
            multiline
            rows={4}
            type="text"
            label="Keterangan Singkat"
            name="keterangan"
            value={data.keterangan}
            onChange={handleInputChange}
            error={Boolean(errors.keterangan)}
            helperText={errors.keterangan}
            disabled={processing}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Save />}
          loading={processing}
        >
          Simpan
        </LoadingButton>
      </DialogActions>
    </Modal>
  );
});

/**
 * Prop types.
 */
FormUpload.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

/**
 * Default props.
 */
FormUpload.defaultProps = {
  open: false,
};

export default FormUpload;
