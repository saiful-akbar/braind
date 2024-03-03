import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import Modal from "@/components/Modal";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { closeForm } from "@/redux/reducers/operasiLainnyaReducer";
import Kantor from "@/services/kantorService";
import dateFormat from "@/utils";
import { useForm, usePage } from "@inertiajs/react";
import { Close, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent, Grid } from "@mui/material";
import dayjs from "dayjs";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen modal form untuk data sarana lainnya.
 *
 * @returns {React.ReactElement}
 */
const ModalFormOperasiLainnya = memo(() => {
  const { open, type, title, data } = useSelector(
    (state) => state.operasiLainnya.form
  );

  const dispatch = useDispatch();
  const { app, access, auth } = usePage().props;
  const { params } = app.url;
  const { csrf } = app;
  const { user } = auth;

  /**
   * Form data
   */
  const {
    data: formData,
    setData,
    processing,
    errors,
    clearErrors,
    reset,
    post,
    patch,
  } = useForm({
    ...data,
    _token: csrf,
  });

  /**
   * State
   */
  const [kantor, setKantor] = useState([]);

  /**
   * Ambil data kantor untuk dijadikan select options.
   */
  useEffect(() => {
    const getAllKantor = async () => {
      try {
        const response = await Kantor.getAll();

        setKantor(
          response.data.map((kantor) => ({
            label: kantor.nama,
            value: kantor.id,
          }))
        );
      } catch (error) {
        dispatch(
          openNotification({
            status: "error",
            message: `${error.status} - Gagal mengambil data kantor.`,
          })
        );
      }
    };

    // request data kantor hanya jika user
    // memiliki akses create atau update.
    if (access.create || access.update) {
      getAllKantor();
    }
  }, []);

  /**
   * Update value pada form saat modal dibuka
   */
  useEffect(() => {
    if (open) {
      clearErrors();

      setData({
        ...data,
        _token: csrf,
      });
    }
  }, [open]);

  /**
   * fungsi untuk menutup modal
   */
  const handleClose = useCallback(() => {
    if (!processing) dispatch(closeForm());
  }, [dispatch, processing]);

  /**
   * fungsi untuk menangani ketika form diisi.
   */
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData(name, value);
    },
    [setData]
  );

  /**
   * fungsi untuk mengatasi ketika form date diisi
   */
  const handleDateInputChange = useCallback(
    (name, dateValue) => {
      setData(name, dateFormat(dateValue));
    },
    [setData]
  );

  /**
   * fungsi request untuk menambah data
   * sarana operasi lainnya ke database.
   */
  const handleStore = useCallback(() => {
    const url = route("operasi-lainnya.store", {
      _query: params,
    });

    post(url, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => reset(),
    });
  }, [post, reset, params]);

  /**
   * fungsi request untuk memperbarui data
   * sarana operasi lainnya ke database.
   */
  const handleUpdate = useCallback(() => {
    const url = route("operasi-lainnya.update", {
      operasi: data.id,
      _query: params,
    });

    patch(url, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => handleClose(),
    });
  }, [patch, data, params, handleClose]);

  /**
   * fungsi untuk menangani ketika form di submit
   */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // pastikan type dan akses user sesuai
      // dengan aksi yang dilakukan.
      if (type === "create" && access.create) {
        handleStore();
      } else if (type === "edit" && access.update) {
        handleUpdate();
      }
    },
    [handleStore, handleUpdate, type, access]
  );

  return (
    <Modal
      open={open}
      title={title}
      loading={processing}
      onClose={handleClose}
      maxWidth="lg"
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <DialogContent dividers sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {user.admin && (
            <Grid item xs={12} md={6}>
              <SelectInput
                fullWidth
                label="ID Kantor"
                name="kantor_id"
                items={kantor}
                value={formData.kantor_id}
                onChange={handleInputChange}
                disabled={processing}
                error={Boolean(errors.kantor_id)}
                helperText={errors.kantor_id}
              />
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="text"
              label="Jenis Operasi"
              name="jenis_operasi"
              id="jenis_operasi"
              value={formData.jenis_operasi}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.jenis_operasi)}
              helperText={errors.jenis_operasi}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="text"
              label="Merek"
              name="merek"
              id="merek"
              value={formData.merek}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.merek)}
              helperText={errors.merek}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="text"
              label="Tipe"
              name="tipe"
              id="tipe"
              value={formData.tipe}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.tipe)}
              helperText={errors.tipe}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="text"
              label="Lokasi Penempatan"
              name="lokasi_penempatan"
              id="lokasi_penempatan"
              value={formData.lokasi_penempatan}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.lokasi_penempatan)}
              helperText={errors.lokasi_penempatan}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="text"
              label="Kondisi"
              name="kondisi"
              id="kondisi"
              value={formData.kondisi}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.kondisi)}
              helperText={errors.kondisi}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="text"
              label="Catatan"
              name="catatan"
              id="catatan"
              value={formData.catatan}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.catatan)}
              helperText={errors.catatan}
            />
          </Grid>

          {user.admin && (
            <Grid item xs={12} md={6}>
              <DateInput
                fullWidth
                label="Tanggal Input"
                value={dayjs(data.tanggal_input)}
                disabled={processing}
                error={Boolean(errors.tanggal_input)}
                helperText={errors.tanggal_input}
                onChange={(value) =>
                  handleDateInputChange("tanggal_input", value)
                }
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          type="button"
          color="primary"
          variant="outlined"
          size="large"
          disabled={processing}
          onClick={handleClose}
          startIcon={<Close />}
        >
          Tutup
        </Button>

        <LoadingButton
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          loading={processing}
          startIcon={<Save />}
        >
          Simpan
        </LoadingButton>
      </DialogActions>
    </Modal>
  );
});

export default ModalFormOperasiLainnya;
