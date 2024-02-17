import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import Modal from "@/components/Modal";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { closeForm } from "@/redux/reducers/perusahaanMmeaReducer";
import Perusahaan from "@/services/PerusahaanService";
import Kantor from "@/services/kantorService";
import dateFormat from "@/utils";
import { useForm, usePage } from "@inertiajs/react";
import { Close, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent, Grid } from "@mui/material";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen modal (dialog) form create & update untuk perusahaan cukai MMEA.
 *
 * @returns {React.ReactElement}
 */
const ModalFormPerusahaanMmea = () => {
  const { open, type, data, title } = useSelector(
    (state) => state.perusahaanMmea.form
  );

  const form = useForm(data);
  const { auth, app } = usePage().props;
  const { user } = auth;
  const { csrf } = app;
  const { params } = app.url;
  const dispatch = useDispatch();

  /**
   * State
   */
  const [kantor, setKantor] = useState([]);
  const [perusahaan, setPerusahaan] = useState([]);

  /**
   * Ambil data kantor dan perusahaan dari backend
   * serta update value pada form saat modal dibuka
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

    getAllKantor();
    getAllPerusahaan();

    if (open) {
      form.clearErrors();
      form.setData({ ...data, _token: csrf });
    }
  }, [open]);

  /**
   * fungsi untuk menutup modal form
   */
  const handleClose = useCallback(() => {
    if (!form.processing) {
      dispatch(closeForm());
    }
  }, [form, dispatch]);

  /**
   * fungsi untuk mengatasi ketika form diisi
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
   * fungsi untuk request tambah fata perusahaan mmea ke database.
   */
  const handleStore = useCallback(() => {
    const url = route("perusahaan-mmea.store", {
      _query: params,
    });

    form.post(url, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => form.reset(),
      onError: () => {
        dispatch(
          openNotification({
            status: "success",
            message: "Terjadi kesalahan, periksa kembali inputan anda.",
          })
        );
      },
    });
  }, [form, params]);

  /**
   * fungsi untuk request update data perusahaan mmea ke database
   */
  const handleUpdate = useCallback(() => {
    const url = route("perusahaan-mmea.update", {
      perusahaan: data.id,
      _query: params,
    });

    form.patch(url, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        handleClose();
      },
      onError: () => {
        dispatch(
          openNotification({
            status: "success",
            message: "Terjadi kesalahan, periksa kembali inputan anda.",
          })
        );
      },
    });
  }, [data, params, form, handleClose]);

  /**
   * Fungsi untuk menangani ketika form di submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "create") {
      handleStore();
    } else if (type === "update") {
      handleUpdate();
    }
  };

  return (
    <Modal
      open={open}
      title={title}
      onClose={handleClose}
      maxWidth="md"
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <DialogContent dividers sx={{ py: 3 }}>
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
              label="NPPKC"
              name="nppbkc"
              id="nppbkc"
              value={form.data.nppbkc}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.nppbkc)}
              helperText={form.errors.nppbkc}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="Jumlah Dokumen"
              name="jumlah_dokumen"
              id="jumlah_dokumen"
              value={form.data.jumlah_dokumen}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.jumlah_dokumen)}
              helperText={form.errors.jumlah_dokumen}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              step="any"
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
                helperText={
                  Boolean(form.errors.tanggal_input)
                    ? form.errors.tanggal_input
                    : "Opsional"
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
};

export default ModalFormPerusahaanMmea;
