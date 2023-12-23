import BackButton from "@/components/Buttons/BackButton";
import CardPaper from "@/components/CardPaper";
import Header from "@/components/Header";
import SwitchInput from "@/components/Input/SwitchInput";
import AuthLayout from "@/layouts/AuthLayout";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { useForm } from "@inertiajs/react";
import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AlertTitle,
  Box,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const CreateAccess = (props) => {
  const { menus, user } = props.data;
  const dispatch = useDispatch();
  const { data, setData, processing, post } = useForm(
    menus
      .map(({ childrens }) =>
        childrens
          .map((menu) => ({
            id: menu.id,
            create: false,
            read: false,
            update: false,
            remove: false,
            destroy: false,
          }))
          .flat()
      )
      .flat()
  );

  /**
   * fungsi untuk mengatasi ketika select diubah
   */
  const handleChange = useCallback(
    (e) => {
      const { checked, dataset } = e.target;
      const { menuId, accessType } = dataset;

      const newData = data.map((value) => {
        if (value.id !== menuId) return value;
        return { ...value, [accessType]: checked };
      });

      setData(newData);
    },
    [data, setData]
  );

  /**
   * Fungsi untuk menangani ketika form di-submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("user.access.store", { user: user.id }), {
      preserveScroll: true,
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesalahan, gagal menambahkan hak akses user.",
          })
        );
      },
    });
  };

  return (
    <>
      <Header
        title="Tambah Akses"
        action={<BackButton href={route("user")} />}
      />

      <Box component="main" sx={{ mt: 5 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={12}>
              <Alert severity="info">
                <AlertTitle>Keterangan Akses</AlertTitle>
                <table>
                  <tbody>
                    <tr>
                      <th align="left">Create</th>
                      <td align="left">:</td>
                      <td align="left">
                        Akses untuk membuat atau menambahkan data pada modul
                        atau menu.
                      </td>
                    </tr>

                    <tr>
                      <th align="left">Read</th>
                      <td align="left">:</td>
                      <td align="left">
                        Akses untuk melihat atau membaca data pada modul atau
                        menu.
                      </td>
                    </tr>

                    <tr>
                      <th align="left">Update</th>
                      <td align="left">:</td>
                      <td align="left">
                        Akses untuk merubah atau mengedit data pada modul atau
                        menu.
                      </td>
                    </tr>

                    <tr>
                      <th align="left">Remove</th>
                      <td align="left">:</td>
                      <td align="left">
                        Akses untuk menghapus data pada modul atau menu tetapi
                        tidak menghapus data dari database.
                      </td>
                    </tr>

                    <tr>
                      <th align="left">Destroy</th>
                      <td align="left">:</td>
                      <td align="left">
                        Akses untuk menghapus data pada modul atau menu secara
                        permanen (dihapus juga dari database)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Alert>
            </Grid>

            {menus.map((menuGroup) => (
              <Grid key={menuGroup.id} item xs={12} md={8}>
                <CardPaper title={menuGroup.name}>
                  <CardContent>
                    <Grid container spacing={3}>
                      {menuGroup.childrens.map((menu, index) => {
                        const access = data.find((d) => d.id === menu.id);

                        return (
                          <Grid
                            key={menu.id}
                            container
                            spacing={1}
                            item
                            xs={12}
                          >
                            <Grid item xs={12}>
                              <Typography variant="subtitle2">
                                {menu.name}
                              </Typography>
                            </Grid>

                            <Grid item xs={12} md={12 / 5}>
                              <SwitchInput
                                label="Create"
                                color="secondary"
                                checked={access.create}
                                onChange={handleChange}
                                disabled={processing}
                                inputProps={{
                                  "data-access-type": "create",
                                  "data-menu-id": menu.id,
                                }}
                              />
                            </Grid>

                            <Grid item xs={12} md={12 / 5}>
                              <SwitchInput
                                label="Read"
                                color="secondary"
                                checked={access.read}
                                onChange={handleChange}
                                disabled={processing}
                                inputProps={{
                                  "data-access-type": "read",
                                  "data-menu-id": menu.id,
                                }}
                              />
                            </Grid>

                            <Grid item xs={12} md={12 / 5}>
                              <SwitchInput
                                label="update"
                                color="secondary"
                                checked={access.update}
                                onChange={handleChange}
                                disabled={processing}
                                inputProps={{
                                  "data-access-type": "update",
                                  "data-menu-id": menu.id,
                                }}
                              />
                            </Grid>

                            <Grid item xs={12} md={12 / 5}>
                              <SwitchInput
                                label="remove"
                                color="secondary"
                                checked={access.remove}
                                onChange={handleChange}
                                disabled={processing}
                                inputProps={{
                                  "data-access-type": "remove",
                                  "data-menu-id": menu.id,
                                }}
                              />
                            </Grid>

                            <Grid item xs={12} md={12 / 5}>
                              <SwitchInput
                                label="destroy"
                                color="secondary"
                                checked={access.destroy}
                                onChange={handleChange}
                                disabled={processing}
                                inputProps={{
                                  "data-access-type": "destroy",
                                  "data-menu-id": menu.id,
                                }}
                              />
                            </Grid>

                            {index + 1 < menuGroup.childrens.length && (
                              <Grid item xs={12}>
                                <Divider sx={{ mt: 3 }} />
                              </Grid>
                            )}
                          </Grid>
                        );
                      })}
                    </Grid>
                  </CardContent>
                </CardPaper>
              </Grid>
            ))}

            <Grid item xs={12} md={8}>
              <LoadingButton
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                loading={processing}
                startIcon={<Save />}
              >
                Simpan
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

CreateAccess.layout = (page) => (
  <AuthLayout children={page} title="Tambah akses" />
);

export default CreateAccess;
