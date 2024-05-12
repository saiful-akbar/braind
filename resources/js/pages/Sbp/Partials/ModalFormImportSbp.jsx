import Modal from "@/components/Modal";
import useSbp from "@/hooks/useSbp";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { useForm, usePage } from "@inertiajs/react";
import { Close, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from "@mui/material";
import { saveAs } from "file-saver";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ModalFormImportSbp = () => {
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.sbp.import);
  const { closeForm, downloadTemplate } = useSbp().importExcel;
  const { app } = usePage().props;
  const { params } = app.url;

  /**
   * form data
   */
  const form = useForm({
    file: "",
    _token: app.csrf,
  });

  /**
   * state
   */
  const [downloading, setDownloading] = useState(false);
  const [errors, setErrors] = useState([]);

  /**
   * bersihkan dan reset form data saat modal dibuka
   */
  useEffect(() => {
    form.clearErrors();
    form.reset();
    setErrors([]);
  }, [open]);

  /**
   * fungsi untuk menutup modal
   */
  const handleClose = useCallback(() => {
    if (!form.processing) closeForm();
  }, [form.processing, closeForm]);

  /**
   * fungsi untuk mengatasi ketika form diisi
   */
  const handleInputChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      form.setData(name, files[0]);
    }
  };

  /**
   * fungsi untuk download template import
   */
  const handleDownloadTemplate = useCallback(async () => {
    setDownloading(true);

    try {
      const response = await downloadTemplate();

      saveAs(response, "template_import_sbp.xlsx");
      setDownloading(false);

      dispatch(
        openNotification({
          status: "success",
          message: "Download template berhasil.",
        })
      );
    } catch (error) {
      console.log(error);
      setDownloading(false);

      dispatch(
        openNotification({
          status: "error",
          message: "Terjadi kesalahan, template gagal diunduh.",
        })
      );
    }
  }, [setDownloading, downloadTemplate, dispatch]);

  /**
   * fungsi untuk menagatasi ketika form disubmit
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = route("sbp.import", {
      _query: params,
    });

    form.post(url, {
      preserveScroll: true,
      onSuccess: () => handleClose(),
      onError: (error) => {
        setErrors(Object.values(error));
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesalahan, import gagal.",
          })
        );
      },
    });
  };

  return (
    <Modal
      title="Impor Excel"
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <DialogContent dividers sx={{ py: 3 }}>
        <Grid container spacing={5}>
          {errors.length > 0 && (
            <Grid item xs={12}>
              <Alert severity="error" icon={false}>
                <Box component="ul" sx={{ paddingInlineStart: 2 }}>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </Box>
              </Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <LoadingButton
              fullWidth
              type="button"
              color="secondary"
              variant="contained"
              onClick={handleDownloadTemplate}
              loading={downloading}
              disabled={form.processing}
            >
              Download Template
            </LoadingButton>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Upload file"
              name="file"
              type="file"
              onChange={handleInputChange}
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
        <LoadingButton
          type="submit"
          color="primary"
          variant="contained"
          loading={form.processing}
          startIcon={<Save />}
        >
          Impor
        </LoadingButton>
      </DialogActions>
    </Modal>
  );
};

export default ModalFormImportSbp;
