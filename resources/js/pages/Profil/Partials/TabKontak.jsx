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
 * Komponen form update kontak user
 */
const TabKontak = memo(() => {
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
    email: user.email ?? "",
    telepon: user.telepon ?? "",
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

    const url = route("profil.update-kontak", {
      _query: params,
    });

    patch(url, {
      preserveScroll: true,
      preserveState: true,
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Gagal memperbarui kontak.",
          })
        );
      },
    });
  };
  return (
    <CardPaper
      title="Kontak"
      subheader="Kontak anda yang dapat dihubungi."
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              type="email"
              label="Email"
              name="email"
              id="email"
              value={data.email}
              error={Boolean(errors.email)}
              helperText={errors.email}
              onChange={(e) => handleInputChange(e)}
              disabled={processing}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              type="number"
              label="Telepon"
              name="telepon"
              id="telepon"
              value={data.telepon}
              error={Boolean(errors.telepon)}
              helperText={errors.telepon}
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

export default TabKontak;
