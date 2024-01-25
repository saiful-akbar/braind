import Modal from "@/components/Modal";
import { closeModalImportKomoditi } from "@/redux/reducers/komoditiReducer";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { useForm, usePage } from "@inertiajs/react";
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
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";

/**
 * Komponen modal untuk import data kode komoditi
 */
const ModalImportKomoditi = () => {
  const komoditi = useSelector((state) => state.komoditi);
  const dispatch = useDispatch();
  const { app } = usePage().props;
  const { params } = app.url;

  // form data
  const form = useForm({
    file: "",
  });

  // state
  const [downloading, setDownloading] = useState(false);
  const [errors, setErrors] = useState([]);

  /**
   * Update form data
   */
  useEffect(() => {
    form.setData("file", "");
    form.clearErrors();
    setErrors([]);
  }, [komoditi.import.open]);

  /**
   * fungsi untuk menutup modal
   */
  const handleClose = useCallback(() => {
    if (!form.processing) {
      dispatch(closeModalImportKomoditi());
    }
  }, [form, dispatch]);

  /**
   * fungsii untuk download template import
   */
  const handleDownloadTemplateImport = async () => {
    setDownloading(true);

    try {
      const response = await axios({
        method: "get",
        url: route("komoditi.import.template"),
        responseType: "blob",
      });

      if (response.status === 200) {
        saveAs(response.data, "template_import_kode_komoditi.xlsx");
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
          message: "Terjadi kesalahan. Download template gagal.",
        })
      );
    }
  };

  /**
   * fungsi untuk mengatasi ketika form disis
   */
  const handleInputChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      form.setData(name, files[0]);
    }
  };

  /**
   * fungsi untuk mengatasi ketika form di-submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = route("komoditi.import", {
      _query: params,
    });

    form.post(url, {
      preserveScroll: true,
      onSuccess: () => {
        handleClose();
      },
      onError: (error) => {
        setErrors(Object.values(error));
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesalahan. import kode komoditi gagal.",
          })
        );
      },
    });
  };

  return (
    <Modal
      open={komoditi.import.open}
      title="Import Excel"
      onClose={handleClose}
      loading={form.processing}
      component="form"
      autoComplete="off"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <DialogContent dividers sx={{ py: 3 }}>
        <Grid container spacing={3}>
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
              color="primary"
              variant="contained"
              loading={downloading}
              disabled={form.processing}
              onClick={handleDownloadTemplateImport}
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
        >
          Tutup
        </Button>

        <LoadingButton
          type="submit"
          size="large"
          color="primary"
          variant="contained"
          loading={form.processing}
        >
          Import
        </LoadingButton>
      </DialogActions>
    </Modal>
  );
};

export default ModalImportKomoditi;
