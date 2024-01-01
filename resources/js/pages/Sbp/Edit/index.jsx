import React, { useCallback } from "react";
import PropTypes from "prop-types";
import AuthLayout from "@/layouts/AuthLayout";
import Header from "@/components/Header";
import BackButton from "@/components/Buttons/BackButton";
import { Box, CardContent, Grid, Stack } from "@mui/material";
import CardPaper from "@/components/CardPaper";
import TextInput from "@/components/Input/TextInput";
import { useForm } from "@inertiajs/react";

/**
 * Halaman edit SBP
 */
const EditSbp = (props) => {
  const { sbp, kantor } = props.data;
  const { app, auth } = props;
  const { user } = auth;

  const { data, setData, errors, patch, processing } = useForm({
    kantor_id: sbp.kantor_id,
    jumlah: sbp.jumlah,
    tindak_lanjut: sbp.tindak_lanjut,
    tanggal_input: sbp.tanggal_input,
    _token: app.csrf,
  });

  /**
   * fungsi untuk menangani ketika form diisi
   */
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData(name, value);
    },
    [setData]
  );

  return (
    <Box component="main" sx={{ mt: 5 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          <form>
            <CardPaper
              title="Form edit SBP"
              subheader="Form dengan tanda * harus diisi."
            >
              <CardContent>
                <Stack direction="column" spacing={3}>
                  <TextInput
                    fullWidth
                    required
                    type="number"
                    step="any"
                    label="Jumlan"
                    name="jumlah"
                    value={data.jumlah}
                    error={Boolean(errors.jumlah)}
                    helperText={errors.jumlah}
                    onChange={handleInputChange}
                    disabled={processing}
                  />
                </Stack>
              </CardContent>
            </CardPaper>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

EditSbp.layout = (page) => (
  <AuthLayout title="Edit SBP">
    <Header title="Edit SBP" action={<BackButton href={route("sbp")} />} />

    {page}
  </AuthLayout>
);

export default EditSbp;
