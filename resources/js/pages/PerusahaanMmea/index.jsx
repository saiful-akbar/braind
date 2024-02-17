import CardPaper from "@/components/CardPaper";
import { CardContent, Grid } from "@mui/material";
import React, { useCallback } from "react";
import FilterPeriodPerusahaanMmea from "./Partials/FilterPeriodPerusahaanMmea";
import TablePerusahaanMmea from "./Partials/TablePerusahaanMmea";
import PerusahaanMmeaTemplate from "./Template";
import FormSearchPerusahaanMmea from "./Partials/FormSearchPerusahaanMmea";
import FilterStatusPerusahaanMmea from "./Partials/FilterStatusPerusahaanMmea";
import TableActionButton from "@/components/Buttons/TableActionButton";
import { router } from "@inertiajs/react";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/redux/reducers/loadingReducer";
import { saveAs } from "file-saver";
import { openNotification } from "@/redux/reducers/notificationReducer";

/**
 * Halaman perusahaan cukai MMEA.
 *
 * @returns {React.ReactElement}
 */
const PerusahaanMmea = (props) => {
  const { access, app } = props;
  const { params } = app.url;
  const dispatch = useDispatch();

  /**
   * fungsi untuk reload table
   */
  const handleReload = useCallback(() => {
    router.reload();
  }, []);

  /**
   * fungsi untuk export excel
   */
  const handleExport = useCallback(async () => {
    dispatch(openLoading());

    try {
      const response = await axios({
        method: "get",
        url: route("perusahaan-mmea.export"),
        params,
        responseType: "blob",
      });

      if (response.status === 200) {
        saveAs(response.data, "perusahaan_mmea_export.xlsx");
        dispatch(closeLoading());
        dispatch(
          openNotification({
            status: "success",
            message: "Export berhasil.",
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(closeLoading());
      dispatch(
        openNotification({
          status: "error",
          message: "Terjadi kesalahan. export gagal.",
        })
      );
    }
  }, [params]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FilterPeriodPerusahaanMmea />
      </Grid>

      <Grid item xs={12}>
        <CardPaper>
          <CardContent>
            <Grid container spacing={3} justifyContent="space-between">
              <Grid item xs={12} md={4.5}>
                <FormSearchPerusahaanMmea />
              </Grid>

              {access.destroy && (
                <Grid item xs={12} md={4.5}>
                  <FilterStatusPerusahaanMmea />
                </Grid>
              )}

              <Grid item xs={12} md={3}>
                <TableActionButton
                  reload
                  export
                  import={access.create}
                  onReload={handleReload}
                  onExport={handleExport}
                  onImport={() => {}}
                />
              </Grid>

              <Grid item xs={12}>
                <TablePerusahaanMmea />
              </Grid>
            </Grid>
          </CardContent>
        </CardPaper>
      </Grid>
    </Grid>
  );
};

/**
 * Layout
 */
PerusahaanMmea.layout = (page) => (
  <PerusahaanMmeaTemplate>{page}</PerusahaanMmeaTemplate>
);

export default PerusahaanMmea;
