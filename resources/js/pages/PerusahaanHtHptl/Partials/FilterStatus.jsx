import SelectInput from "@/components/Input/SelectInput";
import { router, usePage } from "@inertiajs/react";
import React, { useCallback } from "react";

/**
 * List data
 */
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
 * Komponen partial perusahaan cukai HT + HPTL untuk filter status.
 *
 * @returns {React.ReactElement}
 */
const FilterStatus = () => {
  const { app } = usePage().props;
  const { params } = app.url;

  // state
  const [value, setValue] = React.useState(params.status ?? "aktif");
  const [loading, setLoading] = React.useState(false);

  /**
   * Update value
   */
  React.useEffect(() => {
    setValue(params.status ?? "aktif");
  }, [params]);

  /**
   * fungsi untuk menangani ketika form diubah
   */
  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);
      setLoading(true);

      router.visit(route("perusahaan.hthptl"), {
        method: "get",
        data: {
          ...params,
          status: e.target.value,
          page: 1,
        },
        preserveScroll: true,
        preserveState: true,
        onFinish: () => setLoading(false),
      });
    },
    [params, setValue]
  );

  return (
    <SelectInput
      fullWidth
      size="small"
      name="status"
      items={items}
      value={value}
      onChange={handleChange}
      disabled={loading}
    />
  );
};

export default FilterStatus;
