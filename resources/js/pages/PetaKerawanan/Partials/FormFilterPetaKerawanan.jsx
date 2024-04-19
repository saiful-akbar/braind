import SelectInput from "@/components/Input/SelectInput";
import { router, usePage } from "@inertiajs/react";
import React, { memo } from "react";

/**
 * options
 */
const options = [
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
 * Komponen form filter peta kerawanan
 */
const FormFilterPetaKerawanan = memo(() => {
  const { app } = usePage().props;
  const { params } = app.url;

  /**
   * State
   */
  const [value, setValue] = React.useState("gambar");

  /**
   * update value sesaat seltelah komponen dirender
   */
  React.useEffect(() => {
    const type = params?.type ?? "";

    if (type === "video") {
      setValue("video");
    }
  }, []);

  /**
   * fungsi untuk menangani ketika form di ubah
   */
  const handleInputChange = (e) => {
    setValue(e.target.value);
    router.visit(route("peta-kerawanan"), {
      method: "get",
      data: {
        ...params,
        page: 1,
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

export default FormFilterPetaKerawanan;
