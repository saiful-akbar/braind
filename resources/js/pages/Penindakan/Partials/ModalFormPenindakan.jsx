import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import Modal from "@/components/Modal";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { closeForm } from "@/redux/reducers/penindakanReducer";
import Komoditi from "@/services/KomoditiService";
import Kantor from "@/services/kantorService";
import dateFormat from "@/utils";
import { useForm, usePage } from "@inertiajs/react";
import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { DialogActions, DialogContent, Grid } from "@mui/material";
import dayjs from "dayjs";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen modal form data penindakan.
 *
 * @returns {React.ReactElement}
 */
const ModalFormPenindakan = memo(() => {
  const { open, type, title, data } = useSelector(
    (state) => state.penindakan.form
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

    const getAllKomoditi = async () => {
      try {
        const response = await Komoditi.getAll();

        setKomoditi(
          response.data.map(({ kode }) => ({
            label: kode,
            value: kode,
          }))
        );
      } catch (error) {
        dispatch(
          openNotification({
            status: "error",
            message: `${error.status} - Gagal mengambil data komoditi.`,
          })
        );
      }
    };

    if (access.create || access.update) {
      getAllKantor();
      getAllKomoditi();
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
    (name, value) => {
      form.setData(name, dateFormat(value));
    },
    [form]
  );

  /**
   * fungsi untuk menambah data penindakan ke database
   */
  const handleStore = useCallback(() => {
    const url = route("penindakan.store", {
      _query: params,
    });

    form.post(url, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => form.reset(),
    });
  }, [form, params]);

  /**
   * fungsi untuk memperbarui data penindakan ke database.
   */
  const handleUpdate = useCallback(() => {
    const url = route("penindakan.update", {
      penindakan: data.id,
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
      maxWidth="md"
      title={title}
      loading={form.processing}
      onClose={handleClose}
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
              type="text"
              label="KPPBC"
              name="kppbc"
              id="kppbc"
              value={form.data.kppbc}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.kppbc)}
              helperText={form.errors.kppbc}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="text"
              label="Nomor SBP"
              name="nomor_sbp"
              id="nomor_sbp"
              value={form.data.nomor_sbp}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.nomor_sbp)}
              helperText={form.errors.nomor_sbp}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DateInput
              fullWidth
              required
              label="Tanggal SBP"
              value={dayjs(form.data.tanggal_sbp)}
              onChange={(value) => handleDateInputChange("tanggal_sbp", value)}
              disabled={form.processing}
              error={Boolean(form.errors.tanggal_sbp)}
              helperText={form.errors.tanggal_sbp}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <SelectInput
              fullWidth
              required
              label="Kode Komoditi"
              name="kode_komoditi"
              id="kode_komoditi"
              items={komoditi}
              value={form.data.kode_komoditi}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.kode_komoditi)}
              helperText={form.errors.kode_komoditi}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="Jumlah"
              name="jumlah"
              id="jumlah"
              value={form.data.jumlah}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.jumlah)}
              helperText={form.errors.jumlah}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="text"
              label="Uraian Detail Barang"
              name="uraian"
              id="uraian"
              value={form.data.uraian}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.uraian)}
              helperText={form.errors.uraian}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="Perkiraan Nilai Barang"
              name="perkiraan_nilai_barang"
              id="perkiraan_nilai_barang"
              value={form.data.perkiraan_nilai_barang}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.perkiraan_nilai_barang)}
              helperText={form.errors.perkiraan_nilai_barang}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="Potensi Kurang Bayar"
              name="potensi_kurang_bayar"
              id="potensi_kurang_bayar"
              value={form.data.potensi_kurang_bayar}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.potensi_kurang_bayar)}
              helperText={form.errors.potensi_kurang_bayar}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              type="text"
              label="Tidak Lanjut"
              name="tindak_lanjut"
              id="tindak_lanjut"
              value={form.data.tindak_lanjut}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.tindak_lanjut)}
              helperText={form.errors.tindak_lanjut}
            />
          </Grid>

          {user.admin && (
            <Grid item xs={12} md={6}>
              <DateInput
                fullWidth
                label="Tanggal Input"
                value={dayjs(form.data.tanggal_input)}
                onChange={(value) =>
                  handleDateInputChange("tanggal_input", value)
                }
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

export default ModalFormPenindakan;
