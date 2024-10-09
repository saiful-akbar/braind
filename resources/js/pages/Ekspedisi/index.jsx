import React, { Fragment } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import Header from "@/components/Header";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { openFormCreateEkspedisi } from "@/redux/reducers/ekspedisiReducer";
import ModalFormEkspedisi from "./Partials/ModalFormEkspedisi";

/**
 * Halaman index master ekspedisi
 *
 * @param {object} props
 * @returns {React.ReactElement}
 */
const Ekspedisi = (props) => {
  const { access, app } = props;
  const { csrf } = app;
  const ekspedisi = useSelector((state) => state.ekspedisi);
  const dispatch = useDispatch();

  /**
   * Fungsi untuk membuka modal form
   * create ekspedisi.
   */
  const handleOpenFormCreate = () => {
    if (access.create) {
      dispatch(openFormCreateEkspedisi());
    }
  };

  return (
    <Fragment>
      <Header
        title="Ekspedisi"
        action={
          access?.create ? (
            <Button
              type="button"
              color="primary"
              variant="contained"
              onClick={handleOpenFormCreate}
              startIcon={<Add />}
            >
              Tambah
            </Button>
          ) : null
        }
      />

      {/* Modal form */}
      <ModalFormEkspedisi />
    </Fragment>
  );
};

Ekspedisi.layout = (page) => <AuthLayout title="Ekspedisi" children={page} />;

export default Ekspedisi;
