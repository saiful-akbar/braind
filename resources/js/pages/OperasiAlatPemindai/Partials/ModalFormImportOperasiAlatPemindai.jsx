import Modal from "@/components/Modal";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { closeFormlImport } from "@/redux/reducers/operasiAlatPemindaiReducer";
import { useForm, usePage } from "@inertiajs/react";
import { Download, Upload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen modal form import excel data sarana oprasi alat pemindai.
 */
const ModalFormImportOperasiAlatPemindai = memo(() => {
  const { app } = usePage().props;
  const { params } = app.url;
  const { open } = useSelector((state) => state.operasiAlatPemindai.import);
  const dispatch = useDispatch();

  // state
  const [downloading, setDownloading] = useState(false);

  // form data
  const { setData, errors, processing, post } = useForm({
    file: "",
    _token: app.csrf,
  });

  // state
  const [rowErrors, setRowErrors] = useState([]);

  /**
   * Bersihkan error saat modal dibuka
   */
  useEffect(() => {
    if (open) {
      setRowErrors([]);
    }
  }, [open]);

  /**
   * fungsi untuk menutup modal
   */
  const handleClose = useCallback(() => {
    if (!processing) {
      dispatch(closeFormlImport());
      setRowErrors([]);
    }
  }, [processing, setRowErrors]);

  /**
   * fungsi untuk download template import
   */
  const handleDownloadTemplate = useCallback(async () => {
    setDownloading(true);

    try {
      const response = await axios({
        method: "get",
        url: route("operasi-alat-pemindai.import.template"),
        responseType: "blob",
      });

      if (response.status === 200) {
        saveAs(response.data, "template_import_operasi_alat_pemindai.xlsx");
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
  }, [setDownloading, dispatch]);

  /**
   * fungsi untuk menangani ketika form diisi
   */
  const handleInputChange = useCallback(
    (e) => {
      const { files, name } = e.target;

      if (files.length > 0) {
        setData(name, files[0]);
      }
    },
    [setData]
  );

  /**
   * fungsi untuk menangani ketika form di-submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = route("operasi-alat-pemindai.import", {
      _query: params,
    });

    post(url, {
      preserveScroll: true,
      onStart: () => setRowErrors([]),
      onSuccess: () => handleClose(),
      onError: (error) => {
        setRowErrors(Object.values(error));
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
      open={open}
      onClose={handleClose}
      loading={processing}
      maxWidth="sm"
      component="form"
      autoComplete="off"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <DialogContent dividers sx={{ py: 3 }}>
        <Grid container spacing={5}>
          {rowErrors.length > 0 && (
            <Grid item xs={12}>
              <Alert severity="error" icon={false}>
                <Box component="ul" sx={{ paddingInlineStart: 2 }}>
                  {rowErrors.map((rowError, index) => (
                    <li key={index}>{rowError}</li>
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
              disabled={processing}
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
              disabled={processing}
              error={Boolean(errors.file)}
              helperText={errors.file}
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
          loading={processing}
          startIcon={<Upload />}
        >
          Impor
        </LoadingButton>
      </DialogActions>
    </Modal>
  );
});

export default ModalFormImportOperasiAlatPemindai;
