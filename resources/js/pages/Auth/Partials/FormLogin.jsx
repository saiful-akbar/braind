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
    username: "",
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
    const { username, password } = data;

    if (username !== "" && password !== "") {
      post(route("login.store"), {
        preserveScroll: true,
      });
    }
  };

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
            label="Username"
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
            label="Password"
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
};

export default FormLogin;
