import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import Modal from "@/components/Modal";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { closeForm } from "@/redux/reducers/pengawasanReducer";
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
 * Komponen modal form data pengawasan.
 *
 * @returns {React.ReactElement}
 */
const ModalFormPengawasan = memo(() => {
  const { app, access, auth } = usePage().props;
  const { params } = app.url;
  const { csrf } = app;
  const { user } = auth;
  const dispatch = useDispatch();
  const pengawasan = useSelector((state) => state.pengawasan);

  /**
   * Form data
   */
  const form = useForm({ ...pengawasan.form.data, _token: csrf });

  /**
   * State
   */
  const [kantor, setKantor] = useState([]);
  const [types, setTypes] = useState([]);

  /**
   * Ambil data kantor dan pengawasan.
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

      setTypes(
        pengawasan.types.map((value) => ({
          label: value,
          value,
        }))
      );
    }
  }, []);

  /**
   * Update value pada form saat modal dibuka
   */
  useEffect(() => {
    if (pengawasan.form.open) {
      form.clearErrors();
      form.setData({ ...pengawasan.form.data, _token: csrf });
    }
  }, [pengawasan.form.open]);

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
   * fungsi untuk menambah data pengawasan.
   */
  const handleStore = useCallback(() => {
    const url = route("pengawasan.store", {
      _query: params,
    });

    form.post(url, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => form.reset(),
    });
  }, [form, params]);

  /**
   * fungsi untuk memperbarui data pengawasan.
   */
  const handleUpdate = useCallback(() => {
    const url = route("pengawasan.update", {
      pengawasan: pengawasan.form.data.id,
      _query: params,
    });

    form.patch(url, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => handleClose(),
    });
  }, [form, pengawasan, params, handleClose]);

  /**
   * fungsi untuk menangani ketika form di submit
   */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (pengawasan.form.type === "create" && access.create) {
        handleStore();
      } else if (pengawasan.form.type === "edit" && access.update) {
        handleUpdate();
      }
    },
    [handleStore, handleUpdate, pengawasan, access]
  );

  return (
    <Modal
      open={pengawasan.form.open}
      title={pengawasan.form.title}
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
                label="Kantor"
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
              label="Tipe"
              name="tipe"
              id="tipe"
              items={types}
              value={form.data.tipe}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.tipe)}
              helperText={form.errors.tipe}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="text"
              label="SBP"
              name="sbp"
              id="sbp"
              value={form.data.sbp}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.sbp)}
              helperText={form.errors.sbp}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="text"
              label="Kantor"
              name="kantor"
              id="kantor"
              value={form.data.kantor}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.kantor)}
              helperText={form.errors.kantor}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="Nilai Barang"
              name="nilai_barang"
              id="nilai_barang"
              value={form.data.nilai_barang}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.nilai_barang)}
              helperText={form.errors.nilai_barang}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="Total Kerugian"
              name="total_kerugian"
              id="total_kerugian"
              value={form.data.total_kerugian}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.total_kerugian)}
              helperText={form.errors.total_kerugian}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
              type="number"
              label="Potensi Kerugian Negara"
              name="potensi_kerugian"
              id="potensi_kerugian"
              value={form.data.potensi_kerugian}
              onChange={handleInputChange}
              disabled={form.processing}
              error={Boolean(form.errors.potensi_kerugian)}
              helperText={form.errors.potensi_kerugian}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              required
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

export default ModalFormPengawasan;
