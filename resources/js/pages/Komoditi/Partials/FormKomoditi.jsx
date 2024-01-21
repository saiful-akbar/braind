import TextInput from "@/components/Input/TextInput";
import { closeFormKomoditi } from "@/redux/reducers/komoditiReducer";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { router, usePage } from "@inertiajs/react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen partials untuk form komoditi
 */
const FormKomoditi = React.memo(() => {
  const { app } = usePage().props;
  const komoditi = useSelector((state) => state.komoditi);
  const dispatch = useDispatch();

  // state
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [title, setTitle] = React.useState("Tambah Komoditi");
  const [data, setData] = React.useState({
    id: "",
    kode: "",
    _token: app.csrf,
  });

  /**
   * Update title komoditi berdasarkan type-nya
   */
  React.useEffect(() => {
    setTitle(komoditi.type === "create" ? "Tambah Komoditi" : "Edit Komoditi");
  }, [komoditi.type]);

  /**
   * update value berdasarkan type aksinya
   */
  React.useEffect(() => {
    const { data } = komoditi;

    setData((prevState) => ({
      ...prevState,
      id: data.id,
      kode: data.kode,
    }));
  }, [komoditi.data, setData]);

  /**
   * fungsi untuk menutup dialog modal.
   *
   * NB: modal hanya bisa ditutup jika loading bernilai false.
   */
  const handleClose = () => {
    if (!loading) {
      setError(null);
      dispatch(closeFormKomoditi());
    }
  };

  /**
   * fungsi untuk reset form
   */
  const reset = () => {
    setData((prevState) => ({
      ...prevState,
      id: "",
      kode: "",
    }));
  };

  /**
   * fungsi untuk menangani ketika form diisi.
   */
  const handleChange = React.useCallback(
    (e) => {
      const { name, value } = e.target;

      setData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setData]
  );

  /**
   * fungsi untuk menyimpan data komoditi baru
   */
  const storeData = async () => {
    setLoading(true);

    try {
      await axios({
        method: "post",
        url: route("komoditi.store"),
        data: data,
      });

      setLoading(false);
      setError(null);
      reset();
      router.reload();

      dispatch(
        openNotification({
          status: "success",
          message: "Kode komoditi berhasil ditambahkan.",
        })
      );
    } catch (error) {
      const { message } = error.response.data;

      setLoading(false);
      setError(message);
    }
  };

  /**
   * Fungsi untuk fetch update data komoditi
   */
  const updateData = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios({
        method: "patch",
        data,
        url: route("komoditi.update", {
          komoditi: data.id,
        }),
      });

      router.reload();
      setLoading(false);
      dispatch(
        openNotification({
          status: "success",
          message: "Kode komoditi berhasil diperbarui.",
        })
      );
    } catch (error) {
      const { message } = error.response.data;

      setLoading(false);
      setError(message);
    }
  };

  /**
   * Fungsi untuk menangani ketika form di-submit
   */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (komoditi.type === "create") {
        storeData();
      } else {
        updateData();
      }
    },
    [storeData, komoditi, updateData]
  );

  return (
    <Dialog
      open={komoditi.open}
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent
        sx={{
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Box sx={{ mt: 3 }}>
          <TextInput
            fullWidth
            required
            autoFocus
            label="Kode Komoditi"
            name="kode"
            value={data.kode}
            onChange={handleChange}
            disabled={loading}
            error={Boolean(error !== null)}
            helperText={error}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ py: 2, px: 3 }}>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          size="large"
          disabled={loading}
          onClick={handleClose}
        >
          Tutup
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          loading={loading}
        >
          Simpan
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
});

export default FormKomoditi;
