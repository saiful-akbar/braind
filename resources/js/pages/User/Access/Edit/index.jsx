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
import { Fragment, useCallback } from "react";
import { useDispatch } from "react-redux";

/**
 * Daftar deskripsi akses.
 */
const descriptions = [
  {
    label: "Create",
    value: "Akses untuk membuat atau menambah data pada menu atau modul.",
  },
  {
    label: "Read",
    value:
      "Akses untuk melihat, membaca dan mencetak data pada menu atau modul.",
  },
  {
    label: "Update",
    value: "Akses untuk mengedit atau memperbarui data pada menu atau modul.",
  },
  {
    label: "Remove",
    value:
      "Akses untuk menghapus data pada menu atau modul tetapi tidak menghapus dari database.",
  },
  {
    label: "Destroy",
    value:
      "Akses untuk menghapus data pada menu atau modul selamanya, serta dihapus juga dari database.",
  },
];

/**
 * Halaman edit akses user.
 */
const EditAccessUser = (props) => {
  const { menu: menus, user } = props.data;
  const dispatch = useDispatch();
  const { data, setData, processing, put } = useForm(
    menus
      .map(({ sub_menu: subMenu }) =>
        subMenu
          .map((menu) => ({
            id: menu.id,
            create: Boolean(menu.create),
            read: Boolean(menu.read),
            update: Boolean(menu.update),
            remove: Boolean(menu.remove),
            destroy: Boolean(menu.destroy),
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

        return {
          ...value,
          [accessType]: checked,
        };
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

    put(route("user.access.update", { user: user.id }), {
      preserveScroll: true,
      onSuccess: () => {
        dispatch(
          openNotification({
            status: "success",
            message: "Akses user berhasil diperbarui.",
          })
        );
      },
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Gagal menambahkan hak akses user.",
          })
        );
      },
    });
  };

  return (
    <Box component="main" sx={{ mt: 5 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12}>
            <Alert severity="info">
              <AlertTitle sx={{ mb: 4 }}>Keterangan Akses</AlertTitle>

              <Grid container spacing={1}>
                {descriptions.map((desc, index) => {
                  return (
                    <Fragment key={desc.label}>
                      <Grid item xs={12} md={1}>
                        <Typography variant="subtitle2" component="span">
                          # {desc.label}
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Typography variant="body2" component="span">
                          {desc.value}
                        </Typography>
                      </Grid>

                      {index + 1 < descriptions.length && (
                        <Grid item xs={12}>
                          <Divider sx={{ my: 1 }} />
                        </Grid>
                      )}
                    </Fragment>
                  );
                })}
              </Grid>
            </Alert>
          </Grid>

          {menus.map((menu) => (
            <Grid key={menu.id} item xs={12} md={8}>
              <CardPaper title={menu.nama}>
                <CardContent>
                  <Grid container spacing={3}>
                    {menu.sub_menu.map((subMenu, index) => {
                      const access = data.find((d) => d.id === subMenu.id);

                      return (
                        <Grid
                          key={subMenu.id}
                          container
                          spacing={1}
                          item
                          xs={12}
                        >
                          <Grid item xs={12}>
                            <Typography variant="subtitle2">
                              {subMenu.nama}
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
                                "data-menu-id": subMenu.id,
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
                                "data-menu-id": subMenu.id,
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
                                "data-menu-id": subMenu.id,
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
                                "data-menu-id": subMenu.id,
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
                                "data-menu-id": subMenu.id,
                              }}
                            />
                          </Grid>

                          {index + 1 < menu.sub_menu.length && (
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
  );
};

EditAccessUser.layout = (page) => (
  <AuthLayout title="Edit akses">
    <Header title="Edit akses" action={<BackButton href={route("user")} />} />
    {page}
  </AuthLayout>
);

export default EditAccessUser;
