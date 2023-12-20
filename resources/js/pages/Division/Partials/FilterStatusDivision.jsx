import SelectInput from "@/components/Input/SelectInput";
import { router, usePage } from "@inertiajs/react";
import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
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

const FilterStatusDivision = () => {
  const { app } = usePage().props;
  const { params } = app.url;
  const statusParams = params.status ?? "active";

  // state
  const [value, setValue] = useState(statusParams);

  /**
   * Update value jiks statusParams berubah
   */
  useEffect(() => {
    setValue(statusParams);
  }, [statusParams, setValue]);

  /**
   * fungsi untuk menangani ketika select dirubah
   */
  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);

      const parameters = {
        ...params,
        page: 1,
        status: e.target.value,
      };

      router.get(
        route("division", parameters, {
          preserveScroll: true,
        })
      );
    },
    [params, value, setValue]
  );

  return (
    <SelectInput
      fullWidth
      size="small"
      label="Status"
      value={value}
      items={items}
      onChange={handleChange}
      inputProps={{
        sx: {
          backgroundColor: "background.paper",
        },
      }}
    />
  );
};

export default FilterStatusDivision;
