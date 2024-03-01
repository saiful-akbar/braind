import SelectInput from "@/components/Input/SelectInput";
import { router, usePage } from "@inertiajs/react";
import React, { memo, useCallback, useEffect, useState } from "react";

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
 * Komponen form filter status sarana operasi alat pemindai.
 *
 * @returns {React.ReactElement}
 */
const FormFilterStatusOperasiAlatPemindai = memo(() => {
  const { app } = usePage().props;
  const { params } = app.url;

  /**
   * State
   */
  const [value, setValue] = useState("aktif");

  /**
   * Validasi params
   */
  useEffect(() => {
    const { status } = params;

    if (status === "aktif" || status === "dihapus") {
      setValue(status);
    }
  }, [params]);

  /**
   * fungsi untuk menangani ketika form diubah
   */
  const handleInputChange = useCallback(
    (e) => {
      router.visit(route("operasi-alat-pemindai"), {
        method: "get",
        preserveScroll: true,
        preserveState: true,
        data: {
          ...params,
          page: 1,
          status: e.target.value,
        },
      });
    },
    [params]
  );

  return (
    <SelectInput
      fullWidth
      size="small"
      label="Status"
      items={items}
      value={value}
      onChange={handleInputChange}
    />
  );
});

export default FormFilterStatusOperasiAlatPemindai;
