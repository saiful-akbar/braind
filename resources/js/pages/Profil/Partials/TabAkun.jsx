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
 * Komponen form update akun user
 */
const TabAkun = memo(() => {
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
    username: user.username ?? "",
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

    const url = route("profil.update-akun", {
      _query: params,
    });

    patch(url, {
      preserveScroll: true,
      preserveState: true,
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Gagal memperbarui akun.",
          })
        );
      },
    });
  };
  return (
    <CardPaper
      title="Akun"
      subheader="Data akun ini digunakan untuk login aplikasi."
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              type="text"
              label="Username"
              name="username"
              id="username"
              value={data.username}
              error={Boolean(errors.username)}
              helperText={errors.username}
              onChange={(e) => handleInputChange(e)}
              disabled={processing}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              disabled
              type="text"
              label="Kantor"
              name="kantor"
              id="kantor"
              value={user.kantor.nama}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              disabled
              type="text"
              label="Role"
              name="role"
              id="role"
              value={user.admin ? "Admin" : "Member"}
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

export default TabAkun;
