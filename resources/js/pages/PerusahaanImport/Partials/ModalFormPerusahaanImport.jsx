import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import Modal from "@/components/Modal";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { closeForm } from "@/redux/reducers/perusahaanImportReducer";
import Perusahaan from "@/services/PerusahaanService";
import Kantor from "@/services/kantorService";
import { useForm, usePage } from "@inertiajs/react";
import { Close, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent, Grid } from "@mui/material";
import dayjs from "dayjs";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen modal form master perusahaan.
 *
 * @returns {React.ReactElement}
 */
const ModalFormPerusahaanImport = memo(() => {
  const { open, type, title, data } = useSelector(
    (state) => state.perusahaanImport.form
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
    const url = route("perusahaan-import.store", {
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
    const url = route("perusahaan-import.update", {
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
              label="PIB"
              name="pib"
              id="pib"
              value={form.data.pib}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.pib)}
              helperText={form.errors.pib}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="Pembayaran Bea Masuk"
              name="pembayaran_bea_masuk"
              id="pembayaran_bea_masuk"
              value={form.data.pembayaran_bea_masuk}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.pembayaran_bea_masuk)}
              helperText={form.errors.pembayaran_bea_masuk}
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
              label="Total Pembayaran"
              name="total_pembayaran"
              id="total_pembayaran"
              value={form.data.total_pembayaran}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.total_pembayaran)}
              helperText={form.errors.total_pembayaran}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              step="any"
              label="Bea Masuk"
              name="bea_masuk"
              id="bea_masuk"
              value={form.data.bea_masuk}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.bea_masuk)}
              helperText={form.errors.bea_masuk}
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
        <Button
          type="button"
          color="primary"
          variant="outlined"
          size="large"
          disabled={form.processing}
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
          loading={form.processing}
          startIcon={<Save />}
        >
          Simpan
        </LoadingButton>
      </DialogActions>
    </Modal>
  );
});

export default ModalFormPerusahaanImport;
