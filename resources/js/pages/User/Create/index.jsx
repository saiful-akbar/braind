import BackButton from "@/components/Buttons/BackButton";
import CardPaper from "@/components/CardPaper";
import Header from "@/components/Header";
import AvatarInput from "@/components/Input/AvatarInput";
import DateInput from "@/components/Input/DateInput";
import PasswordInput from "@/components/Input/PasswordInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import AuthLayout from "@/layouts/AuthLayout";
import { openNotification } from "@/redux/reducers/notificationReducer";
import dateFormat from "@/utils";
import { useForm } from "@inertiajs/react";
import { LoadingButton } from "@mui/lab";
import { Box, CardContent, Grid, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

const gender = [
  {
    label: "Laki-Laki",
    value: "l",
  },
  {
    label: "Perempuan",
    value: "p",
  },
];

const roles = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Kanwil",
    value: "kanwil",
  },
];

/**
 * Halaman tambah user baru
 */
const CreateUser = (props) => {
  const { kantor } = props.data;
  const { app } = props;
  const dispatch = useDispatch();
  const { data, setData, processing, errors, reset, post } = useForm({
    kantor_id: "",
    username: "",
    password: "",
    role: "",
    foto: null,
    nama_lengkap: "",
    jenis_kelamin: "",
    tempat_lahir: "",
    tanggal_lahir: null,
    negara: "",
    kota: "",
    kode_pos: "",
    alamat: "",
    email: "",
    telepon: "",
    _token: app.csrf,
  });

  // state
  const [photoPreview, setPhotoPreview] = useState(null);

  /**
   * fungsi untuk mengatasi ketika form diisi
   */
  const handleChange = useCallback(
    (e) => {
      const { type, name, value } = e.target;

      if (type === "file" && e.target.files.length > 0) {
        const file = e.target.files[0];
        setPhotoPreview(URL.createObjectURL(file));
        setData(name, file);
      } else {
        setData(name, value);
      }
    },
    [setData, setPhotoPreview]
  );

  /**
   * fungsi untuk menangani ketika form date diisi.
   */
  const handleDateChange = useCallback(
    (value) => {
      setData("tanggal_lahir", dateFormat(value));
    },
    [setData]
  );

  /**
   * fungsi untuk menangani ketika form di-submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("user.store"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setPhotoPreview(null);
      },
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Gagal menambahkan user. Periksa kembali inputan anda.",
          })
        );
      },
    });
  };

  return (
    <Box component="main" sx={{ mt: 5 }}>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={8}>
            <CardPaper
              title="Akun"
              subheader="Akun pengguna, akun ini digunakan untuk login aplikasi."
            >
              <CardContent>
                <Stack spacing={2}>
                  <SelectInput
                    fullWidth
                    required
                    size="small"
                    label="ID kantor"
                    name="kantor_id"
                    items={kantor}
                    value={data.kantor_id}
                    onChange={handleChange}
                    disabled={processing}
                    error={Boolean(errors.kantor_id)}
                    helperText={errors.kantor_id}
                  />

                  <SelectInput
                    fullWidth
                    required
                    size="small"
                    label="Role"
                    name="role"
                    items={roles}
                    value={data.role}
                    onChange={handleChange}
                    disabled={processing}
                    error={Boolean(errors.role)}
                    helperText={errors.role}
                  />

                  <TextInput
                    required
                    fullWidth
                    size="small"
                    type="text"
                    label="Username"
                    name="username"
                    onChange={handleChange}
                    disabled={processing}
                    value={data.username}
                    error={Boolean(errors.username)}
                    helperText={errors.username}
                  />

                  <PasswordInput
                    required
                    fullWidth
                    type="password"
                    size="small"
                    iconSize="small"
                    name="password"
                    label="Kata sandi"
                    value={data.password}
                    onChange={handleChange}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    disabled={processing}
                  />
                </Stack>
              </CardContent>
            </CardPaper>
          </Grid>

          <Grid item xs={12} md={8}>
            <CardPaper
              title="Profil"
              subheader="Data diri atau identitas user."
            >
              <CardContent>
                <Stack spacing={3} direction="column" alignItems="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <AvatarInput
                      name="foto"
                      id="foto"
                      height={200}
                      width={200}
                      preview={photoPreview}
                      onChange={handleChange}
                    />

                    {Boolean(errors.foto) && (
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 1,
                          color: "error.main",
                        }}
                      >
                        {errors.foto}
                      </Typography>
                    )}
                  </Box>

                  <TextInput
                    fullWidth
                    required
                    type="text"
                    size="small"
                    label="Nama lengkap"
                    name="nama_lengkap"
                    value={data.nama_lengkap}
                    onChange={handleChange}
                    error={Boolean(errors.nama_lengkap)}
                    helperText={errors.nama_lengkap}
                    disabled={processing}
                  />

                  <SelectInput
                    fullWidth
                    size="small"
                    items={gender}
                    name="jenis_kelamin"
                    label="Jenis kelamin"
                    value={data.jenis_kelamin}
                    onChange={handleChange}
                    error={Boolean(errors.jenis_kelamin)}
                    helperText={errors.jenis_kelamin}
                    disabled={processing}
                  />

                  <TextInput
                    fullWidth
                    type="text"
                    size="small"
                    label="Tempat lahir"
                    name="tempat_lahir"
                    value={data.tempat_lahir}
                    onChange={handleChange}
                    error={Boolean(errors.tempat_lahir)}
                    helperText={errors.tempat_lahir}
                    disabled={processing}
                  />

                  <Box sx={{ width: "100%" }}>
                    <DateInput
                      label="Tanggal lahir"
                      onChange={handleDateChange}
                      value={
                        data.tanggal_lahir === null
                          ? null
                          : dayjs(data.tanggal_lahir)
                      }
                    />
                  </Box>
                </Stack>
              </CardContent>
            </CardPaper>
          </Grid>

          <Grid item xs={12} md={8}>
            <CardPaper title="Alamat" subheader="Alamat tempat tinggal user">
              <CardContent>
                <Stack spacing={3} direction="column" alignItems="center">
                  <TextInput
                    fullWidth
                    type="text"
                    size="small"
                    label="Negara"
                    name="negara"
                    onChange={handleChange}
                    value={data.negara}
                    disabled={processing}
                    error={Boolean(errors.negara)}
                    helperText={errors.negara}
                  />

                  <TextInput
                    fullWidth
                    type="text"
                    size="small"
                    label="Kota"
                    name="kota"
                    onChange={handleChange}
                    value={data.kota}
                    disabled={processing}
                    error={Boolean(errors.kota)}
                    helperText={errors.kota}
                  />

                  <TextInput
                    fullWidth
                    type="text"
                    size="small"
                    label="Kode Pos"
                    name="kode_pos"
                    onChange={handleChange}
                    value={data.kode_pos}
                    disabled={processing}
                    error={Boolean(errors.kode_pos)}
                    helperText={errors.kode_pos}
                  />

                  <TextInput
                    rows={5}
                    multiline
                    max={10}
                    fullWidth
                    type="text"
                    label="Alamat lengkap"
                    name="alamat"
                    value={data.alamat}
                    onChange={handleChange}
                    disabled={processing}
                    error={Boolean(errors.alamat)}
                    helperText={
                      Boolean(errors.alamat)
                        ? errors.alamat
                        : `${data.alamat.length}/200`
                    }
                  />
                </Stack>
              </CardContent>
            </CardPaper>
          </Grid>

          <Grid item xs={12} md={8}>
            <CardPaper
              title="Kontak"
              subheader="Kontak user yang dapat dihubungi."
            >
              <CardContent>
                <Stack spacing={3} direction="column" alignItems="center">
                  <TextInput
                    fullWidth
                    type="number"
                    size="small"
                    label="No. Telepon"
                    name="telepon"
                    onChange={handleChange}
                    value={data.telepon}
                    disabled={processing}
                    error={Boolean(errors.telepon)}
                    helperText={errors.telepon}
                  />

                  <TextInput
                    fullWidth
                    type="email"
                    size="small"
                    label="Alamat Email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    disabled={processing}
                  />
                </Stack>
              </CardContent>
            </CardPaper>
          </Grid>

          <Grid item xs={12} md={8}>
            <LoadingButton
              fullWidth
              disableElevation
              variant="contained"
              type="submit"
              color="primary"
              loading={processing}
            >
              Simpan
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

/**
 * Layout
 */
CreateUser.layout = (page) => (
  <AuthLayout title="Tambah User">
    <Header title="Tambah User" action={<BackButton href={route("user")} />} />
    {page}
  </AuthLayout>
);

export default CreateUser;
