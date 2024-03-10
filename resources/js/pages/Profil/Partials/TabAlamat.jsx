import CardPaper from "@/components/CardPaper";
import TextInput from "@/components/Input/TextInput";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { useForm, usePage } from "@inertiajs/react";
import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { CardActions, CardContent, Grid } from "@mui/material";
import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";

/**
 * Komponen form update alamat user
 */
const TabAlamat = memo(() => {
  const dispatch = useDispatch();
  const { auth, app } = usePage().props;
  const { user } = auth;
  const { params } = app.url;
  const { csrf } = app;

  /**
   * form data
   */
  const { data, setData, patch, errors, processing } = useForm({
    _token: csrf,
    _method: "patch",
    negara: user.negara ?? "",
    kota: user.kota ?? "",
    kode_pos: user.kode_pos ?? "",
    alamat: user.alamat ?? "",
  });

  /**
   * fungsi untuk menangani ketika form diisi
   */
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData(name, value);
    },
    [setData]
  );

  /**
   * fungsi untuk menangani ketika form di-submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = route("profil.update-alamat", {
      _query: params,
    });

    patch(url, {
      preserveScroll: true,
      preserveState: true,
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Gagal memperbarui alamat.",
          })
        );
      },
    });
  };
  return (
    <CardPaper
      title="Alamat"
      subheader="Alamat tempat tinggal anda"
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              label="Negara"
              name="negara"
              id="negara"
              value={data.negara}
              error={Boolean(errors.negara)}
              helperText={errors.negara}
              onChange={(e) => handleInputChange(e)}
              disabled={processing}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              label="Kota"
              name="kota"
              id="kota"
              value={data.kota}
              error={Boolean(errors.kota)}
              helperText={errors.kota}
              onChange={(e) => handleInputChange(e)}
              disabled={processing}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              label="Kode POS"
              name="kode_pos"
              id="kode_pos"
              value={data.kode_pos}
              error={Boolean(errors.kode_pos)}
              helperText={errors.kode_pos}
              onChange={(e) => handleInputChange(e)}
              disabled={processing}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              label="Alamat Lengkap"
              name="alamat"
              id="alamat"
              value={data.alamat}
              error={Boolean(errors.alamat)}
              helperText={errors.alamat}
              onChange={(e) => handleInputChange(e)}
              disabled={processing}
            />
          </Grid>
        </Grid>
      </CardContent>

      <CardActions
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <LoadingButton
          type="submit"
          color="primary"
          variant="contained"
          loading={processing}
          startIcon={<Save />}
        >
          Simpan
        </LoadingButton>
      </CardActions>
    </CardPaper>
  );
});

export default TabAlamat;
