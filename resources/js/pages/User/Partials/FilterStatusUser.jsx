import SelectInput from "@/components/Input/SelectInput";
import { router, usePage } from "@inertiajs/react";
import React, { memo } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";

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
 * Komponen filter status untuk halaman user.
 */
const FilterStatusUser = memo(() => {
  const { app } = usePage().props;
  const { params } = app.url;

  // state
  const [value, setValue] = useState(params.status ?? "aktif");

  /**
   * update status jika pada params tatus berubah
   */
  useEffect(() => {
    setValue(params.status ?? "aktif");
  }, [params?.status, setValue]);

  /**
   * fungsi untuk fetch data
   */
  const fetchData = useCallback((parameters) => {
    router.get(
      route("user", parameters, {
        preserveScroll: true,
      })
    );
  }, []);

  /**
   * Fungsi untuk mengatasi ketika status dirubah
   */
  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);
      fetchData({ ...params, page: 1, status: e.target.value });
    },
    [setValue, fetchData, params]
  );

  return (
    <SelectInput
      fullWidth
      name="status"
      label="Status"
      size="small"
      items={items}
      value={value}
      onChange={handleChange}
    />
  );
});

export default FilterStatusUser;
