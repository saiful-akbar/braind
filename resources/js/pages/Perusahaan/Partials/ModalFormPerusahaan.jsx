import TextInput from "@/components/Input/TextInput";
import Modal from "@/components/Modal";
import usePerusahaan from "@/hooks/usePerusahaan";
import { closeFormPerusahaan } from "@/redux/reducers/perusahaanReducer";
import { useForm, usePage } from "@inertiajs/react";
import { Close, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent } from "@mui/material";
import React, { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen modal form create & update master perusahaan.
 *
 * @returns {React.ReactElement}
 */
const ModalFormPerusahaan = () => {
  const dispatch = useDispatch();
  const { open, type, data } = useSelector((state) => state.perusahaan.form);
  const { modalForm } = usePerusahaan();
  const { app } = usePage().props;

  /**
   * Form data
   */
  const form = useForm({
    ...data,
    _token: app.csrf,
  });

  /**
   * Update form & hapus error saat modal dibuka
   */
  useEffect(() => {
    form.setData({ ...data, _token: app.csrf });
    form.clearErrors();
  }, [open]);

  /**
   * fungsi untuk menutup modal.
   * NB: modal hanya bisa di tutup jika tidak ada proses yang berjalan.
   */
  const handleClose = useCallback(() => {
    if (!form.processing) {
      modalForm.close();
    }
  }, [dispatch, form, modalForm]);

  /**
   * Fungsi untuk mengatasi ketika form di-submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "create") {
      modalForm.store(form);
    } else {
      modalForm.update(form);
    }
  };

  return (
    <Modal
      open={open}
      title={type === "create" ? "Tambah Perusahaan" : "Edit Perusahaan"}
      onClose={handleClose}
      loading={form.processing}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <DialogContent dividers sx={{ py: 3 }}>
        <TextInput
          fullWidth
          required
          autoFocus
          type="text"
          label="Nama Perusahaan"
          name="nama"
          id="nama"
          value={form.data.nama}
          onChange={(e) => form.setData(e.target.name, e.target.value)}
          disabled={form.processing}
          error={Boolean(form.errors.nama)}
          helperText={form.errors.nama}
        />
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
          startIcon={<Save />}
        >
          Simpan
        </LoadingButton>
      </DialogActions>
    </Modal>
  );
};

export default ModalFormPerusahaan;
