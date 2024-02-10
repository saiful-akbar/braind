import TableActionButton from "@/components/Buttons/TableActionButton";
import CardPaper from "@/components/CardPaper";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { Link, router, usePage } from "@inertiajs/react";
import { Box, Button, CardContent, Grid } from "@mui/material";
import { saveAs } from "file-saver";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import FilterStatusUser from "./Partials/FilterStatusUser";
import SearchUser from "./Partials/SearchUser";
import { Add } from "@mui/icons-material";

/**
 * Komponen template untuk halaman user
 */
const UserTemplate = ({ children }) => {
  const { access, app } = usePage().props;
  const { params } = app.url;
  const dispatch = useDispatch();

  // state
  const [loading, setLoading] = useState(false);

  /**
   * fungsi untuk menangani export excel
   */
  const handleExport = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: "get",
        responseType: "blob",
        url: route("user.export"),
        params,
      });

      setLoading(false);
      saveAs(response.data, "braind_master_user.xlsx");
      dispatch(
        openNotification({
          status: "success",
          message: "Ekspor user berhasil",
        })
      );
    } catch (error) {
      console.dir(error);
      setLoading(false);
      dispatch(
        openNotification({
          status: "error",
          message: "Terjadi kesalahan, Ekspor user gagal.",
        })
      );
    }
  }, [setLoading, params, dispatch]);

  /**
   * fungsi untuk mengatasi ketika tombol refresh diklik
   */
  const handleReload = useCallback(() => {
    router.reload();
  }, []);

  return (
    <>
      <Header
        title="User"
        action={
          access.create ? (
            <Button
              type="button"
              color="primary"
              variant="contained"
              component={Link}
              href={route("user.create")}
              startIcon={<Add />}
            >
              Tambah
            </Button>
          ) : null
        }
      />

      <Box component="main" sx={{ mt: 5 }}>
        <CardPaper>
          <CardContent>
            <Grid container spacing={3} justifyContent="space-between">
              <Grid item md={4.5} xs={12}>
                <SearchUser />
              </Grid>

              {access.destroy && (
                <Grid item md={4.5} xs={12}>
                  <FilterStatusUser />
                </Grid>
              )}

              <Grid item md={3} xs={12}>
                <TableActionButton
                  export
                  reload
                  onExport={handleExport}
                  onReload={handleReload}
                />
              </Grid>
            </Grid>
          </CardContent>

          {children}
        </CardPaper>

        <Loader open={loading} />
      </Box>
    </>
  );
};

/**
 * Prop types
 */
UserTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserTemplate;
