import SearchInput from "@/components/Input/SearchInput";
import { router, usePage } from "@inertiajs/react";
import React, { memo } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

/**
 * Komponen search tabel untuk halaman komoditi
 */
const SearchKomoditi = memo(() => {
  const { app } = usePage().props;
  const { params } = app.url;
  const searchParams = params.search ?? "";

  // state
  const [value, setValue] = useState(searchParams);
  const [loading, setLoading] = useState(false);

  /**
   * update value jika ada perubahan pada searchParams
   */
  useEffect(() => {
    setValue(searchParams);
  }, [searchParams, setValue]);

  /**
   * fungsi untuk mengirim request ke server (fetch data)
   */
  const fetchData = (parameters) => {
    setLoading(true);

    router.get(route("komoditi"), parameters, {
      preserveScroll: true,
      onFinish: () => setLoading(false),
    });
  };

  /**
   * fungsi untuk mengatasi ketika form diisi.
   */
  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  /**
   * fungsi untuk menangani ketika form di-blur
   */
  const handleBlur = useCallback(() => {
    if (value !== searchParams) {
      fetchData({
        ...params,
        page: 1,
        search: value,
      });
    }
  }, [searchParams, value, fetchData, params]);

  /**
   * fungsi untuk menghapus search
   */
  const handleClear = useCallback(() => {
    if (searchParams !== "") {
      setValue("");
      fetchData({ ...params, page: 1, search: "" });
    }
  }, [fetchData, params, searchParams, setValue]);

  /**
   * fungsi untuk menangani ketika form di-submit
   */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (value !== searchParams) {
        fetchData({
          ...params,
          page: 1,
          search: value,
        });
      }
    },
    [fetchData, params, value, searchParams]
  );

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <SearchInput
        fullWidth
        size="small"
        name="search"
        placeholder="Cari berdasarkan kode komoditi..."
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onClear={handleClear}
        disabled={loading}
      />
    </form>
  );
});

export default SearchKomoditi;
