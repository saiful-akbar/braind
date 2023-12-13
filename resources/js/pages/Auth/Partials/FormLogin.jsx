import React, { useCallback } from "react";
import { useForm } from "@inertiajs/react";
import { Box, Typography, Grid } from "@mui/material";
import TextInput from "@/components/Input/TextInput";
import PasswordInput from "@/components/Input/PasswordInput";
import { LoadingButton } from "@mui/lab";

/**
 * Form login
 */
const FormLogin = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  });

  /**
   * Fungsi untuk menangani ketika form diinput
   */
  const handleInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setData(name, value);
    },
    [setData]
  );

  /**
   * Fungsi untuk menangani ketika form disubmit
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = data;

    if (email !== "" && password !== "") {
      post(route("login.store"), {
        preserveScroll: true,
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        width: "100%",
        maxWidth: 600,
      }}
    >
      <Typography component="h1" variant="h3" sx={{ mb: 2 }}>
        Masuk
      </Typography>

      <Typography component="div" variant="body2" color="text.secondary">
        Silakan masuk dengan akun anda yang terdaftar.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 3, mb: 6 }}>
        <Grid item xs={12}>
          <TextInput
            fullWidth
            label="Email"
            name="email"
            type="email"
            onChange={handleInputChange}
            value={data.email}
            error={Boolean(errors.email)}
            helperText={errors.email}
            disabled={processing}
            inputProps={{
              sx: {
                backgroundColor: "background.paper",
              }
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <PasswordInput
            fullWidth
            label="Kata sandi"
            name="password"
            onChange={handleInputChange}
            value={data.password}
            disabled={processing}
            inputProps={{
              sx: {
                backgroundColor: "background.paper",
              }
            }}
          />
        </Grid>
      </Grid>

      <LoadingButton
        fullWidth
        type="submit"
        variant="contained"
        size="large"
        loading={processing}
      >
        Masuk
      </LoadingButton>
    </Box>
  );
};

export default FormLogin;
