import Modal from "@/components/Modal";
import { closeForm } from "@/redux/reducers/petaKerawananReducer";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { useForm, usePage } from "@inertiajs/react";
import { Image, Save, YouTube } from "@mui/icons-material";
import { LoadingButton, TabContext, TabList } from "@mui/lab";
import {
  DialogActions,
  DialogContent,
  Stack,
  Tab,
  TextField,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 *  Komponen modal form peta kerawanan.
 *
 * @returns {React.ReactElement}
 */
const ModalFormPetaKerawanan = React.memo(() => {
  const { open } = useSelector((state) => state.petaKerawanan.form);
  const dispatch = useDispatch();
  const { app } = usePage().props;
  const { csrf } = app;
  const { params } = app.url;

  /**
   * Form data
   */
  const { data, setData, errors, reset, post, processing } = useForm({
    tab: "gambar",
    id_youtube: "",
    gambar: "",
    judul: "",
    keterangan: "",
    _token: csrf,
  });

  /**
   * Resert form ketika modal form dibuka.
   */
  React.useEffect(() => {
    if (open) reset();
  }, [open]);

  /**
   * fungsi untuk menutup modal form
   */
  const handleCLoseModalForm = React.useCallback(() => {
    dispatch(closeForm());
  }, [dispatch]);

  /**
   * fungsi untuk menangani ketika tab dirubah
   */
  const handleTabChange = (event, value) => {
    setData({
      tab: value,
      id_youtube: "",
      gambar: "",
      judul: "",
      keterangan: "",
      _token: csrf,
    });
  };

  /**
   * fungsi untuk menangani ketika form di isi
   */
  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    switch (type) {
      case "file":
        const { files } = event.target;
        if (files.length > 0) setData(name, files[0]);
        break;

      default:
        setData(name, value);
        break;
    }
  };

  /**
   * fungsi untuk menangani ketika form di submit
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    const url = route("peta-kerawanan.store", {
      _query: params,
    });

    post(url, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => handleCLoseModalForm(),
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesalahan. Periksa kembali inputan anda.",
          })
        );
      },
    });
  };

  return (
    <Modal
      title="Tambah Peta Kerawanan"
      open={open}
      onClose={handleCLoseModalForm}
      loading={processing}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TabContext value={data.tab}>
        <TabList onChange={handleTabChange} variant="fullWidth">
          <Tab
            icon={<Image />}
            iconPosition="start"
            label="Gambar"
            value="gambar"
            disabled={processing}
          />

          <Tab
            icon={<YouTube />}
            iconPosition="start"
            label="Video"
            value="video"
            disabled={processing}
          />
        </TabList>
      </TabContext>

      <DialogContent dividers sx={{ px: 3, py: 4 }}>
        <Stack direction="column" spacing={3}>
          {data.tab === "gambar" && (
            <TextField
              required
              fullWidth
              type="file"
              label="Gambar"
              name="gambar"
              onChange={handleInputChange}
              error={Boolean(errors.gambar)}
              helperText={errors.gambar}
              disabled={processing}
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: "image/*" }}
            />
          )}

          {data.tab === "video" && (
            <TextField
              fullWidth
              required
              type="text"
              label="ID YouTube"
              name="id_youtube"
              onChange={handleInputChange}
              value={data.id_youtube}
              error={Boolean(errors.id_youtube)}
              helperText={errors.id_youtube}
              disabled={processing}
            />
          )}

          <TextField
            required
            fullWidth
            type="text"
            label="Judul"
            name="judul"
            value={data.judul}
            onChange={handleInputChange}
            error={Boolean(errors.judul)}
            helperText={errors.judul}
            disabled={processing}
          />

          <TextField
            required
            fullWidth
            multiline
            rows={3}
            label="Keterangan"
            name="keterangan"
            value={data.keterangan}
            disabled={processing}
            onChange={handleInputChange}
            error={Boolean(errors.keterangan)}
            helperText={
              Boolean(errors.keterangan)
                ? errors.keterangan
                : `${data.keterangan.length}/100`
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<Save />}
          loading={processing}
        >
          Simpan
        </LoadingButton>
      </DialogActions>
    </Modal>
  );
});

export default ModalFormPetaKerawanan;
