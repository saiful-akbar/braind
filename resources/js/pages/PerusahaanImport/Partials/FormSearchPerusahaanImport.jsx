import SearchInput from "@/components/Input/SearchInput";
import { router, usePage } from "@inertiajs/react";
import React, { memo, useCallback, useEffect, useState } from "react";

/**
 * komponen form search untuk tabel master perusahaan.
 *
 * @returns {React.ReactElement}
 */
const FormSearchPerusahaanImport = memo(() => {
  const { app } = usePage().props;
  const { params } = app.url;

  /**
   * State
   */
  const [value, setValue] = useState(params.search ?? "");

  /**
   * Update value
   */
  useEffect(() => {
    setValue(params.search ?? "");
  }, [params]);

  /**
   * fungsi untuk request data
   */
  const fetchData = useCallback(
    (searchValue) => {
      router.visit(route("perusahaan-import"), {
        method: "get",
        preserveScroll: true,
        preserveState: true,
        data: {
          ...params,
          page: 1,
          search: searchValue,
        },
      });
    },
    [params]
  );

  /**
   * fungsi untuk menangani ketika form di isi.
   */
  const handleInputChange = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  /**
   * fungsi untuk menangani ketika form di blur
   */
  const handleInputBlur = useCallback(
    (e) => {
      if ((params.search ?? "") !== value) {
        fetchData(value);
      }
    },
    [params, fetchData, value]
  );

  /**
   * fungsi untuk menangani ketika form di hapus
   */
  const handleInputClear = useCallback(() => {
    if ((params.search ?? "") !== "") {
      fetchData("");
    }
  }, [params, fetchData]);

  /**
   * fungsi untuk menangani ketika form di submit
   */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if ((params.search ?? "") !== value) {
        fetchData(value);
      }
    },
    [params, fetchData, value]
  );

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <SearchInput
        fullWidth
        size="small"
        label="Cari Perusahaan"
        nama="search"
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onClear={handleInputClear}
      />
    </form>
  );
});

export default FormSearchPerusahaanImport;
