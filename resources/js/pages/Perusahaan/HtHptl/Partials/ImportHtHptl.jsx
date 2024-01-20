import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import BaseModal from "@/components/Modals/BaseModal";
import { useForm, usePage } from "@inertiajs/react";
import {
  Alert,
  AlertTitle,
  Button,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { openNotification } from "@/redux/reducers/notificationReducer";

/**
 * Komponen partial perusahaan cukai HT + HPTL untuk import excel.
 *
 * @returns {React.ReactElement}
 */
const ImportHtHptl = ({ open, onClose, ...rest }) => {
  const dispatch = useDispatch();
  const { app } = usePage().props;
  const { params } = app.url;

  const form = useForm({
    file: "",
  });

  /**
   * bersihkan form saat modal dibuka
   */
  useEffect(() => {
    form.reset();
    form.clearErrors();
  }, [open]);

  /**
   * fungsi untuk menutup modal dialog
   */
  const handleClose = useCallback(() => {
    if (!form.processing) onClose();
  }, [form.processing]);

  /**
   * fungsi untuk menangani ketika form diisi.
   */
  const handleChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      form.setData(name, files[0]);
    }
  };

  /**
   * fungsi untuk menangani ketika form di submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = route("perusahaan.hthptl.import", {
      _query: {
        ...params,
      },
    });

    form.post(url, {
      preserveScroll: true,
      onSuccess: () => {
        dispatch(
          openNotification({
            status: "success",
            message: "Import berhasil.",
          })
        );
      },
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesahan, impor gagal.",
          })
        );
      },
    });
  };

  return (
    <BaseModal
      open={open}
      title="Impor Excel"
      maxWidth="sm"
      onClose={handleClose}
      component="form"
      autoComplete="off"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <DialogContent dividers sx={{ py: 3 }}>
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          Jangan menutup atau memuat ulang halaman ini saat proses impor sedang
          berlangsung.
        </Alert>

        <TextField
          fullWidth
          label="Unggal file"
          name="file"
          type="file"
          onChange={handleChange}
          disabled={form.processing}
          error={Boolean(form.errors.file)}
          helperText={form.errors.file}
          inputProps={{
            accept: [
              "application/vnd.ms-excel",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ].join(", "),
          }}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            mt: 3,
          }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          size="large"
          type="button"
          color="primary"
          variant="outlined"
          onClick={handleClose}
          disabled={form.processing}
        >
          Tutup
        </Button>

        <LoadingButton
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          loading={form.processing}
        >
          Impor
        </LoadingButton>
      </DialogActions>
    </BaseModal>
  );
};

/**
 * Prop types
 */
ImportHtHptl.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImportHtHptl;
