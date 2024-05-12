import Modal from "@/components/Modal";
import { openNotification } from "@/redux/reducers/notificationReducer";
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
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

/**
 * Komponen partial perusahaan cukai HT + HPTL untuk import excel.
 *
 * @returns {React.ReactElement}
 */
const ImportExcel = ({ open, onClose, ...rest }) => {
  const dispatch = useDispatch();
  const { app } = usePage().props;
  const { params } = app.url;
  const form = useForm({ file: "" });

  // state
  const [errors, setErrors] = useState([]);
  const [downloading, setDownloading] = useState(false);

  /**
   * bersihkan form saat modal dibuka
   */
  useEffect(() => {
    form.reset();
    form.clearErrors();
    setErrors([]);
  }, [open]);

  /**
   * fungsi untuk menutup modal dialog
   */
  const handleClose = useCallback(() => {
    if (!form.processing) onClose();
  }, [form.processing]);

  /**
   * fungsi untuk download template import
   */
  const handleDownloadTemplate = useCallback(async () => {
    setDownloading(true);

    try {
      const response = await axios({
        method: "get",
        url: route("perusahaan-hthptl.import.template"),
        responseType: "blob",
      });

      if (response.status === 200) {
        setDownloading(false);
        saveAs(response.data, "template_impor_perusahaan_cukai_ht_hptl.xlsx");
        dispatch(
          openNotification({
            status: "success",
            message: "Template berhasil diunduh.",
          })
        );
      }
    } catch (error) {
      setDownloading(false);
      dispatch(
        openNotification({
          status: "error",
          message: "Terjadi kesalahan, template gagal diunduh.",
        })
      );
    }
  }, [dispatch, setDownloading]);

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
    form.clearErrors();
    setErrors([]);

    const url = route("perusahaan-hthptl.import", {
      _query: {
        ...params,
      },
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
            message: "Terjadi kesahan, impor gagal.",
          })
        );
      },
    });
  };

  return (
    <Modal
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
              startIcon={<Download />}
            >
              Download Template
            </LoadingButton>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              required
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
          startIcon={<Upload />}
        >
          Impor
        </LoadingButton>
      </DialogActions>
    </Modal>
  );
};

/**
 * Prop types
 */
ImportExcel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImportExcel;
