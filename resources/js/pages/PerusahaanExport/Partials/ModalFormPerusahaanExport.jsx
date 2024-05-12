import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import Modal from "@/components/Modal";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { closeForm } from "@/redux/reducers/perusahaanExportReducer";
import Perusahaan from "@/services/PerusahaanService";
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
 * Komponen modal form master perusahaan.
 *
 * @returns {React.ReactElement}
 */
const ModalFormPerusahaanExport = memo(() => {
  const { open, type, title, data } = useSelector(
    (state) => state.perusahaanExport.form
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
  const [perusahaan, setPerusahaan] = useState([]);

  /**
   * Ambil data kantor dan perusahaan.
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

    const getAllPerusahaan = async () => {
      try {
        const response = await Perusahaan.getAll();

        setPerusahaan(
          response.data.map(({ nama }) => ({
            label: nama,
            value: nama,
          }))
        );
      } catch (error) {
        dispatch(
          openNotification({
            status: "error",
            message: `${error.status} - Gagal mengambil data perusahaan.`,
          })
        );
      }
    };

    if (access.create || access.update) {
      getAllKantor();
      getAllPerusahaan();
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
   * fungsi untuk menambah data perusahaan ke database
   */
  const handleStore = useCallback(() => {
    const url = route("perusahaan-export.store", {
      _query: params,
    });

    form.post(url, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => form.reset(),
    });
  }, [form, params]);

  /**
   * fungsi untuk memperbarui data perusahaan ke database.
   */
  const handleUpdate = useCallback(() => {
    const url = route("perusahaan-export.update", {
      perusahaan: data.id,
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
            <SelectInput
              fullWidth
              required
              label="Nama Perusahaan"
              name="nama_perusahaan"
              id="nama_perusahaan"
              items={perusahaan}
              onChange={handleInputChange}
              disabled={form.processing}
              value={form.data.nama_perusahaan}
              error={Boolean(form.errors.nama_perusahaan)}
              helperText={form.errors.nama_perusahaan}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="text"
              label="NPWP"
              name="npwp"
              id="npwp"
              value={form.data.npwp}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.npwp)}
              helperText={form.errors.npwp}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="PEB"
              name="peb"
              id="peb"
              value={form.data.peb}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.peb)}
              helperText={form.errors.peb}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              step="any"
              label="Bruto"
              name="bruto"
              id="bruto"
              value={form.data.bruto}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.bruto)}
              helperText={form.errors.bruto}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              step="any"
              label="Netto"
              name="netto"
              id="netto"
              value={form.data.netto}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.netto)}
              helperText={form.errors.netto}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              step="any"
              label="Devisa"
              name="devisa"
              id="devisa"
              value={form.data.devisa}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.devisa)}
              helperText={form.errors.devisa}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              step="any"
              label="Bea Keluar"
              name="bea_keluar"
              id="bea_keluar"
              value={form.data.bea_keluar}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.bea_keluar)}
              helperText={form.errors.bea_keluar}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="Jumlah Liter"
              name="jumlah_liter"
              id="jumlah_liter"
              value={form.data.jumlah_liter}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.jumlah_liter)}
              helperText={form.errors.jumlah_liter}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              step="any"
              label="Jumlah Cukai"
              name="jumlah_cukai"
              id="jumlah_cukai"
              value={form.data.jumlah_cukai}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.jumlah_cukai)}
              helperText={form.errors.jumlah_cukai}
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

export default ModalFormPerusahaanExport;
