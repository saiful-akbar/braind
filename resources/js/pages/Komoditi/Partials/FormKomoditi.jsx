import TextInput from "@/components/Input/TextInput";
import Modal from "@/components/Modal";
import { closeFormKomoditi } from "@/redux/reducers/komoditiReducer";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { useForm, usePage } from "@inertiajs/react";
import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { DialogActions, DialogContent } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen partials untuk form komoditi
 */
const FormKomoditi = React.memo(() => {
  const komoditi = useSelector((state) => state.komoditi);
  const dispatch = useDispatch();
  const { app } = usePage().props;
  const { params } = app.url;

  // form data
  const { data, setData, processing, errors, clearErrors, reset, post, patch } =
    useForm(komoditi.form.data);

  /**
   * Update form saat modal dibuka
   */
  React.useEffect(() => {
    setData(komoditi.form.data);
    clearErrors();
  }, [komoditi.form.open]);

  /**
   * fungsi untuk menutup dialog modal.
   */
  const handleClose = () => {
    if (!processing) {
      dispatch(closeFormKomoditi());
    }
  };

  /**
   * fungsi untuk menangani ketika form diisi.
   */
  const handleChange = React.useCallback(
    (e) => {
      setData(e.target.name, e.target.value);
    },
    [setData]
  );

  /**
   * fungsi untuk menyimpan data komoditi baru
   */
  const handleCreate = () => {
    const url = route("komoditi.store", {
      _query: params,
    });

    post(url, {
      preserveScroll: true,
      onSuccess: () => {
        reset();
      },
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesalahan, periksa kembali inpurtan anda.",
          })
        );
      },
    });
  };

  /**
   * Fungsi untuk fetch update data komoditi
   */
  const handleUpdate = () => {
    const url = route("komoditi.update", {
      komoditi: data.id,
      _query: params,
    });

    patch(url, {
      preserveScroll: true,
      onSuccess: () => {
        handleClose();
      },
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesalahan, periksa kembali inputan anda.",
          })
        );
      },
    });
  };

  /**
   * Fungsi untuk menangani ketika form di-submit
   */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (komoditi.form.type === "create") {
        handleCreate();
      } else {
        handleUpdate();
      }
    },
    [handleCreate, komoditi, handleUpdate]
  );

  return (
    <Modal
      open={komoditi.form.open}
      maxWidth="sm"
      onClose={handleClose}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
      loading={processing}
      title={
        komoditi.form.type === "create"
          ? "Tambah kode komoditi"
          : "Edit kode komoditi"
      }
    >
      <DialogContent dividers sx={{ py: 3 }}>
        <TextInput
          fullWidth
          required
          label="Kode Komoditi"
          name="kode"
          value={data.kode}
          onChange={handleChange}
          disabled={processing}
          error={Boolean(errors.kode)}
          helperText={errors.kode}
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
});

export default FormKomoditi;
