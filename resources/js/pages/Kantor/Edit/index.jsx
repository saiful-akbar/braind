import BackButton from "@/components/Buttons/BackButton";
import CardPaper from "@/components/CardPaper";
import Header from "@/components/Header";
import TextInput from "@/components/Input/TextInput";
import AuthLayout from "@/layouts/AuthLayout";
import { useForm } from "@inertiajs/react";
import { LoadingButton } from "@mui/lab";
import { Box, CardActions, CardContent, Grid } from "@mui/material";
import { useCallback } from "react";

/**
 * Halaman edit kantor (master kanwil)
 */
const EditKantor = (props) => {
  const { app } = props;
  const { data, setData, patch, processing, errors } = useForm({
    nama: props.data.nama,
    _token: app.csrf,
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

    const url = route("kantor.update", {
      kantor: props.data.id,
    });

    patch(url, {
      preserveScroll: true,
    });
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Grid container justifyContent="center">
        <Grid item md={8} xs={12}>
          <form autoComplete="off" onSubmit={handleFormSubmit}>
            <CardPaper
              title="Edit data kantor"
              subheader="Form dengan tanda * harus diisi."
            >
              <CardContent>
                <TextInput
                  fullWidth
                  label="Nama kantor"
                  name="nama"
                  value={data.nama}
                  onChange={handleInputChange}
                  error={Boolean(errors.nama)}
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
};

/**
 * Layout
 */
EditKantor.layout = (page) => (
  <AuthLayout title="Edit kantor">
    <Header
      title="Edit kantor"
      action={<BackButton href={route("kantor")} />}
    />

    {page}
  </AuthLayout>
);

export default EditKantor;
