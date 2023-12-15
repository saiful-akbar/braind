import TextInput from "@/components/Input/TextInput";
import { closeFormCommodity } from "@/redux/reducers/commodityReducer";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { router, usePage } from "@inertiajs/react";
import { Close, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen partials untuk form commodity
 */
const FormCommodity = React.memo(() => {
  const { app } = usePage().props;
  const commodity = useSelector((state) => state.commodity);
  const dispatch = useDispatch();

  // state
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [title, setTitle] = React.useState("Tambah Komoditi");
  const [data, setData] = React.useState({
    id: "",
    komoditi: "",
    _token: app.csrf,
  });

  /**
   * Update title commodity berdasarkan type-nya
   */
  React.useEffect(() => {
    setTitle(commodity.type === "add" ? "Tambah Komoditi" : "Edit Komoditi");
  }, [commodity.type]);

  /**
   * update value berdasarkan type aksinya
   */
  React.useEffect(() => {
    const { data } = commodity;

    setData({
      id: data.id,
      komoditi: data.name,
    });
  }, [commodity.data, setData]);

  /**
   * fungsi untuk menutup dialog modal.
   *
   * NB: modal hanya bisa ditutup jika loading bernilai false.
   */
  const handleClose = () => {
    if (!loading) {
      setError(null);
      dispatch(closeFormCommodity());
    }
  };

  /**
   * fungsi untuk reset form
   */
  const reset = () => {
    setData((prevState) => ({
      id: "",
      komoditi: "",
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
   * Fungsi untuk menangani ketika form di-submit
   */
  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        await axios({
          method: "post",
          url: route("commodity.store"),
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
    },
    [data, setLoading, setError, reset]
  );

  return (
    <Dialog
      open={commodity.open}
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
      component="form"
      onSubmit={handleSubmit}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent dividers>
        <TextInput
          fullWidth
          size="small"
          label="Kode Komoditi"
          name="komoditi"
          value={data.komoditi}
          onChange={handleChange}
          disabled={loading}
          error={error}
          helperText={error}
        />
      </DialogContent>

      <DialogActions sx={{ py: 2, px: 3 }}>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          startIcon={<Close />}
          disabled={loading}
          onClick={handleClose}
          disableElevation
        >
          Batal
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          disableElevation
          loading={loading}
          startIcon={<Save />}
        >
          Simpan
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
});

export default FormCommodity;
