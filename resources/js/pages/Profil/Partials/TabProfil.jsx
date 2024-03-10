import CardPaper from "@/components/CardPaper";
import AvatarInput from "@/components/Input/AvatarInput";
import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import { openNotification } from "@/redux/reducers/notificationReducer";
import dateFormat from "@/utils";
import { useForm, usePage } from "@inertiajs/react";
import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, CardActions, CardContent, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";

/**
 * Daftar jenis kelamin
 */
const jenisKelaminLists = [
  {
    label: "Laki-Laki",
    value: "l",
  },
  {
    label: "Perempuan",
    value: "p",
  },
];

/**
 * Komponen tab profil untuk halaman profil user.
 */
const TabProfil = memo(() => {
  const dispatch = useDispatch();
  const { auth, app } = usePage().props;
  const { csrf } = app;
  const { params } = app.url;
  const { user } = auth;
  const { data, setData, processing, errors, clearErrors, post } = useForm({
    _token: csrf,
    _method: "patch",
    foto: "",
    nama_lengkap: user.nama_lengkap ?? "",
    jenis_kelamin: user.jenis_kelamin ?? "",
    tanggal_lahir: user.tanggal_lahir ?? "",
    tempat_lahir: user.tempat_lahir ?? "",
  });

  /**
   * fungsi untuk menangani ketika foto diubah
   */
  const handlePhotoChange = useCallback(
    (e) => {
      const { files } = e.target;

      if (files.length > 0) {
        setData("foto", files[0]);
      }
    },
    [setData]
  );

  /**
   * fungsi untuk melihat image preview.
   *
   * @param {object} image
   * @returns string
   */
  const preview = (image) => {
    return URL.createObjectURL(image);
  };

  /**
   * fungsi untuk menangani ketika form input diisi.
   */
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData(name, value);
    },
    [setData]
  );

  /**
   * fungsi untuk menangani ketika form tanggal diisi
   */
  const handleDateInputChange = useCallback(
    (name, dateValue) => {
      setData(name, dateFormat(dateValue));
    },
    [setData]
  );

  /**
   * fungsi untuk menangani ketika form disubmit
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = route("profil.update-profil", {
      _query: params,
    });

    post(url, {
      preserveScroll: true,
      preserveState: true,
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Gagal memperbarui profil.",
          })
        );
      },
    });
  };

  return (
    <CardPaper
      title="Profil"
      subheader="Profil ini merupakan data diri anda yang akan ditampilkan pada aplikasi"
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <AvatarInput
                preview={data.foto !== "" ? preview(data.foto) : user.foto}
                onChange={(e) => handlePhotoChange(e)}
              />

              {Boolean(errors.foto) && (
                <Typography
                  component="div"
                  variant="caption"
                  color="error"
                  sx={{ mt: 1 }}
                >
                  {errors.foto}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item md={6} xs={12}>
            <TextInput
              fullWidth
              required
              label="Nama Lengkap"
              name="nama_lengkap"
              id="nama_lengkap"
              value={data.nama_lengkap}
              onChange={(e) => handleInputChange(e)}
              error={Boolean(errors.nama_lengkap)}
              helperText={errors.nama_lengkap}
              disabled={processing}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <SelectInput
              fullWidth
              label="Jenis Kelamin"
              name="jenis_kelamin"
              id="jenis_kelamin"
              items={jenisKelaminLists}
              value={data.jenis_kelamin}
              onChange={(e) => handleInputChange(e)}
              error={Boolean(errors.jenis_kelamin)}
              helperText={errors.jenis_kelamin}
              disabled={processing}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <DateInput
              fullWidth
              label="Tanggal Lahir"
              name="tanggal_lahir"
              id="tanggal_lahir"
              value={dayjs(data.tanggal_lahir)}
              error={Boolean(errors.tanggal_lahir)}
              helperText={errors.tanggal_lahir}
              disabled={processing}
              onChange={(value) =>
                handleDateInputChange("tanggal_lahir", value)
              }
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextInput
              fullWidth
              label="Tempat Lahir"
              name="tempat_lahir"
              id="tempat_lahir"
              value={data.tempat_lahir}
              onChange={(e) => handleInputChange(e)}
              error={Boolean(errors.tempat_lahir)}
              helperText={errors.tempat_lahir}
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

export default TabProfil;
