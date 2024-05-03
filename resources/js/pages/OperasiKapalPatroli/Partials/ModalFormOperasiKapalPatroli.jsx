import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import Modal from "@/components/Modal";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { closeForm } from "@/redux/reducers/operasiKapalPatroliReducer";
import Kantor from "@/services/kantorService";
import dateFormat from "@/utils";
import { useForm, usePage } from "@inertiajs/react";
import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  Switch,
} from "@mui/material";
import dayjs from "dayjs";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const statusPengoperasianOptions = [
  {
    label: "Aktif",
    value: "Aktif",
  },
  {
    label: "Tidak Aktif",
    value: "Tidak Aktif",
  },
];

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
      setData({ ...data, _token: csrf });
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
      const { name, value, type } = e.target;
      setData(name, type === "checkbox" ? e.target.checked : value);
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
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "422 - Periksa kembali inputan anda.",
          })
        );
      },
    });
  }, [post, reset, params, dispatch]);

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
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "422 - Periksa kembali inputan anda.",
          })
        );
      },
    });
  }, [patch, data, params, handleClose, dispatch]);

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

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              type="text"
              label="Jenis Kapal"
              name="jenis_kapal"
              id="jenis_kapal"
              value={formData.jenis_kapal}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.jenis_kapal)}
              helperText={errors.jenis_kapal}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              type="text"
              label="Merk Tipe Mesin"
              name="merk_tipe_mesin"
              id="merk_tipe_mesin"
              value={formData.merk_tipe_mesin}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.merk_tipe_mesin)}
              helperText={errors.merk_tipe_mesin}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              type="number"
              label="Jumlah Mesin"
              name="jumlah_mesin"
              id="jumlah_mesin"
              value={formData.jumlah_mesin}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.jumlah_mesin)}
              helperText={errors.jumlah_mesin}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              type="number"
              label="Tahun Pembuatan"
              name="tahun_pembuatan"
              id="tahun_pembuatan"
              value={formData.tahun_pembuatan}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.tahun_pembuatan)}
              helperText={errors.tahun_pembuatan}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              type="number"
              label="Tahun Rehab"
              name="tahun_rehab"
              id="tahun_rehab"
              value={formData.tahun_rehab}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.tahun_rehab)}
              helperText={errors.tahun_rehab}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              type="text"
              label="Kondisi Badan Kapal"
              name="kondisi_badan_kapal"
              id="kondisi_badan_kapal"
              value={formData.kondisi_badan_kapal}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.kondisi_badan_kapal)}
              helperText={errors.kondisi_badan_kapal}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              type="text"
              label="Kondisi Mesin Kapal"
              name="kondisi_mesin_kapal"
              id="kondisi_mesin_kapal"
              value={formData.kondisi_mesin_kapal}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.kondisi_mesin_kapal)}
              helperText={errors.kondisi_mesin_kapal}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <SelectInput
              fullWidth
              label="Status Pengoperasian"
              name="status_pengoperasian"
              items={statusPengoperasianOptions}
              value={formData.status_pengoperasian}
              onChange={handleInputChange}
              disabled={processing}
              error={Boolean(errors.status_pengoperasian)}
              helperText={errors.status_pengoperasian}
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

          <Grid item xs={12} md={3}>
            <FormControlLabel
              label="Kondisi Aktif"
              control={
                <Switch
                  name="kondisi_aktif"
                  color="secondary"
                  checked={formData.kondisi_aktif}
                  onChange={handleInputChange}
                />
              }
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControlLabel
              label="Cetak Laporan"
              control={
                <Switch
                  name="cetak"
                  color="secondary"
                  checked={formData.cetak}
                  onChange={handleInputChange}
                />
              }
            />
          </Grid>
        </Grid>
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
});

export default ModalFormOperasiKapalPatroli;
