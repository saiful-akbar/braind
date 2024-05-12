import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import Modal from "@/components/Modal";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { closeForm } from "@/redux/reducers/penerimaanReducer";
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
 * Komponen modal form data penerimaan.
 *
 * @returns {React.ReactElement}
 */
const ModalFormPenerimaan = memo(() => {
  const { open, type, title, data } = useSelector(
    (state) => state.penerimaan.form
  );

  const dispatch = useDispatch();
  const { app, access, auth } = usePage().props;
  const { params } = app.url;
  const { csrf } = app;
  const { user } = auth;

  /**
   * Form data
   */
  const form = useForm({ ...data, _token: csrf });

  /**
   * State
   */
  const [kantor, setKantor] = useState([]);

  /**
   * Ambil data kantor dan penerimaan.
   */
  useEffect(() => {
    const getAllKantor = async () => {
      try {
        const response = await Kantor.getAll();

        setKantor(
          response.data.map(({ nama, id }) => ({
            label: nama,
            value: id,
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

    if (access.create || access.update) {
      getAllKantor();
    }
  }, []);

  /**
   * Update value pada form saat modal dibuka
   */
  useEffect(() => {
    if (open) {
      form.clearErrors();
      form.setData({ ...data, _token: csrf });
    }
  }, [open]);

  /**
   * fungsi untuk menutup modal
   */
  const handleClose = useCallback(() => {
    if (!form.processing) {
      dispatch(closeForm());
    }
  }, [dispatch, form]);

  /**
   * fungsi untuk menangani ketika form diisi.
   */
  const handleInputChange = useCallback(
    (e) => {
      form.setData(e.target.name, e.target.value);
    },
    [form.setData]
  );

  /**
   * fungsi untuk mengatasi ketika form date diisi
   */
  const handleDateInputChange = useCallback(
    (value) => {
      form.setData("tanggal_input", dateFormat(value));
    },
    [form]
  );

  /**
   * fungsi untuk menambah data penerimaan ke database
   */
  const handleStore = useCallback(() => {
    const url = route("penerimaan.store", {
      _query: params,
    });

    form.post(url, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => form.reset(),
    });
  }, [form, params]);

  /**
   * fungsi untuk memperbarui data penerimaan ke database.
   */
  const handleUpdate = useCallback(() => {
    const url = route("penerimaan.update", {
      penerimaan: data.id,
      _query: params,
    });

    form.patch(url, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => handleClose(),
    });
  }, [form, data, params, handleClose]);

  /**
   * fungsi untuk menangani ketika form di submit
   */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

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
      loading={form.processing}
      onClose={handleClose}
      maxWidth="md"
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
                id="kantor_id"
                items={kantor}
                value={form.data.kantor_id}
                onChange={handleInputChange}
                disabled={form.processing}
                error={Boolean(form.errors.kantor_id)}
                helperText={form.errors.kantor_id}
              />
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="Target Bea Masuk"
              name="target_bea_masuk"
              id="target_bea_masuk"
              value={form.data.target_bea_masuk}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.target_bea_masuk)}
              helperText={form.errors.target_bea_masuk}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="Realisasi Bea Masuk"
              name="realisasi_bea_masuk"
              id="realisasi_bea_masuk"
              value={form.data.realisasi_bea_masuk}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.realisasi_bea_masuk)}
              helperText={form.errors.realisasi_bea_masuk}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="Target Bea Keluar"
              name="target_bea_keluar"
              id="target_bea_keluar"
              value={form.data.target_bea_keluar}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.target_bea_keluar)}
              helperText={form.errors.target_bea_keluar}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="Realisasi Bea Keluar"
              name="realisasi_bea_keluar"
              id="realisasi_bea_keluar"
              value={form.data.realisasi_bea_keluar}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.realisasi_bea_keluar)}
              helperText={form.errors.realisasi_bea_keluar}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="Target Cukai"
              name="target_cukai"
              id="target_cukai"
              value={form.data.target_cukai}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.target_cukai)}
              helperText={form.errors.target_cukai}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="Realisasi Cukai"
              name="realisasi_cukai"
              id="realisasi_cukai"
              value={form.data.realisasi_cukai}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.realisasi_cukai)}
              helperText={form.errors.realisasi_cukai}
            />
          </Grid>

          {user.admin && (
            <Grid item xs={12} md={6}>
              <DateInput
                fullWidth
                label="Tanggal Input"
                value={dayjs(form.data.tanggal_input)}
                onChange={handleDateInputChange}
                disabled={form.processing}
                error={Boolean(form.errors.tanggal_input)}
                helperText={form.errors.tanggal_input}
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <LoadingButton
          type="submit"
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
});

export default ModalFormPenerimaan;
