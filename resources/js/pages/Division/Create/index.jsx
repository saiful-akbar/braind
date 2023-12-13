import BackButton from "@/components/Buttons/BackButton";
import CardPaper from "@/components/CardPaper";
import Header from "@/components/Header";
import TextInput from "@/components/Input/TextInput";
import AuthLayout from "@/layouts/AuthLayout";
import { useForm } from "@inertiajs/react";
import { LoadingButton } from "@mui/lab";
import { Box, CardActions, CardContent, Grid } from "@mui/material";
import { useCallback } from "react";
import SaveIcon from '@mui/icons-material/Save';

/**
 * Halaman create division
 */
export default function CreateDivision() {
  const { data, setData, post, processing, reset, errors } = useForm({
    nama: "",
  });

  /**
   * Fungsi untuk mengatasi ketika form diisi
   */
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData(name, value);
    },
    [setData]
  );

  /**
   * Fungsi untuk menangani ketika form di-submit
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    post(route("division.store"), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  return (
    <Box sx={{ my: 5 }}>
      <Grid container justifyContent="center">
        <Grid item md={8} xs={12}>
          <form autoComplete="off" onSubmit={handleFormSubmit}>
            <CardPaper
              title="Form tambah data kanwil baru"
              subheader="Form dengan tanda * harus diisi."
            >
              <CardContent>
                <TextInput
                  fullWidth
                  size="small"
                  label="Nama kanwil"
                  name="nama"
                  value={data.nama}
                  onChange={handleInputChange}
                  error={errors.nama}
                  helperText={errors.nama}
                  disabled={processing}
                />
              </CardContent>

              <CardActions
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={processing}
                  startIcon={<SaveIcon />}
                  disableElevation
                >
                  Simpan
                </LoadingButton>
              </CardActions>
            </CardPaper>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

CreateDivision.layout = (page) => (
  <AuthLayout title="Tambah Kanwil">
    <Header
      title="Tambah kanwil"
      action={<BackButton href={route("division")} />}
    />

    {page}
  </AuthLayout>
);
