import SelectInput from "@/components/Input/SelectInput";
import BaseModal from "@/components/Modals/BaseModal";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { closeModalPerusahaanHtHptl } from "@/redux/reducers/perusahaanHtHptlReducer";
import Kantor from "@/services/kantorService";
import { useForm, usePage } from "@inertiajs/react";
import { DialogContent, Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen modal create & update partials untuk
 * halaman data perusahaan cukai HT + HPTL.
 *
 * @returns {React.ReactElement}
 */
const ModalActionHtHptl = () => {
  const dispatch = useDispatch();
  const { open, type, data } = useSelector((state) => state.perusahaanHtHptl);
  const { auth } = usePage().props;
  const { user } = auth;

  // state
  const [kantor, setKantor] = useState([]);

  // form
  const {
    data: formData,
    setData,
    processing,
    errors,
    post,
    patch,
  } = useForm(data);

  /**
   * Ambil data kantor
   */
  useEffect(() => {
    const getKantor = async () => {
      try {
        const response = await Kantor.getAll();
        const { data } = response;

        setKantor(() =>
          data.map((item) => ({
            label: item.nama,
            value: item.id,
          }))
        );
      } catch (error) {
        dispatch(
          openNotification({
            status: "error",
            message: `${error.status} - Gagal mengambil data kantor`,
          })
        );
      }
    };

    getKantor();
  }, []);

  /**
   * Fungsii untuk menutup modal dialog
   */
  const handleClose = () => {
    if (!processing) {
      dispatch(closeModalPerusahaanHtHptl());
    }
  };

  /**
   * fungsi untuk menangani ketika form diisi
   */
  const handleInputChange = useCallback(
    (e) => {
      setData(e.target.name, e.target.value);
    },
    [setData]
  );

  return (
    <BaseModal
      open={open}
      title={type === "create" ? "Tambah Perusahaan" : "Edit Perusahaan"}
      onClose={handleClose}
      maxWidth="md"
    >
      <DialogContent dividers>
        <Grid container spacing={3}>
          {user.admin && (
            <Grid item md={6} xs={12}>
              <SelectInput
                fullWidth
                label="ID Kantor"
                name="kantor_id"
                items={kantor}
                value={formData.kantor_id}
                onChange={handleInputChange}
                error={Boolean(errors.kantor_id)}
                helperText={errors.kantor_id}
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </BaseModal>
  );
};

export default ModalActionHtHptl;
