import SearchInput from "@/components/Input/SearchInput";
import { router, usePage } from "@inertiajs/react";
import React, { useCallback, useState } from "react";

/**
 * Komponen form search data perusahaan cukai mmea.
 *
 * @returns {React.ReactElement}
 */
const FormSearchPerusahaanMmea = () => {
  const { app } = usePage().props;
  const { params } = app.url;
  const searchParams = params.search ?? "";

  /**
   * State
   */
  const [value, setValue] = useState(searchParams);

  /**
   * Fungsi untuk mengatasi ketika form diisi
   */
  const handleInputChange = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  /**
   * Fungsi untuk fetch data
   */
  const fetchData = useCallback(
    (data) => {
      router.visit(route("perusahaan-mmea"), {
        method: "get",
        preserveScroll: true,
        data: {
          ...params,
          page: 1,
          search: data,
        },
      });
    },
    [params]
  );

  /**
   * Fungsi untuk menagatasi ketika form di blur
   */
  const handleInputBlur = useCallback(
    (e) => {
      if (value !== searchParams) {
        fetchData(value);
      }
    },
    [fetchData, value, searchParams]
  );

  /**
   * Fungsi untuk mengatasi ketika form di-submit
   */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (value !== searchParams) {
        fetchData(value);
      }
    },
    [fetchData, value, searchParams]
  );

  /**
   * Fungsi untuk menghapus nilai pada form
   */
  const handleInputClear = useCallback(() => {
    if (searchParams !== "") {
      fetchData("");
    }
  }, [fetchData, searchParams]);

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <SearchInput
        fullWidth
        size="small"
        label="Cari Perusahaan"
        name="search"
        id="searchPerusahaanMmea"
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onClear={handleInputClear}
      />
    </form>
  );
};

export default FormSearchPerusahaanMmea;
