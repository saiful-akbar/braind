import BackButton from "@/components/Buttons/BackButton";
import CardPaper from "@/components/CardPaper";
import Header from "@/components/Header";
import PasswordInput from "@/components/Input/PasswordInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import AuthLayout from "@/layouts/AuthLayout";
import { useForm } from "@inertiajs/react";
import { Box, CardContent, Grid, Stack, TextField } from "@mui/material";
import React from "react";
import { useCallback } from "react";

/**
 * Halaman tambah user baru
 */
const CreateUser = (props) => {
  const { divisions } = props.data;
  const { data, setData, processing, errors, reset, post } = useForm({
    kanwil: "",
    username: "",
    kata_sandi: "",
  });

  /**
   * fungsi untuk mengatasi ketika form diisi
   */
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData(name, value);
    },
    [setData]
  );

  return (
    <Box component="main" sx={{ mt: 5 }}>
      <form autoComplete="off">
        <Grid container spacing={7} justifyContent="center">
          <Grid item xs={12} md={8}>
            <CardPaper
              title="Form Akun"
              subheader="Form dengan tanda * harus diisi."
            >
              <CardContent>
                <Stack spacing={2}>
                  <SelectInput
                    fullWidth
                    required
                    size="small"
                    label="Kanwil"
                    name="kanwil"
                    items={divisions}
                    value={data.kanwil}
                    onChange={handleChange}
                    disabled={processing}
                    error={Boolean(errors.kanwil)}
                    helperText={errors.kanwil}
                  />

                  <TextInput
                    required
                    fullWidth
                    size="small"
                    label="Username"
                    onChange={handleChange}
                    disabled={processing}
                    value={data.username}
                    error={errors.username}
                    helperText={errors.username}
                  />

                  <PasswordInput
                    required
                    fullWidth
                    size="small"
                    iconSize="small"
                    name="kata_sandi"
                    label="Kata sandi"
                    value={data.kata_sandi}
                    onChange={handleChange}
                    error={Boolean(errors.kata_sandi)}
                    helperText={errors.kata_sandi}
                    disabled={processing}
                  />
                </Stack>
              </CardContent>
            </CardPaper>
          </Grid>

          <Grid item xs={12} md={8}>
            <CardPaper
              title="Form Profil"
              subheader="form dengan tanda * harus diisi."
            >
              <CardContent>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    size="small"
                    type="file"
                    accept="image/*"
                  />
                  <div>2</div>
                  <div>3</div>
                </Stack>
              </CardContent>
            </CardPaper>
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
