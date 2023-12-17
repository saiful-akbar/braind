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
import { useCallback } from "react";
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
    setTitle(commodity.type === "create" ? "Tambah Komoditi" : "Edit Komoditi");
  }, [commodity.type]);

  /**
   * update value berdasarkan type aksinya
   */
  React.useEffect(() => {
    const { data } = commodity;

    setData((prevState) => ({
      ...prevState,
      id: data.id,
      komoditi: data.name,
    }));
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
      ...prevState,
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
   * fungsi untuk menyimpan data commodity baru
   */
  const storeData = async () => {
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
  };

  /**
   * Fungsi untuk fetch update data commodity
   */
  const updateData = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios({
        method: "patch",
        data,
        url: route("commodity.update", {
          commodity: data.id,
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

      if (commodity.type === "create") {
        storeData();
      } else {
        updateData();
      }
    },
    [storeData, commodity, updateData]
  );

  return (
    <Dialog
      open={commodity.open}
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent dividers>
        <TextInput
          fullWidth
          required
          autoFocus
          size="small"
          label="Kode Komoditi"
          name="komoditi"
          value={data.komoditi}
          onChange={handleChange}
          disabled={loading}
          error={Boolean(error !== null)}
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
          {commodity.type === "create" ? "Tambahkan" : "Perbarui"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
});

export default FormCommodity;
