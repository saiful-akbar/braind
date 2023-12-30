import SelectInput from "@/components/Input/SelectInput";
import { router, usePage } from "@inertiajs/react";
import React, { memo } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

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
 * Komponen untuk memfilter data pada tabel komoditi
 */
const FilterStatusKomoditi = memo(() => {
  const { app } = usePage().props;
  const { params } = app.url;
  const statusParams = params.status ?? "aktif";

  // state
  const [value, setValue] = useState(statusParams);

  /**
   * Update value jika ada perubahan pada statusParams
   */
  useEffect(() => {
    setValue(statusParams);
  }, [setValue, statusParams]);

  /**
   * fungsi untuk mengatasi kerika form di-ubah
   */
  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);

      const parameters = {
        ...params,
        page: 1,
        status: e.target.value,
      };

      router.get(route("komoditi"), parameters, {
        preserveScroll: true,
      });
    },
    [params, setValue]
  );

  return (
    <SelectInput
      fullWidth
      label="Status"
      name="status"
      size="small"
      items={items}
      value={value}
      onChange={handleChange}
    />
  );
});

export default FilterStatusKomoditi;
