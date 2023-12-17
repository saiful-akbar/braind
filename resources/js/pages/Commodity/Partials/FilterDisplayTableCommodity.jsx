import SelectInput from "@/components/Input/SelectInput";
import { router, usePage } from "@inertiajs/react";
import React, { memo } from "react";
import { useCallback } from "react";
import { useState } from "react";

const items = [
  {
    label: "Aktif",
    value: "active",
  },
  {
    label: "Dihapus",
    value: "removed",
  },
];

/**
 * Komponen untuk memfilter data pada tabel commodity
 */
const FilterDisplayTableCommodity = memo(() => {
  const { app } = usePage().props;
  const { params } = app.url;
  const displayParams = params.display ?? "active";

  // state
  const [value, setValue] = useState(displayParams);

  /**
   * fungsi untuk mengatasi kerika form di-ubah
   */
  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);

      const parameters = {
        ...params,
        page: 1,
        display: e.target.value,
      };

      router.get(route("commodity"), parameters, {
        preserveScroll: true,
      });
    },
    [params, setValue]
  );

  return (
    <SelectInput
      fullWidth
      label="Filter"
      name="display"
      size="small"
      items={items}
      value={value}
      onChange={handleChange}
      inputProps={{
        sx: {
          backgroundColor: "background.paper",
        },
      }}
    />
  );
});

export default FilterDisplayTableCommodity;
