import React, { useCallback, useState } from "react";
import Modal from "@/components/Modal";
import { closeModalImportKantor } from "@/redux/reducers/kantorReducer";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { useForm, usePage } from "@inertiajs/react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";

/**
 * Komponen modal untuk import excel data kantor.
 *
 * @returns {React.ReactElement}
 */
const ModalImportKantor = () => {
  const { open } = useSelector((state) => state.kantor.import);
  const dispatch = useDispatch();
  const { app } = usePage().props;
  const { params } = app.url;

  // form data
  const form = useForm({
    file: "",
    _token: app.csrf,
  });

  // state
  const [errors, setErrors] = useState([]);

  /**
   * fungsi untuk menutup modal
   */
  const handleCloseModal = useCallback(() => {
    if (!form.processing) {
      dispatch(closeModalImportKantor());
      setErrors([]);
    }
  }, [form, setErrors]);

  /**
   * fungsi untuk menangani ketika form diisi
   */
  const handleChange = useCallback(
    (e) => {
      const { files, name } = e.target;

      if (files.length > 0) {
        form.setData(name, files[0]);
      }
    },
    [form]
  );

  /**
   * fungsi untuk menangani ketika form di-submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = route("kantor.import", {
      _query: params,
    });

    form.post(url, {
      preserveScroll: true,
      onSuccess: () => {
        handleCloseModal();
      },
      onError: (error) => {
        setErrors(Object.values(error));
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesalahan, gagal mengimpor data kantor.",
          })
        );
      },
    });
  };

  return (
    <Modal
      title="Impor kantor"
      open={open}
      onClose={handleCloseModal}
      loading={form.processing}
      maxWidth="sm"
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <DialogContent dividers sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {errors.length > 0 && (
            <Grid item xs={12}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <Box component="ul" sx={{ paddingInlineStart: 2 }}>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </Box>
              </Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Unggal file"
              name="file"
              type="file"
              onChange={handleChange}
              disabled={form.processing}
              error={Boolean(form.errors.file)}
              helperText={form.errors.file}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                accept: [
                  "application/vnd.ms-excel",
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                ].join(", "),
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          type="button"
          color="primary"
          variant="outlined"
          size="large"
          onClick={handleCloseModal}
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
    </Modal>
  );
};

export default ModalImportKantor;
