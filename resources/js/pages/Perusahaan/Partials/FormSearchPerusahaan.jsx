import SearchInput from "@/components/Input/SearchInput";
import { router, useForm, usePage } from "@inertiajs/react";
import React, { useCallback, useEffect, useState } from "react";

/**
 * Komponen form search master perusahaan.
 *
 * @returns {React.ReactElement}
 */
const FormSearchPerusahaan = () => {
  const { app } = usePage().props;
  const { params } = app.url;

  /**
   * state
   */
  const [value, setValue] = useState(params.search ?? "");
  const [processing, setProcessing] = useState(false);

  /**
   * Update value ketika ada perubahan pada params
   */
  useEffect(() => {
    setValue(params.search ?? "");
  }, [params]);

  /**
   * fungsi untuk menangani ketika form diisis
   */
  const handleInputChange = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  /**
   * fungsi untuk request data
   */
  const fetchData = useCallback(
    (searchValue = "") => {
      router.visit(route("master-perusahaan"), {
        method: "get",
        preserveScroll: true,
        preserveState: true,
        data: {
          ...params,
          page: 1,
          search: searchValue,
        },
        onStart: () => setProcessing(true),
        onFinish: () => setProcessing(false),
      });
    },
    [setProcessing, params]
  );

  /**
   * fungsi untuk menangani ketika form di-blur
   */
  const handleInputBlur = useCallback(() => {
    if (value !== (params.search ?? "")) {
      fetchData(value);
    }
  }, [fetchData, value, params]);

  /**
   * fungsi untuk menangani ketika form di-submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(value);
  };

  /**
   * fungsi untuk menangani ketika form dibersihkan
   * atau tombol clear ditekan
   */
  const handleInputClear = useCallback(() => {
    if ((params.search ?? "") !== "") {
      fetchData();
    }
  }, [fetchData, params]);

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <SearchInput
        fullWidth
        size="small"
        label="Cari Perusahaan"
        name="search"
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onClear={handleInputClear}
        disabled={processing}
      />
    </form>
  );
};

export default FormSearchPerusahaan;
