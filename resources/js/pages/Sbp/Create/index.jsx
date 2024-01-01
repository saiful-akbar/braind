import BackButton from "@/components/Buttons/BackButton";
import CardPaper from "@/components/CardPaper";
import Header from "@/components/Header";
import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import AuthLayout from "@/layouts/AuthLayout";
import { openNotification } from "@/redux/reducers/notificationReducer";
import dateFormat from "@/utils";
import { useForm } from "@inertiajs/react";
import { LoadingButton } from "@mui/lab";
import { Box, CardContent, Grid, Stack } from "@mui/material";
import dayjs from "dayjs";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

/**
 * Halaman create sbp
 */
const CreateSbp = (props) => {
  const { kantor } = props.data;
  const { app, auth } = props;
  const { user } = auth;
  const dispatch = useDispatch();

  const { data, setData, processing, errors, post, reset } = useForm({
    kantor_id: !user.admin ? user.kantor_id : "",
    jumlah: "",
    tindak_lanjut: "",
    tanggal_input: null,
    _token: app.csrf,
  });

  /**
   * fungsi untuk menangani ketika form di klik
   */
  const handleInputChange = useCallback(
    (e) => {
      setData(e.target.name, e.target.value);
    },
    [setData]
  );

  /**
   * fungsi untuk mengatasi ketika tanggal input diisi
   */
  const handleDateInputChange = useCallback(
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

    post(route("sbp.store"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesalahan. Periksa kembali inputan anda.",
          })
        );
      },
    });
  };

  return (
    <Box component="main" sx={{ mt: 5 }}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid container spacing={3} justifyContent="center">
          <Grid item md={8} xs={12}>
            <CardPaper
              title="Form tambah data SBP"
              subheader="Form dengan tanda * harus diisi."
            >
              <CardContent>
                <Stack direction="column" spacing={3}>
                  <SelectInput
                    fullWidth
                    required
                    label="ID Kantor"
                    name="kantor_id"
                    id="kantorID"
                    items={kantor}
                    value={data.kantor_id}
                    onChange={handleInputChange}
                    disabled={Boolean(processing || !user.admin)}
                  />
                  <TextInput
                    fullWidth
                    required
                    type="number"
                    min={0}
                    step="any"
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
                    min={0}
                    step="any"
                    label="Tindak lanjut"
                    name="tindak_lanjut"
                    value={data.tindak_lanjut}
                    error={Boolean(errors.tindak_lanjut)}
                    helperText={errors.tindak_lanjut}
                    onChange={handleInputChange}
                    disabled={processing}
                  />

                  <DateInput
                    label="Tanggal input"
                    value={dayjs(data.tanggal_input)}
                    onChange={handleDateInputChange}
                    error={Boolean(errors.tanggal_input)}
                    helperText={
                      errors.tanggal_input ??
                      "Kosongkan jika anda ingin tanggal input dibuat berdasarkan tanggal hari ini."
                    }
                  />
                </Stack>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 3,
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
              </CardContent>
            </CardPaper>
          </Grid>
        </Grid>
      </form>
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
