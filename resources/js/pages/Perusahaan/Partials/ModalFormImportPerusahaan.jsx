import Modal from "@/components/Modal";
import usePerusahaan from "@/hooks/usePerusahaan";
import { useForm, usePage } from "@inertiajs/react";
import { Download } from "@mui/icons-material";
import { Button, DialogContent, Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen modal form import perusahaan.
 *
 * @returns {React.ReactElement}
 */
const ModalFormImportPerusahaan = () => {
  const { app } = usePage().props;
  const { params } = app.url;
  const { importExcel } = usePerusahaan();
  const dispatch = useDispatch();
  const perusahaan = useSelector((state) => state.perusahaan);

  /**
   * Form
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
   * fungsi untuk menutup modal
   */
  const handleClose = useCallback(() => {
    if (!form.processing) {
      importExcel.close();
    }
  }, [form, importExcel]);

  return (
    <Modal
      title="Import Excel"
      loading={form.processing}
      open={perusahaan.import.open}
      onClose={handleClose}
      component="form"
      autoComplete="off"
    >
      <DialogContent dividers sx={{ py: 3 }}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Button
              fullWidth
              type="button"
              color="secondary"
              variant="contained"
              startIcon={<Download />}
            >
              Download Template
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Modal>
  );
};

export default ModalFormImportPerusahaan;
