import React from "react";
import PropTypes from "prop-types";
import Header from "@/components/Header";
import { Link, usePage } from "@inertiajs/react";
import { Box, Button, Grid } from "@mui/material";
import { Add } from "@mui/icons-material";
import FormCommodity from "./Partials/FormCommodity";
import { useDispatch } from "react-redux";
import { addCommodity } from "@/redux/reducers/commodityReducer";

/**
 * Komponen template untuk halaman commodity.
 */
const CommodityTemplate = ({ children }) => {
  const { access } = usePage().props;
  const dispatch = useDispatch();

  /**
   * fungsi untuk membuka modal add commodity
   */
  const handleAdd = () => {
    dispatch(addCommodity());
  };

  return (
    <>
      <Header
        title="Master Kode Komoditi"
        action={
          access.create && (
            <Button
              type="button"
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleAdd}
            >
              Tambah
            </Button>
          )
        }
      />

      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>

        <FormCommodity />
      </Box>
    </>
  );
};

/**
 * Prop types
 */
CommodityTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommodityTemplate;
