import SelectInput from "@/components/Input/SelectInput";
import { router, usePage } from "@inertiajs/react";
import React, { useCallback, useState } from "react";

const list = [
  {
    label: "Aktif",
    value: "aktif",
  },
  {
    label: "Dihapus",
    value: "dihapus",
  },
];

/**
 * Komponen untuk memfilter status perusahaan cukai mmea.
 *
 * @returns {React.ReactElement}
 */
const FilterStatusPerusahaanMmea = () => {
  const { params } = usePage().props.app.url;

  /**
   * State
   */
  const [value, setValue] = useState(params.status ?? "aktif");

  /**
   * fungsi untuk mengatasi ketika form diisi.
   */
  const handleInputChange = useCallback(
    (e) => {
      setValue(e.target.value);

      router.visit(route("perusahaan-mmea"), {
        method: "get",
        preserveScroll: true,
        data: {
          ...params,
          page: 1,
          status: e.target.value,
        },
      });
    },
    [params, setValue]
  );

  return (
    <SelectInput
      fullWidth
      size="small"
      label="Status"
      name="status"
      items={list}
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default FilterStatusPerusahaanMmea;
