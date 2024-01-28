import Modal from "@/components/Modal";
import useSbp from "@/hooks/useSbp";
import { useForm } from "@inertiajs/react";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ModalFormImportSbp = () => {
  const { open } = useSelector((state) => state.sbp.import);
  const { closeForm } = useSbp().import;

  /**
   * form data
   */
  const { setData, processing, post, errors, clearErrors, reset } = useForm({
    file: "",
  });

  /**
   * fungsi untuk menutup modal
   */
  const handleClose = useCallback(() => {
    if (!processing) closeForm();
  }, [processing, closeForm]);

  /**
   * fungsi untuk mengatasi ketika form diisi
   */
  const handleInputChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      setData(name, files[0]);
    }
  };

  return (
    <Modal title="Import Excel" maxWidth="sm" open={open} onClose={handleClose}>
      <DialogContent dividers sx={{ py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <LoadingButton
              fullWidth
              type="button"
              color="primary"
              variant="contained"
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
        <Button
          type="button"
          color="primary"
          variant="outlined"
          size="large"
          onClick={handleClose}
          disabled={processing}
        >
          Tutup
        </Button>

        <LoadingButton
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          loading={processing}
        >
          Import
        </LoadingButton>
      </DialogActions>
    </Modal>
  );
};

export default ModalFormImportSbp;
