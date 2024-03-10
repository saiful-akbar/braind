import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import Modal from "@/components/Modal";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { closeForm } from "@/redux/reducers/operasiAlatPemindaiReducer";
import Kantor from "@/services/kantorService";
import dateFormat, { timeFormat } from "@/utils";
import { useForm, usePage } from "@inertiajs/react";
import { Close, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent, Grid } from "@mui/material";
import dayjs from "dayjs";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const tampilanOptions = [
  {
    label: "Tunggal",
    value: "tunggal",
  },
  {
    label: "Ganda",
    value: "ganda",
  },
];

/**
 * Komponen modal form data sarana alat pemindai.
 *
 * @returns {React.ReactElement}
 */
const ModalFormOperasiAlatPemindai = memo(() => {
  const { open, type, title, data } = useSelector(
    (state) => state.operasiAlatPemindai.form
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
  } = useForm({ ...data, _token: csrf });

  /**
   * State
   */
  const [kantor, setKantor] = useState([]);
  const [komoditi, setKomoditi] = useState([]);

  /**
   * Ambil data kantor dan penindakan.
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
      clearErrors();
      setData({ ...data, _token: csrf });
    }
  }, [open]);

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
      const { name, value } = e.target;
      setData(name, value);
    },
    [setData]
  );

  /**
   * fungsi untuk mengatasi ketika form date diisi
   */
  const handleDateInputChange = useCallback(
    (name, value) => {
      setData(name, dateFormat(value));
    },
    [setData]
  );

  /**
   * fungsi untuk menambah data sarana operasi alat pemindai ke database
   */
  const handleStore = useCallback(() => {
    const url = route("operasi-alat-pemindai.store", {
      _query: params,
    });

    post(url, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => reset(),
    });
  }, [post, reset, params]);

  /**
   * fungsi untuk memperbarui data sarana operasi alat pemindai ke database.
   */
  const handleUpdate = useCallback(() => {
    const url = route("operasi-alat-pemindai.update", {
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
              label="Pemindai"
              name="pemindai"
              id="pemindai"
              value={formData.pemindai}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.pemindai)}
              helperText={errors.pemindai}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="text"
              label="Nama Alat"
              name="nama_alat"
              id="nama_alat"
              value={formData.nama_alat}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.nama_alat)}
              helperText={errors.nama_alat}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="text"
              label="Ukuran"
              name="ukuran"
              id="ukuran"
              value={formData.ukuran}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.ukuran)}
              helperText={errors.ukuran}
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
              label="Nomor Seri"
              name="nomor_seri"
              id="nomor_seri"
              value={formData.nomor_seri}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.nomor_seri)}
              helperText={errors.nomor_seri}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <SelectInput
              fullWidth
              required
              label="Tampilan"
              name="tampilan"
              items={tampilanOptions}
              value={formData.tampilan}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.tampilan)}
              helperText={errors.tampilan}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="Tahun Perolehan"
              name="tahun_perolehan"
              id="tahun_perolehan"
              value={formData.tahun_perolehan}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.tahun_perolehan)}
              helperText={errors.tahun_perolehan}
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
              label="Jam Operasi"
              name="jam_operasi"
              id="jam_operasi"
              value={formData.jam_operasi}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.jam_operasi)}
              helperText={errors.jam_operasi}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="text"
              label="Jam Pemindaian"
              name="jam_pemindaian"
              id="jam_pemindaian"
              value={formData.jam_pemindaian}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.jam_pemindaian)}
              helperText={errors.jam_pemindaian}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="Jumlah Pemindaian"
              name="jumlah_pemindaian"
              id="jumlah_pemindaian"
              value={formData.jumlah_pemindaian}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.jumlah_pemindaian)}
              helperText={errors.jumlah_pemindaian}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="text"
              label="Hasil Keluaran"
              name="hasil_keluaran"
              id="hasil_keluaran"
              value={formData.hasil_keluaran}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.hasil_keluaran)}
              helperText={errors.hasil_keluaran}
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

export default ModalFormOperasiAlatPemindai;
