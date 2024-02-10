import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import Modal from "@/components/Modal";
import useKantor from "@/hooks/useKantor";
import useSbp from "@/hooks/useSbp";
import { openNotification } from "@/redux/reducers/notificationReducer";
import dateFormat from "@/utils";
import { useForm, usePage } from "@inertiajs/react";
import { Close, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent, Grid } from "@mui/material";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen modal form untuk create & update data master SBP
 *
 * @returns {React.ReactElement}
 */
const ModalFormSbp = () => {
  const { form } = useSelector((state) => state.sbp);
  const { closeModalForm } = useSbp();
  const kantor = useKantor();
  const dispatch = useDispatch();
  const { auth, app } = usePage().props;
  const { user } = auth;
  const { params } = app.url;

  /**
   * State
   */
  const [kantorData, setKantorData] = useState([]);

  /**
   * form data
   */
  const { data, setData, processing, errors, clearErrors, reset, post, patch } =
    useForm({
      ...form.data,
      _token: app.csrf,
    });

  /**
   * ambil data kantor saat setelah komponen dirender.
   * Update value pada form data saat modal dibuka.
   */
  useEffect(() => {
    const getAllKantor = async () => {
      try {
        const response = await kantor.getAll();
        setKantorData(
          response.data.map((item) => ({
            label: item.nama,
            value: item.id,
          }))
        );
      } catch (error) {
        dispatch(
          openNotification({
            status: "error",
            message: "Gagal mengambil data kantor.",
          })
        );
      }
    };

    if (form.open) {
      getAllKantor();
      setData(form.data);
      clearErrors();
    }
  }, [form.open]);

  /**
   * fungsi untuk mengatasi ketika form input diisi.
   */
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData(name, value);
    },
    [setData]
  );

  /**
   * fungsi untuk mengatasi ketika form dengan type date diisi
   */
  const handleDateInputChange = useCallback(
    (value) => {
      setData("tanggal_input", dateFormat(value));
    },
    [setData]
  );

  /**
   * fungsi untuk tambah data SBP
   */
  const handleCreate = () => {
    const url = route("sbp.store", {
      _query: params,
    });

    post(url, {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  /**
   * fungsi untuk update data SBP
   */
  const handleUpdate = () => {
    const url = route("sbp.update", {
      sbp: form.data.id,
      _query: params,
    });

    patch(url, {
      preserveScroll: true,
      onSuccess: () => closeModalForm(),
    });
  };

  /**
   * fungsi untuk mengatasi ketika form di-submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.type === "create") {
      handleCreate();
    } else {
      handleUpdate();
    }
  };

  return (
    <Modal
      title={form.type === "create" ? "Tambah SBP" : "Edit SBP"}
      open={form.open}
      loading={processing}
      onClose={() => closeModalForm()}
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
                label="Pilih Kantor"
                name="kantor_id"
                items={kantorData}
                onChange={handleInputChange}
                value={data.kantor_id}
                error={Boolean(errors.kantor_id)}
                helperText={errors.kantor_id}
                disabled={processing}
              />
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <TextInput
              required
              fullWidth
              type="number"
              min={0}
              label="Jumlah"
              name="jumlah"
              value={data.jumlah}
              onChange={handleInputChange}
              error={Boolean(errors.jumlah)}
              helperText={errors.jumlah}
              disabled={processing}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              required
              fullWidth
              type="number"
              min={0}
              label="Tidak Lanjut"
              name="tindak_lanjut"
              value={data.tindak_lanjut}
              onChange={handleInputChange}
              error={Boolean(errors.tindak_lanjut)}
              helperText={errors.tindak_lanjut}
              disabled={processing}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DateInput
              fullWidth
              label="Tanggal Input"
              name="tanggal_input"
              value={dayjs(data.tanggal_input)}
              onChange={(value) => handleDateInputChange(value)}
              disabled={processing}
              error={Boolean(errors.tanggal_input)}
              helperText={errors.tanggal_input}
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
          onClick={closeModalForm}
          disabled={processing}
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
};

export default ModalFormSbp;
