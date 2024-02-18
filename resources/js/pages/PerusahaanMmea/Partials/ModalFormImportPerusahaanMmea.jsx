import Modal from "@/components/Modal";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { closeFormImportExcel } from "@/redux/reducers/perusahaanMmeaReducer";
import { useForm, usePage } from "@inertiajs/react";
import { Close, Download, Upload } from "@mui/icons-material";
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

/**
 * Komponen modal untuk form import excel perusahaan cukai mmea.
 *
 * @returns {React.ReactElement}
 */
const ModalFormImportPerusahaanMmea = () => {
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.perusahaanMmea.importExcel);
  const { app } = usePage().props;
  const { csrf } = app;
  const { params } = app.url;

  /**
   * State
   */
  const [downloading, setDownloading] = useState(false);
  const [errors, setErrors] = useState([]);

  /**
   * Form
   */
  const form = useForm({
    file: "",
    _token: csrf,
  });

  /**
   * Update form saat modal dibuka
   */
  useEffect(() => {
    if (open) {
      form.reset();
      form.clearErrors();
      setErrors([]);
    }
  }, [open]);

  /**
   * fungsi untuk menutup modal
   */
  const handleClose = useCallback(() => {
    if (!form.processing) {
      dispatch(closeFormImportExcel());
    }
  }, [form]);

  /**
   * fungsi untuk download template import
   */
  const handleDownloadTemplate = useCallback(async () => {
    setDownloading(true);

    try {
      const response = await axios({
        method: "get",
        url: route("perusahaan-mmea.import.template"),
        responseType: "blob",
      });

      if (response.status === 200) {
        saveAs(response.data, "template_import_perusahaan_mmea.xlsx");
        setDownloading(false);
        dispatch(
          openNotification({
            status: "success",
            message: "Download template berhasil.",
          })
        );
      }
    } catch (error) {
      setDownloading(false);
      dispatch(
        openNotification({
          status: "error",
          message: `${error.status} - Download template gagal.`,
        })
      );
    }
  }, [dispatch, setDownloading]);

  /**
   * fungsi untuk menangani ketika form diisi
   */
  const handleInputChange = useCallback(
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
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const url = route("perusahaan-mmea.import", {
        _query: params,
      });

      form.post(url, {
        preserveScroll: true,
        preserveState: true,
        onStart: () => setErrors([]),
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
    },
    [params, form, setErrors, handleClose, dispatch]
  );

  return (
    <Modal
      title="Import Excel"
      open={open}
      onClose={handleClose}
      loading={form.processing}
      maxWidth="sm"
      component="form"
      autoComplete="off"
      encType="multipart/form-data"
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
              loading={downloading}
              disabled={form.processing}
              onClick={handleDownloadTemplate}
              startIcon={<Download />}
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
        <Button
          type="button"
          size="large"
          color="primary"
          variant="outlined"
          onClick={handleClose}
          disabled={form.processing}
          startIcon={<Close />}
        >
          Tutup
        </Button>

        <LoadingButton
          type="submit"
          size="large"
          color="primary"
          variant="contained"
          loading={form.processing}
          startIcon={<Upload />}
        >
          Import
        </LoadingButton>
      </DialogActions>
    </Modal>
  );
};

export default ModalFormImportPerusahaanMmea;
