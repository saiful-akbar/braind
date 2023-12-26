import BackButton from "@/components/Buttons/BackButton";
import CardPaper from "@/components/CardPaper";
import Header from "@/components/Header";
import DateInput from "@/components/Input/DateInput";
import SwitchInput from "@/components/Input/SwitchInput";
import TextInput from "@/components/Input/TextInput";
import AuthLayout from "@/layouts/AuthLayout";
import { Avatar, Box, CardContent, Grid, Stack } from "@mui/material";
import dayjs from "dayjs";

/**
 * Halaman detail user
 */
const ShowUser = ({ data, access }) => {
  return (
    <Box component="main" sx={{ mt: 5 }}>
      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} md={8}>
          <CardPaper
            title="Akun"
            subheader="Akun pengguna, akun ini digunakan untuk login aplikasi."
          >
            <CardContent>
              <Stack spacing={2}>
                <TextInput
                  fullWidth
                  disabled
                  size="small"
                  type="text"
                  label="kantor"
                  name="kantor"
                  defaultValue={data.kantor.nama}
                />

                <TextInput
                  fullWidth
                  disabled
                  size="small"
                  type="text"
                  label="Username"
                  name="username"
                  defaultValue={data.username}
                />

                <SwitchInput
                  disabled
                  label="Admin"
                  labelPlacement="end"
                  color="secondary"
                  name="admin"
                  checked={data.admin}
                />
              </Stack>
            </CardContent>
          </CardPaper>
        </Grid>

        <Grid item xs={12} md={8}>
          <CardPaper title="Profil" subheader="Data diri atau identitas user.">
            <CardContent>
              <Stack spacing={3} direction="column" alignItems="center">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Avatar
                    alt="Foto"
                    src={data.foto}
                    sx={{
                      width: 200,
                      height: 200,
                    }}
                  />
                </Box>

                <TextInput
                  fullWidth
                  disabled
                  type="text"
                  size="small"
                  label="Nama lengkap"
                  name="nama_lengkap"
                  defaultValue={data.nama_lengkap}
                />

                <TextInput
                  fullWidth
                  disabled
                  type="text"
                  size="small"
                  label="Jenis kelamin"
                  name="jenis_kelamin"
                  defaultValue={
                    data.jenis_kelamin === "l" ? "Laki-Laki" : "Perempuan"
                  }
                />

                <TextInput
                  fullWidth
                  disabled
                  type="text"
                  size="small"
                  label="Tempat lahir"
                  name="tempat_lahir"
                  defaultValue={data.tempat_lahir}
                />

                <Box sx={{ width: "100%" }}>
                  <DateInput
                    disabled
                    label="Tanggal lahir"
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
                  disabled
                  type="text"
                  size="small"
                  label="Negara"
                  name="negara"
                  defaultValue={data.negara}
                />

                <TextInput
                  fullWidth
                  disabled
                  type="text"
                  size="small"
                  label="Kota"
                  name="kota"
                  defaultValue={data.kota}
                />

                <TextInput
                  fullWidth
                  disabled
                  type="text"
                  size="small"
                  label="Kode Pos"
                  name="kode_pos"
                  defaultValue={data.kode_pos}
                />

                <TextInput
                  rows={5}
                  multiline
                  max={10}
                  fullWidth
                  disabled
                  type="text"
                  label="Alamat lengkap"
                  name="alamat"
                  defaultValue={data.alamat}
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
                  disabled
                  type="number"
                  size="small"
                  label="Telepon"
                  name="telepon"
                  defaultValue={data.telepon}
                />

                <TextInput
                  fullWidth
                  disabled
                  type="email"
                  size="small"
                  label="Email"
                  name="email"
                  defaultValue={data.email}
                />
              </Stack>
            </CardContent>
          </CardPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

/**
 * Layout
 */
ShowUser.layout = (page) => (
  <AuthLayout title="Detail User">
    <Header title="Detail User" action={<BackButton href={route("user")} />} />
    {page}
  </AuthLayout>
);

export default ShowUser;
