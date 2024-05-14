import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import Modal from "@/components/Modal";
import { closeForm } from "@/redux/reducers/dokumenReducer";
import { openNotification } from "@/redux/reducers/notificationReducer";
import Kantor from "@/services/kantorService";
import dateFormat from "@/utils";
import { useForm, usePage } from "@inertiajs/react";
import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { DialogActions, DialogContent, Grid, TextField } from "@mui/material";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen modal form dokumen
 *
 * @returns {React.ReactElement}
 */
const ModalFormDokumen = () => {
  const { form } = useSelector((state) => state.dokumen);
  const dispatch = useDispatch();
  const { auth, app } = usePage().props;
  const { params } = app.url;

  /**
   * State
   */
  const [kantorOptions, setKantorOptions] = useState([]);

  /**
   * Request data kantor
   */
  useEffect(() => {
    const getKantor = async () => {
      try {
        const response = await Kantor.getAll();
        const { data } = response;

        setKantorOptions(
          data.map((kantor) => ({
            label: kantor.nama,
            value: kantor.id,
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

    getKantor();
  }, []);

  /**
   * Form
   */
  const { data, setData, post, patch, errors, clearError, processing, reset } =
    useForm(form.data);

  /**
   * update form
   */
  useEffect(() => {
    setData(form.data);
  }, [form.open]);

  /**
   * Fungsi untuk menutup modal form
   */
  const handleClose = useCallback(() => {
    dispatch(closeForm());
  }, [dispatch]);

  /**
   * fungsi untuk menangani ketika form diisi
   */
  const handleInputChange = useCallback(
    (e) => {
      const target = e.target;

      switch (target.type) {
        case "file":
          if (target.files.length > 0) {
            setData(target.name, target.files[0]);
          }
          break;

        default:
          setData(target.name, target.value);
          break;
      }
    },
    [setData]
  );

  /**
   * fungsi untuk menangani ketika form tanggal diisi
   */
  const handleDateInputChange = useCallback(
    (name, value) => {
      setData(name, dateFormat(value));
    },
    [setData]
  );

  /**
   * fungsi untuk menambahkan data dokumen ke database
   */
  const createDokumen = () => {
    const url = route("dokumen.store", {
      _query: params,
    });

    post(url, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        clearError();
        reset();
        dispatch(
          openNotification({
            status: "success",
            message: "Dokumen berhasil ditambahkan.",
          })
        );
      },
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Gagal menambahkan dokumen, Periksa kembali inputan anda.",
          })
        );
      },
    });
  };

  /**
   * fungsi untuk submit form
   */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (form.type === "create") {
        createDokumen();
      }
    },
    [data]
  );

  return (
    <Modal
      title={form.title}
      open={form.open}
      maxWidth="sm"
      loading={processing}
      onClose={handleClose}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <DialogContent dividers sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {auth.user.admin && (
            <Grid item xs={12}>
              <SelectInput
                fullWidth
                type="select"
                name="kantor_id"
                label="Pilih Kantor"
                items={kantorOptions}
                value={data.kantor_id}
                error={Boolean(errors.kantor_id)}
                helperText={errors.kantor_id}
                onChange={handleInputChange}
                disabled={processing}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <DateInput
              fullWidth
              required
              label="Tanggal"
              name="tanggal"
              value={dayjs(data.tanggal)}
              error={Boolean(errors.tanggal)}
              helperText={errors.tanggal}
              onChange={(value) => handleDateInputChange("tanggal", value)}
              disabled={processing}
            />
          </Grid>

          <Grid item xs={12}>
            <TextInput
              fullWidth
              required
              type="text"
              label="Jenis Dokumen"
              name="jenis_dokumen"
              value={data.jenis_dokumen}
              error={Boolean(errors.jenis_dokumen)}
              helperText={errors.jenis_dokumen}
              onChange={handleInputChange}
              disabled={processing}
            />
          </Grid>

          <Grid item xs={12}>
            <TextInput
              fullWidth
              multiline
              rows={3}
              type="text"
              label="Keterangan"
              name="keterangan"
              value={data.keterangan}
              error={Boolean(errors.keterangan)}
              helperText={errors.keterangan}
              onChange={handleInputChange}
              disabled={processing}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="file"
              label="Upload File"
              name="file"
              error={Boolean(errors.file)}
              helperText={errors.file}
              onChange={handleInputChange}
              disabled={processing}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <LoadingButton
          type="submit"
          startIcon={<Save />}
          variant="contained"
          color="primary"
          loading={processing}
        >
          Simpan
        </LoadingButton>
      </DialogActions>
    </Modal>
  );
};

export default ModalFormDokumen;
