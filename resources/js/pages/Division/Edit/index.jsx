import BackButton from "@/components/Buttons/BackButton";
import CardPaper from "@/components/CardPaper";
import Header from "@/components/Header";
import TextInput from "@/components/Input/TextInput";
import AuthLayout from "@/layouts/AuthLayout";
import { useForm } from "@inertiajs/react";
import { LoadingButton } from "@mui/lab";
import { Box, CardActions, CardContent, Grid } from "@mui/material";
import { useCallback } from "react";
import SaveIcon from "@mui/icons-material/Save";

/**
 * Halaman edit division (master kanwil)
 */
const EditDivision = (props) => {
  const { app } = props;
  const { data, setData, patch, processing, errors } = useForm({
    nama: props.data.name,
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

    const url = route("division.update", {
      division: props.data.id,
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
              title="Form edit data kanwil"
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
};

/**
 * Layout
 */
EditDivision.layout = (page) => (
  <AuthLayout title="Edit Kanwil">
    <Header
      title="Edit Kanwil"
      action={<BackButton href={route("division")} />}
    />

    {page}
  </AuthLayout>
);

export default EditDivision;
