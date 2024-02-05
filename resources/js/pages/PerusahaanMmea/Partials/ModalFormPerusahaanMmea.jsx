import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import Modal from "@/components/Modal";
import usePerusahaanMmea from "@/hooks/usePerusahaaMmea";
import { openNotification } from "@/redux/reducers/notificationReducer";
import Kantor from "@/services/kantorService";
import dateFormat from "@/utils";
import { useForm, usePage } from "@inertiajs/react";
import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent, Grid } from "@mui/material";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

/**
 * Komponen modal (dialog) form create & update untuk perusahaan cukai MMEA.
 *
 * @returns {React.ReactElement}
 */
const ModalFormPerusahaanMmea = () => {
  const { open, type, data } = useSelector(
    (state) => state.perusahaanMmea.form
  );

  const { modalForm } = usePerusahaanMmea();
  const form = useForm(data);
  const { auth, app } = usePage().props;

  /**
   * State
   */
  const [kantor, setKantor] = useState([]);

  /**
   * Ambil data kantor dari backend dan update value pada form
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
            message: "Terjadi kesalahan, Gagal mengambil data kantor.",
          })
        );
      }
    };

    getAllKantor();
    form.clearErrors();
    form.setData({ ...data, _token: app.csrf });
  }, [open]);

  /**
   * fungsi untuk menutup modal form
   */
  const handleClose = useCallback(() => {
    if (!form.processing) {
      modalForm.close();
    }
  }, [form.processing, modalForm.close]);

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
    (dateValue) => {
      form.setData("tanggal_input", dateFormat(dateValue));
    },
    [form.setData]
  );

  /**
   * Fungsi untuk menangani ketika form di submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "create") {
      modalForm.store(form);
    }
  };

  return (
    <Modal
      open={open}
      title={type === "create" ? "Tambah Perusahaan" : "Edit Perusahaan"}
      onClose={handleClose}
      maxWidth="md"
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <DialogContent dividers sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {auth.user.admin && (
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
              label="Nama Perusahaan"
              name="nama_perusahaan"
              id="nama_perusahaan"
              value={form.data.nama_perusahaan}
              onChange={handleInputChange}
              disabled={form.processing}
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
              step="0.01"
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
              step="0.01"
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
        >
          Tutup
        </Button>

        <LoadingButton
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          loading={form.processing}
        >
          Simpan
        </LoadingButton>
      </DialogActions>
    </Modal>
  );
};

export default ModalFormPerusahaanMmea;
