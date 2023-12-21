import BackButton from "@/components/Buttons/BackButton";
import CardPaper from "@/components/CardPaper";
import Header from "@/components/Header";
import AvatarInput from "@/components/Input/AvatarInput";
import PasswordInput from "@/components/Input/PasswordInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import AuthLayout from "@/layouts/AuthLayout";
import { useForm } from "@inertiajs/react";
import {
  Box,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
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
    foto: null,
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

  return (
    <Box component="main" sx={{ mt: 5 }}>
      <form autoComplete="off" encType="multipart/form-data">
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

                  <span>2</span>
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
