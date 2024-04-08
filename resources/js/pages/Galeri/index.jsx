import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
  Button,
} from "@mui/material";
import TableRowsIcon from "@mui/icons-material/TableRows";
import GridViewIcon from "@mui/icons-material/GridView";
import { router } from "@inertiajs/react";
import { Add } from "@mui/icons-material";

/**
 * Halaman galeri kantor.
 *
 * @returns {React.ReactElement}
 */
const Galeri = (props) => {
  const { access } = props;
  const [layout, setLayout] = useState("daftar");

  /**
   * update layout
   */
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const queryLayout = query.get("layout");

    if (queryLayout === "daftar" || queryLayout === "petak") {
      setLayout(queryLayout);
    }
  }, []);

  /**
   * fungsi untuk merubah layout
   */
  const handleLayoutChange = (event, value) => {
    if (value !== null) {
      setLayout(value);

      router.visit(route("galeri"), {
        method: "get",
        data: {
          layout: value,
        },
      });
    }
  };

  return (
    <Fragment>
      <Header
        title="Galeri"
        action={
          access.create && (
            <Button variant="contained" color="primary" startIcon={<Add />}>
              Tambah
            </Button>
          )
        }
      />

      <Box component="main" sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <ToggleButtonGroup
              value={layout}
              exclusive
              onChange={handleLayoutChange}
              aria-label="Layout"
            >
              <ToggleButton size="small" value="daftar">
                <Tooltip title="Tatal letak daftar" disableInteractive>
                  <TableRowsIcon />
                </Tooltip>
              </ToggleButton>

              <ToggleButton size="small" value="petak">
                <Tooltip title="Tata letak petak" disableInteractive>
                  <GridViewIcon />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

/**
 * Layout
 */
Galeri.layout = (page) => <AuthLayout title="Galeri" children={page} />;

export default Galeri;
