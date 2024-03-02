import SelectInput from "@/components/Input/SelectInput";
import { router, usePage } from "@inertiajs/react";
import React, { memo, useCallback, useEffect, useState } from "react";

/**
 * Daftar opsi untuk form select status
 */
const options = [
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
 * Komponen form filter status sarana operasi kapal patroli.
 *
 * @returns {React.ReactElement}
 */
const FormFilterStatusOperasiKapalPatroli = memo(() => {
  const { app } = usePage().props;
  const { params } = app.url;

  /**
   * State
   */
  const [value, setValue] = useState("aktif");
  const [processing, setProcessing] = useState(false);

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
      router.visit(route("operasi-kapal-patroli"), {
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
    [params, setProcessing]
  );

  return (
    <SelectInput
      fullWidth
      size="small"
      label="Status"
      items={options}
      value={value}
      onChange={handleInputChange}
      disabled={processing}
    />
  );
});

export default FormFilterStatusOperasiKapalPatroli;
