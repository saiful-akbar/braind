import SelectInput from "@/components/Input/SelectInput";
import { openNotification } from "@/redux/reducers/notificationReducer";
import Kantor from "@/services/kantorService";
import { router, usePage } from "@inertiajs/react";
import React, { memo } from "react";
import { useDispatch } from "react-redux";

/**
 * Komponen filter kantor untuk halaman peta kerawanan
 */
const FormFilterKantorPetaKerawanan = memo(() => {
  const dispatch = useDispatch();
  const { app } = usePage().props;
  const { params } = app.url;
  const kantorParams = params.kantor ?? "";

  /**
   * State
   */
  const [kantor, setKantor] = React.useState([{ label: "Semua", value: "" }]);
  const [value, setValue] = React.useState("");

  /**
   * Fetch data kantor
   */
  React.useEffect(() => {
    const getAllKantor = async () => {
      try {
        const response = await Kantor.getAll();
        const data = response.data.map((kantor) => ({
          label: kantor.nama,
          value: kantor.id,
        }));

        setKantor((prevState) => prevState.concat(data));
      } catch (error) {
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesalahan, gagal mengambil data kantor.",
          })
        );
      }
    };

    getAllKantor();
  }, []);

  /**
   * Update value
   */
  React.useEffect(() => {
    if (kantor.length > 1) {
      setValue(kantorParams);
    }
  }, [kantor]);

  /**
   * fungsi untuk menangani ketika form dirubah
   */
  const handleInputChange = (e) => {
    setValue(e.target.value);

    router.visit(route("peta-kerawanan"), {
      method: "get",
      data: {
        ...params,
        page: 1,
        kantor: e.target.value,
      },
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <SelectInput
      fullWidth
      size="small"
      label="Kantor"
      name="kantor"
      value={value}
      items={kantor}
      onChange={handleInputChange}
      inputProps={{
        sx: {
          backgroundColor: "background.paper",
        },
      }}
    />
  );
});

export default FormFilterKantorPetaKerawanan;
