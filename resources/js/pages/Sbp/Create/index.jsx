import BackButton from "@/components/Buttons/BackButton";
import CardPaper from "@/components/CardPaper";
import Header from "@/components/Header";
import TextInput from "@/components/Input/TextInput";
import AuthLayout from "@/layouts/AuthLayout";
import { useForm } from "@inertiajs/react";
import { Box, CardContent, Grid, Stack } from "@mui/material";
import React, { useCallback } from "react";

/**
 * Halaman create sbp
 */
const CreateSbp = (props) => {
  const { kantor } = props.data;
  const { app } = props;

  const { data, setData, processing, errors, post } = useForm({
    kantor_id: "",
    jumlah: "",
    tindak_lanjut: "",
    tanggal_input: "",
  });

  const [jumlah] = React.useState("");

  /**
   * fungsi untuk menangani ketika form di klik
   */
  const handleInputChange = useCallback(
    (e) => {
      setData(e.target.name, e.target.value);
    },
    [setData]
  );

  return (
    <Box component="form" sx={{ mt: 5 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item md={8} xs={12}>
          <CardPaper
            title="Form tambah data SBP"
            subheader="Form dengan tanda * harus diisi."
          >
            <CardContent>
              <Stack direction="column" spacing={3}>
                <TextInput
                  fullWidth
                  required
                  type="number"
                  size="small"
                  label="Jumlah"
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
                  size="small"
                  label="Tindak lanjut"
                  name="tindak_lanjut"
                  value={data.tindak_lanjut}
                  error={Boolean(errors.tindak_lanjut)}
                  helperText={errors.tindak_lanjut}
                  onChange={handleInputChange}
                  disabled={processing}
                />
              </Stack>
            </CardContent>
          </CardPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

CreateSbp.layout = (page) => (
  <AuthLayout title="Tambah SBP">
    <Header title="Tambah SBP" action={<BackButton href={route("sbp")} />} />
    {page}
  </AuthLayout>
);

export default CreateSbp;
