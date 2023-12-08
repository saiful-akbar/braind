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
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setData(name, value);
  }, [setData]);

  /**
   * Fungsi untuk menangani ketika form disubmit
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    post(route("login.store"), {
      preserveScroll: true
    });
  }

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
        Log in
      </Typography>

      <Typography component="div" variant="body2" color="text.secondary">
        Please login with your registered account.
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
        Log in
      </LoadingButton>
    </Box>
  )
}

export default FormLogin;
