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
 * Komponen form untuk memfilter status master perusahaan.
 *
 * @returns {React.ReactElement}
 */
const FormFilterStatusPerusahaan = () => {
  const { app } = usePage().props;
  const { params } = app.url;

  /**
   * State
   */
  const [value, setValue] = useState(params.status ?? "aktif");
  const [processing, setProcessing] = useState(false);

  /**
   * fungsi untuk menangani ketika form dipilih
   */
  const handleInputChange = useCallback(
    (e) => {
      setValue(e.target.value);

      router.visit(route("master-perusahaan"), {
        method: "get",
        preserveScroll: true,
        preserveState: true,
        data: {
          ...params,
          page: 1,
          status: e.target.value,
        },
        onStart: () => setProcessing(true),
        onFinish: () => setProcessing(false),
      });
    },
    [setProcessing, params]
  );

  return (
    <SelectInput
      fullWidth
      size="small"
      label="Status"
      items={items}
      value={value}
      onChange={handleInputChange}
      disabled={processing}
    />
  );
};

export default FormFilterStatusPerusahaan;
