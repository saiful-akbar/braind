import CardPaper from "@/components/CardPaper";
import { CardContent, Grid } from "@mui/material";
import TablePerusahaan from "./Partials/TablePerusahaan";
import PerusahaanTemplate from "./Template";
import FormSearchPerusahaan from "./Partials/FormSearchPerusahaan";
import FormFilterStatusPerusahaan from "./Partials/FormFilterStatusPerusahaan";

const Perusahaan = (props) => {
  const { access } = props;
  return (
    <CardPaper>
      <CardContent>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item md={4.5} xs={12}>
            <FormSearchPerusahaan />
          </Grid>

          {access.destroy && (
            <Grid item md={4.5} xs={12}>
              <FormFilterStatusPerusahaan />
            </Grid>
          )}

          <Grid item xs={12}>
            <TablePerusahaan />
          </Grid>
        </Grid>
      </CardContent>
    </CardPaper>
  );
};

/**
 * Layout
 */
Perusahaan.layout = (page) => <PerusahaanTemplate children={page} />;

export default Perusahaan;
