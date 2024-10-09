import TextInput from "@/components/Input/TextInput";
import Modal from "@/components/Modal";
import { closeFormEkspedisi } from "@/redux/reducers/ekspedisiReducer";
import { useForm, usePage } from "@inertiajs/react";
import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen partials modal form create & edit ekspedisi.
 *
 * @returns {React.ReactElement}
 */
const ModalFormEkspedisi = () => {
  const { app } = usePage().props;
  const { csrf } = app;
  const { form } = useSelector((state) => state.ekspedisi);
  const dispatch = useDispatch();

  // form
  const { processing, data, setData, post, patch, errors, setError } = useForm({
    _token: csrf,
    id: form.data.id,
    nama: form.data.nama,
  });

  /**
   * Fungsi untuk menutup modal
   */
  const handleClose = () => {
    if (!processing) {
      dispatch(closeFormEkspedisi());
    }
  };

  /**
   * Fungsi untuk menangani ketika form diisi
   *
   * @param {EventListenerObject} e
   */
  const handleInputChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  /**
   * Fungsi untuk menangani ketika form disubmit.
   *
   * @param {EventListener} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("submit");
  };

  return (
    <Modal
      open={form.open}
      loading={processing}
      title={form.type === "create" ? "Tambah Ekspedisi" : "Edit Ekspedisi"}
      onClose={handleClose}
      component="form"
      onSubmit={handleSubmit}
    >
      <DialogContent dividers sx={{ py: 3 }}>
        <TextInput
          required
          fullWidth
          type="text"
          name="nama"
          label="Nama Ekspedisi"
          value={data.nama}
          onChange={handleInputChange}
          error={Boolean(errors.nama)}
          helperText={errors.nama}
        />
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<Save />}
          loading={processing}
        >
          Simpan
        </LoadingButton>
      </DialogActions>
    </Modal>
  );
};

export default ModalFormEkspedisi;
