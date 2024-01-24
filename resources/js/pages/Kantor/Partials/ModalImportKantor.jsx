import Modal from "@/components/Modal";
import { closeModalImportKantor } from "@/redux/reducers/kantorReducer";
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
import { saveAs } from "file-saver";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const handleCloseModal = useCallback(() => {
    if (!form.processing) {
      dispatch(closeModalImportKantor());
      setErrors([]);
    }
  }, [form, setErrors]);

  /**
   * fungsi untuk download template import
   */
  const handleDownloadTemplate = useCallback(async () => {
    setDownloading(true);

    try {
      const response = await axios({
        method: "get",
        url: route("kantor.import.template"),
        responseType: "blob",
      });

      if (response.status === 200) {
        // simpan dan download template
        saveAs(response.data, "template_impor_kantor.xlsx");

        // hentikan loading dan tampilkan notifikasi.
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
  }, [setDownloading]);

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
      title="Import Kantor"
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
              onClick={handleDownloadTemplate}
            >
              Download Template
            </LoadingButton>
          </Grid>

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
          Import
        </LoadingButton>
      </DialogActions>
    </Modal>
  );
};

export default ModalImportKantor;
