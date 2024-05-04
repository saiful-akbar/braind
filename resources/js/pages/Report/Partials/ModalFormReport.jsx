import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";
import TextInput from "@/components/Input/TextInput";
import Modal from "@/components/Modal";
import { closeForm } from "@/redux/reducers/reportReducer";
import dateFormat from "@/utils";
import { useForm } from "@inertiajs/react";
import { Button, DialogActions, DialogContent, Stack } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Daftar bulan
 */
const monthOptions = [
  {
    label: "Januari",
    value: "Januari",
  },
  {
    label: "Februari",
    value: "Februari",
  },
  {
    label: "Maret",
    value: "Maret",
  },
  {
    label: "April",
    value: "April",
  },
  {
    label: "Mei",
    value: "Mei",
  },
  {
    label: "Juni",
    value: "Juni",
  },
  {
    label: "Juli",
    value: "Juli",
  },
  {
    label: "Agustus",
    value: "Agustus",
  },
  {
    label: "September",
    value: "September",
  },
  {
    label: "Oktober",
    value: "Oktober",
  },
  {
    label: "November",
    value: "November",
  },
  {
    label: "Desember",
    value: "Desember",
  },
];

/**
 * Komponen modal form report sarana operasi.
 *
 * @returns {React.ReactElement}
 */
const ModalFormReport = () => {
  const dispatch = useDispatch();
  const {
    open,
    title,
    route: routeName,
  } = useSelector((state) => state.report.form);

  /**
   * form data
   */
  const { data, setData } = useForm({
    nomor: "",
    bulan_pelaporan: "",
    tahun_pelaporan: "",
    tanggal_cetak: "",
  });

  /**
   * Hapus form data jika modal dibuka kembali
   */
  useEffect(() => {
    if (open) {
      setData({
        nomor: "",
        bulan_pelaporan: "",
        tahun_pelaporan: "",
        tanggal_cetak: "",
      });
    }
  }, [open]);

  /**
   * fungsi untuk menutup modal form.
   */
  const handleClose = () => {
    dispatch(closeForm());
  };

  /**
   * fungsi untuk menangani ketika form diisi.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  /**
   * fungsi untuk menangani ketika form bertipe date diisi.
   */
  const handleDateChange = (name, dateValue) => {
    setData(name, dateFormat(dateValue));
  };

  /**
   * fungsi untuk menangani ketika form di submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    window.open(
      route(routeName, {
        _query: data,
      })
    );
  };

  return (
    <Modal
      open={open}
      maxWidth="sm"
      title={title}
      onClose={handleClose}
      component="form"
      onSubmit={handleSubmit}
    >
      <DialogContent dividers sx={{ py: 3 }}>
        <Stack spacing={3} direction="column">
          <TextInput
            required
            type="text"
            label="Nomor"
            name="nomor"
            value={data.nomor}
            onChange={handleInputChange}
          />

          <SelectInput
            required
            label="Bulan Pelaporan"
            name="bulan_pelaporan"
            items={monthOptions}
            value={data.bulan_pelaporan}
            onChange={handleInputChange}
          />

          <TextInput
            required
            type="number"
            label="Tahun Pelaporan"
            name="tahun_pelaporan"
            value={data.tahun_pelaporan}
            onChange={handleInputChange}
          />

          <DateInput
            required
            label="Tanggal Cetak"
            value={dayjs(data.tanggal_cetak)}
            onChange={(value) => handleDateChange("tanggal_cetak", value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button type="submit" color="primary" variant="contained">
          Buat Laporan
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default ModalFormReport;
