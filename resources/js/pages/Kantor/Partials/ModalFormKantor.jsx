import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useForm, usePage } from "@inertiajs/react";
import Modal from "@/components/Modal";
import { closeFormKantor } from "@/redux/reducers/kantorReducer";
import TextInput from "@/components/Input/TextInput";
import { LoadingButton } from "@mui/lab";
import { DialogContent, DialogActions, Button } from "@mui/material";
import { Close, Save } from "@mui/icons-material";

/**
 * Komponen partial untuk form create & edit data kantor.
 */
export default function ModalFormKantor(props) {
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.kantor);
  const { app } = usePage().props;
  const { params } = app.url;

  // form data
  const { data, setData, errors, processing, clearErrors, reset, post, patch } =
    useForm({ nama: form.data.nama });

  /**
   * Update form data jika ada perubahan pada redux state
   */
  React.useEffect(() => {
    setData("nama", form.data.nama);
    clearErrors();
  }, [form.open]);

  /**
   * fungsi untuk menangani ketika form diisi
   */
  const handleChange = React.useCallback(
    (e) => {
      setData(e.target.name, e.target.value);
    },
    [setData]
  );

  /**
   * Fungsi untuk menutup modal
   */
  const handleClose = React.useCallback(() => {
    if (!processing) dispatch(closeFormKantor());
  }, [dispatch, processing]);

  /**
   * fungsi untuk request create kantor
   */
  const handleUpdate = () => {
    const url = route("kantor.update", {
      kantor: form.data.id,
      _query: params,
    });

    patch(url, {
      preserveScroll: true,
      onSuccess: () => handleClose(),
    });
  };

  /**
   * fungsi untuk request create kantor
   */
  const handleCreate = () => {
    const url = route("kantor.store", {
      _query: params,
    });

    post(url, {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  /**
   * fungsi untuk submit form
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.type === "create") {
      handleCreate();
    } else {
      handleUpdate();
    }
  };

  return (
    <Modal
      open={form.open}
      title={form.type === "create" ? "Tambah kantor" : "Edit kantor"}
      onClose={handleClose}
      loading={processing}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <DialogContent dividers sx={{ py: 3 }}>
        <TextInput
          fullWidth
          label="Nama kantor"
          name="nama"
          value={data.nama}
          onChange={handleChange}
          disabled={processing}
          error={Boolean(errors.nama)}
          helperText={errors.nama}
        />
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          type="button"
          size="large"
          color="primary"
          variant="outlined"
          disabled={processing}
          onClick={handleClose}
          startIcon={<Close />}
        >
          Tutup
        </Button>

        <LoadingButton
          type="submit"
          size="large"
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
}
