import SelectInput from "@/components/Input/SelectInput";
import { router, usePage } from "@inertiajs/react";
import React, { memo } from "react";

/**
 * options
 */
const options = [
  {
    label: "Semua",
    value: "",
  },
  {
    label: "Gambar",
    value: "gambar",
  },
  {
    label: "Video",
    value: "video",
  },
];

/**
 * Komponen form filter galeri
 */
const FormFilterGaleri = memo(() => {
  const { app } = usePage().props;
  const { params } = app.url;

  /**
   * State
   */
  const [value, setValue] = React.useState("");

  /**
   * update value sesaat seltelah komponen dirender
   */
  React.useEffect(() => {
    const type = params?.type ?? "";

    if (type === "gambar" || type === "video") {
      setValue(type);
    }
  }, []);

  /**
   * fungsi untuk menangani ketika form di ubah
   */
  const handleInputChange = (e) => {
    setValue(e.target.value);
    router.visit(route("galeri"), {
      method: "get",
      data: {
        ...params,
        type: e.target.value,
      },
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <SelectInput
      fullWidth
      size="small"
      label="Tipe"
      items={options}
      name="type"
      value={value}
      onChange={handleInputChange}
      inputProps={{
        sx: {
          backgroundColor: "background.paper",
        },
      }}
    />
  );
});

export default FormFilterGaleri;
