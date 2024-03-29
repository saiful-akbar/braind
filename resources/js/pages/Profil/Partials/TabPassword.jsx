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
 * Komponen form update password user
 */
const TabPassword = memo(() => {
  const dispatch = useDispatch();
  const { auth, app } = usePage().props;
  const { user } = auth;
  const { params } = app.url;
  const { csrf } = app;

  /**
   * form data
   */
  const { data, setData, patch, errors, processing, reset } = useForm({
    _token: csrf,
    _method: "patch",
    password_lama: "",
    password_baru: "",
    password_konfirmasi: "",
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

    const url = route("profil.update-password", {
      _query: params,
    });

    patch(url, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => reset(),
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Gagal memperbarui password.",
          })
        );
      },
    });
  };
  return (
    <Grid container justifyContent="center">
      <Grid item md={8} xs={12}>
        <CardPaper
          title="Ubah Password"
          subheader="Data password ini digunakan untuk login aplikasi. Pastikan untuk menggunakan kombinasi angka, huruf dan simbol untuk memperkuat keamanan password anda."
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextInput
                  fullWidth
                  required
                  type="password"
                  label="Password Lama"
                  name="password_lama"
                  id="password_lama"
                  value={data.password_lama}
                  error={Boolean(errors.password_lama)}
                  helperText={errors.password_lama}
                  onChange={(e) => handleInputChange(e)}
                  disabled={processing}
                />
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  fullWidth
                  required
                  type="password"
                  label="Password Baru"
                  name="password_baru"
                  id="password_baru"
                  value={data.password_baru}
                  error={Boolean(errors.password_baru)}
                  helperText={errors.password_baru}
                  onChange={(e) => handleInputChange(e)}
                  disabled={processing}
                />
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  fullWidth
                  required
                  type="password"
                  label="Konfirmasi Password Baru"
                  name="password_konfirmasi"
                  id="password_konfirmasi"
                  value={data.password_konfirmasi}
                  error={Boolean(errors.password_konfirmasi)}
                  helperText={errors.password_konfirmasi}
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
      </Grid>
    </Grid>
  );
});

export default TabPassword;
