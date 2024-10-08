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
                  type="text"
                  label="kantor"
                  name="kantor"
                  value={data.kantor.nama ?? ""}
                />

                <TextInput
                  fullWidth
                  disabled
                  type="text"
                  label="Username"
                  name="username"
                  value={data.username ?? ""}
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
                  label="Nama lengkap"
                  name="nama_lengkap"
                  value={data.nama_lengkap ?? ""}
                />

                <TextInput
                  fullWidth
                  disabled
                  type="text"
                  label="Jenis kelamin"
                  name="jenis_kelamin"
                  value={data.jenis_kelamin === "l" ? "Laki-Laki" : "Perempuan"}
                />

                <TextInput
                  fullWidth
                  disabled
                  type="text"
                  label="Tempat lahir"
                  name="tempat_lahir"
                  value={data.tempat_lahir ?? ""}
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
                  label="Negara"
                  name="negara"
                  value={data.negara ?? ""}
                />

                <TextInput
                  fullWidth
                  disabled
                  type="text"
                  label="Kota"
                  name="kota"
                  value={data.kota ?? ""}
                />

                <TextInput
                  fullWidth
                  disabled
                  type="text"
                  label="Kode Pos"
                  name="kode_pos"
                  value={data.kode_pos ?? ""}
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
                  value={data.alamat ?? ""}
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
                  label="Telepon"
                  name="telepon"
                  value={data.telepon ?? ""}
                />

                <TextInput
                  fullWidth
                  disabled
                  type="email"
                  label="Email"
                  name="email"
                  value={data.email ?? ""}
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
