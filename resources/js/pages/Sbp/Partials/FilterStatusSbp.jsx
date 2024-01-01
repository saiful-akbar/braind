import SelectInput from "@/components/Input/SelectInput";
import { router, usePage } from "@inertiajs/react";
import React, { useCallback, useEffect, useState } from "react";

const items = [
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
 * Komponen parsial untuk filter sttaus data sbp
 */
const FilterStatusSbp = () => {
  const { app } = usePage().props;
  const { params } = app.url;
  const statusParams = params.status ?? "aktif";

  // state
  const [value, setValue] = useState(statusParams);

  /**
   * Update status
   */
  useEffect(() => {
    setValue(statusParams);
  }, [statusParams, setValue]);

  /**
   * fungsi untuk mengatasi ketika status di ubah
   */
  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);

      const url = route("sbp");
      const data = {
        ...params,
        page: 1,
        status: e.target.value,
      };

      router.get(url, data, {
        preserveScroll: true,
      });
    },
    [setValue]
  );

  return (
    <SelectInput
      fullWidth
      size="small"
      items={items}
      value={value}
      onChange={handleChange}
    />
  );
};

export default FilterStatusSbp;
