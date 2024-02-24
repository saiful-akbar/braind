import Modal from "@/components/Modal";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { closeFormlImport } from "@/redux/reducers/perusahaanImportReducer";
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
import React, { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen modal form import excel perusahaan export.
 */
const ModalFormImportPerusahaanImport = memo(() => {
  const { app } = usePage().props;
  const { params } = app.url;
  const { open } = useSelector((state) => state.perusahaanImport.import);
  const dispatch = useDispatch();

  // state
  const [downloading, setDownloading] = useState(false);

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
  const handleClose = useCallback(() => {
    if (!form.processing) {
      dispatch(closeFormlImport());
      setErrors([]);
    }
  }, [form, setErrors]);

  /**
   * fungsi untuk download template import
   */
  const handleDownloadTemplate = useCallback(async () => {
    setDownloading(true);

    if (!form.processing) {
      try {
        const response = await axios({
          method: "get",
          url: route("perusahaan-import.import.template"),
          responseType: "blob",
        });

        if (response.status === 200) {
          saveAs(response.data, "template_import_perusahaan_import.xlsx");
          setDownloading(false);
          dispatch(
            openNotification({
              status: "success",
              message: "Template berhasil didownload.",
            })
          );
        }
      } catch (error) {
        setDownloading(false);
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesalahan. Download template gagal.",
          })
        );
      }
    }
  }, [setDownloading, dispatch, form]);

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
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = route("perusahaan-import.import", {
      _query: params,
    });

    form.post(url, {
      preserveScroll: true,
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
  };

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
});

export default ModalFormImportPerusahaanImport;
