import React, { useCallback } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Box, Typography, Grid } from "@mui/material";
import TextInput from "@/components/Input/TextInput";
import PasswordInput from "@/components/Input/PasswordInput";
import { LoadingButton } from "@mui/lab";

/**
 * Form login
 */
const FormLogin = React.memo(() => {
  const { app } = usePage().props;

  /**
   * Form data
   */
  const { data, setData, post, processing, errors } = useForm({
    username: "",
    password: "",
    _token: app.csrf,
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
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      post(route("login.store"), {
        preserveScroll: true,
      });
    },
    [post]
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
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
            required
            label="Username"
            id="username"
            name="username"
            type="username"
            onChange={handleInputChange}
            value={data.username}
            error={Boolean(errors.username)}
            helperText={errors.username}
            disabled={processing}
          />
        </Grid>

        <Grid item xs={12}>
          <PasswordInput
            fullWidth
            required
            label="Password"
            id="password"
            name="password"
            onChange={handleInputChange}
            value={data.password}
            disabled={processing}
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
});

export default FormLogin;
