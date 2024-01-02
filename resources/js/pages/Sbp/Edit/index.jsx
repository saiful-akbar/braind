import React, { useCallback } from "react";
import PropTypes from "prop-types";
import AuthLayout from "@/layouts/AuthLayout";
import Header from "@/components/Header";
import BackButton from "@/components/Buttons/BackButton";
import { Box, CardActions, CardContent, Grid, Stack } from "@mui/material";
import CardPaper from "@/components/CardPaper";
import TextInput from "@/components/Input/TextInput";
import { useForm } from "@inertiajs/react";
import SelectInput from "@/components/Input/SelectInput";
import dateFormat from "@/utils";
import DateInput from "@/components/Input/DateInput";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";

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

  /**
   * fungsi untuk menangani ketika tanggal input dirubah
   */
  const handleDateChange = useCallback(
    (dateValue) => {
      setData("tanggal_input", dateFormat(dateValue));
    },
    [setData]
  );

  /**
   * fungsi untuk menangani ketika form di-submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    patch(route("sbp.update", { sbp: sbp.id }), {
      preserveScroll: true,
    });
  };

  return (
    <Box component="main" sx={{ mt: 5 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          <form onSubmit={handleSubmit} autoComplete="off">
            <CardPaper
              title="Form edit SBP"
              subheader="Form dengan tanda * harus diisi."
            >
              <CardContent>
                <Stack direction="column" spacing={3}>
                  <SelectInput
                    fullWidth
                    required
                    label="ID Kantor"
                    name="kantor_id"
                    items={kantor}
                    value={data.kantor_id}
                    onChange={handleInputChange}
                    disabled={Boolean(processing || !user.admin)}
                    error={Boolean(errors.kantor_id)}
                    helperText={errors.kantor_id}
                  />

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

                  <TextInput
                    fullWidth
                    required
                    type="number"
                    step="any"
                    label="Tindak Lanjut"
                    name="tindak_lanjut"
                    value={data.tindak_lanjut}
                    error={Boolean(errors.tindak_lanjut)}
                    helperText={errors.tindak_lanjut}
                    onChange={handleInputChange}
                    disabled={processing}
                  />

                  <DateInput
                    fullWidth
                    label="Tanggal input"
                    name="tanggal_input"
                    value={dayjs(data.tanggal_input)}
                    error={Boolean(errors.tanggal_input)}
                    helperText={errors.tanggal_input}
                    onChange={handleDateChange}
                    disabled={processing}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <LoadingButton
                      type="submit"
                      color="primary"
                      variant="contained"
                      loading={processing}
                    >
                      Simpan
                    </LoadingButton>
                  </Box>
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
