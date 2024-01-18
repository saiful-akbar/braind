import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import BaseModal from "@/components/Modals/BaseModal";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { closeModalPerusahaanHtHptl } from "@/redux/reducers/perusahaanHtHptlReducer";
import Kantor from "@/services/kantorService";
import dateFormat from "@/utils";
import { useForm, usePage } from "@inertiajs/react";
import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent, Grid } from "@mui/material";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen modal create & update partials untuk
 * halaman data perusahaan cukai HT + HPTL.
 *
 * @returns {React.ReactElement}
 */
const ModalActionHtHptl = () => {
  const dispatch = useDispatch();
  const { open, type, data } = useSelector((state) => state.perusahaanHtHptl);
  const { auth } = usePage().props;
  const { user } = auth;

  // state
  const [kantor, setKantor] = useState([]);

  /**
   * Ambil data kantor
   */
  useEffect(() => {
    const getKantor = async () => {
      try {
        const response = await Kantor.getAll();
        const { data } = response;

        setKantor(() =>
          data.map((item) => ({
            label: item.nama,
            value: item.id,
          }))
        );
      } catch (error) {
        dispatch(
          openNotification({
            status: "error",
            message: `${error.status} - Gagal mengambil data kantor`,
          })
        );
      }
    };

    getKantor();
  }, []);

  // form
  const {
    data: formData,
    setData,
    processing,
    errors,
    reset,
    post,
    patch,
  } = useForm(data);

  /**
   * Update data pada form
   */
  useEffect(() => {
    setData(data);
  }, [open]);

  /**
   * Fungsii untuk menutup modal dialog
   */
  const handleClose = () => {
    if (!processing) {
      dispatch(closeModalPerusahaanHtHptl());
    }
  };

  /**
   * fungsi untuk menangani ketika form diisi
   */
  const handleInputChange = useCallback(
    (e) => {
      setData(e.target.name, e.target.value);
    },
    [setData]
  );

  /**
   * fungsi untuk submit form
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "create") {
      post(route("perusahaan.hthptl.store"), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          reset();
          dispatch(
            openNotification({
              status: "success",
              message: "Perusahaan cukai HT + HPTL berhasil ditambahkan.",
            })
          );
        },
        onError: () => {
          dispatch(
            openNotification({
              status: "error",
              message: "Terjadi kesalahan, periksa kembali inputan anda!",
            })
          );
        },
      });
    }
  };

  /**
   * fungsi untuk menangani ketika form date diisi
   */
  const handleDateChange = useCallback(
    (name, dateValue) => {
      setData(name, dateFormat(dateValue));
    },
    [setData]
  );

  return (
    <BaseModal
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
          {user.admin && (
            <Grid item md={6} xs={12}>
              <SelectInput
                fullWidth
                label="ID Kantor"
                name="kantor_id"
                items={kantor}
                value={formData.kantor_id}
                disabled={processing}
                onChange={handleInputChange}
                error={Boolean(errors.kantor_id)}
                helperText={errors.kantor_id}
              />
            </Grid>
          )}

          <Grid item md={6} xs={12}>
            <TextInput
              fullWidth
              required
              type="text"
              label="Nama perusahaan"
              name="nama_perusahaan"
              value={formData.nama_perusahaan}
              error={Boolean(errors.nama_perusahaan)}
              helperText={errors.nama_perusahaan}
              disabled={processing}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextInput
              fullWidth
              required
              type="text"
              label="NPPBKC"
              name="nppbkc"
              value={formData.nppbkc}
              error={Boolean(errors.nppbkc)}
              helperText={errors.nppbkc}
              disabled={processing}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextInput
              fullWidth
              required
              type="number"
              min={0}
              label="Jumlah CK"
              name="jumlah_ck"
              value={formData.jumlah_ck}
              error={Boolean(errors.jumlah_ck)}
              helperText={errors.jumlah_ck}
              disabled={processing}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextInput
              fullWidth
              required
              type="text"
              label="Jenis BKC"
              name="jenis_bkc"
              value={formData.jenis_bkc}
              error={Boolean(errors.jenis_bkc)}
              helperText={errors.jenis_bkc}
              disabled={processing}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextInput
              fullWidth
              required
              type="number"
              step="0.01"
              label="Jumlah"
              name="jumlah"
              value={formData.jumlah}
              error={Boolean(errors.jumlah)}
              helperText={errors.jumlah}
              disabled={processing}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextInput
              fullWidth
              required
              type="number"
              step="0.01"
              label="Jumlah Cukai"
              name="jumlah_cukai"
              value={formData.jumlah_cukai}
              error={Boolean(errors.jumlah_cukai)}
              helperText={errors.jumlah_cukai}
              disabled={processing}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <DateInput
              fullWidth
              label="Tanggal input"
              name="tanggal_input"
              value={dayjs(formData.tanggal_input)}
              onChange={(value) => handleDateChange("tanggal_input", value)}
              error={Boolean(errors.tanggal_input)}
              helperText={
                Boolean(errors.tanggal_input)
                  ? errors.tanggal_input
                  : "Opsional"
              }
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          size="large"
          disabled={processing}
          onClick={handleClose}
        >
          Tutup
        </Button>

        <LoadingButton
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          loading={processing}
        >
          Simpan
        </LoadingButton>
      </DialogActions>
    </BaseModal>
  );
};

export default ModalActionHtHptl;
