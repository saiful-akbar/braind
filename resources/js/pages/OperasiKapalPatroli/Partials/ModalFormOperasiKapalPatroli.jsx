import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import TimeInput from "@/components/Input/TimeInput";
import Modal from "@/components/Modal";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { closeForm } from "@/redux/reducers/operasiKapalPatroliReducer";
import Kantor from "@/services/kantorService";
import dateFormat, { timeFormat } from "@/utils";
import { useForm, usePage } from "@inertiajs/react";
import { Close, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent, Grid } from "@mui/material";
import dayjs from "dayjs";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen modal form untuk data sarana kapal patroli.
 *
 * @returns {React.ReactElement}
 */
const ModalFormOperasiKapalPatroli = memo(() => {
  const { open, type, title, data } = useSelector(
    (state) => state.operasiKapalPatroli.form
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
   * sarana operasi kapal patroli ke database.
   */
  const handleStore = useCallback(() => {
    const url = route("operasi-kapal-patroli.store", {
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
   * sarana operasi kapal patroli ke database.
   */
  const handleUpdate = useCallback(() => {
    const url = route("operasi-kapal-patroli.update", {
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
              label="Nomor Lambung"
              name="nomor_lambung"
              id="nomor_lambung"
              value={formData.nomor_lambung}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.nomor_lambung)}
              helperText={errors.nomor_lambung}
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
              label="Nomor SPB"
              name="nomor_spb"
              id="nomor_spb"
              value={formData.nomor_spb}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.nomor_spb)}
              helperText={errors.nomor_spb}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DateInput
              fullWidth
              required
              label="Tanggal SPB"
              value={dayjs(data.tanggal_spb)}
              disabled={processing}
              error={Boolean(errors.tanggal_spb)}
              helperText={errors.tanggal_spb}
              onChange={(value) => handleDateInputChange("tanggal_spb", value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="text"
              label="Penerbit SPB"
              name="penerbit_spb"
              id="penerbit_spb"
              value={formData.penerbit_spb}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.penerbit_spb)}
              helperText={errors.penerbit_spb}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="Jumlah Hari"
              name="jumlah_hari"
              id="jumlah_hari"
              value={formData.jumlah_hari}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.jumlah_hari)}
              helperText={errors.jumlah_hari}
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

export default ModalFormOperasiKapalPatroli;
