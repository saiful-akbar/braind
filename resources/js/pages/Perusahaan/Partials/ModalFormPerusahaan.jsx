import TextInput from "@/components/Input/TextInput";
import Modal from "@/components/Modal";
import { closeForm } from "@/redux/reducers/perusahaanReducer";
import { useForm, usePage } from "@inertiajs/react";
import { AccessTimeSharp, Close, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen modal form master perusahaan.
 *
 * @returns {React.ReactElement}
 */
const ModalFormPerusahaan = () => {
  const perusahaan = useSelector((state) => state.perusahaan);
  const dispatch = useDispatch();
  const { app, access } = usePage().props;
  const { params } = app.url;

  /**
   * Form data
   */
  const { data, setData, processing, errors, clearErrors, post, patch, reset } =
    useForm({
      ...perusahaan.form.data,
      _token: app.csrf,
    });

  /**
   * Update form data saat modal dibuka
   */
  useEffect(() => {
    clearErrors();
    setData({
      ...perusahaan.form.data,
      _token: app.csrf,
    });
  }, [perusahaan.form.open]);

  /**
   * fungsi untuk menutup modal
   */
  const handleClose = useCallback(() => {
    if (!processing) {
      dispatch(closeForm());
    }
  }, [dispatch, processing]);

  /**
   * fungsi untuk menangani ketika form diisi.
   */
  const handleInputChange = useCallback(
    (e) => {
      setData(e.target.name, e.target.value);
    },
    [setData]
  );

  /**
   * fungsi untuk menambah data perusahaan ke database
   */
  const handleStore = useCallback(() => {
    const url = route(`master-perusahaan.${perusahaan.form.type}`, {
      _query: params,
    });

    post(url, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => reset(),
    });
  }, [post, perusahaan, params, reset]);

  /**
   * fungsi untuk memperbarui data perusahaan ke database.
   */
  const handleUpdate = useCallback(() => {
    const url = route(`master-perusahaan.${perusahaan.form.type}`, {
      perusahaan: perusahaan.form.data.id,
      _query: params,
    });

    patch(url, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        handleClose();
      },
    });
  }, [patch, perusahaan, params, handleClose, access]);

  /**
   * fungsi untuk menangani ketika form di submit
   */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { type } = perusahaan.form;

      if (type === "store" && access.create) {
        handleStore();
      } else if (type === "update" && access.update) {
        handleUpdate();
      }
    },
    [handleStore, handleUpdate, perusahaan, access]
  );

  return (
    <Modal
      title={perusahaan.form.title}
      open={perusahaan.form.open}
      loading={processing}
      onClose={handleClose}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <DialogContent dividers sx={{ p: 3 }}>
        <TextInput
          fullWidth
          required
          type="text"
          label="Nama Perusahaan"
          name="nama"
          id="nama"
          value={data.nama}
          disabled={processing}
          onChange={handleInputChange}
          error={Boolean(errors.nama)}
          helperText={errors.nama}
        />
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <LoadingButton
          type="submit"
          color="primary"
          variant="contained"
          loading={processing}
          startIcon={<Save />}
        >
          Simpan
        </LoadingButton>
      </DialogActions>
    </Modal>
  );
};

export default ModalFormPerusahaan;
