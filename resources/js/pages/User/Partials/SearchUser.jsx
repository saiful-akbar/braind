import React, { memo } from "react";
import SearchInput from "@/components/Input/SearchInput";
import { router, usePage } from "@inertiajs/react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

/**
 * Komponen search user
 */
const SearchUser = memo(() => {
  const { app } = usePage().props;
  const { params } = app.url;
  const searchParams = params.search ?? "";

  // state
  const [value, setValue] = useState(searchParams);

  /**
   * Update value
   */
  useEffect(() => {
    setValue(searchParams);
  }, [searchParams, setValue]);

  /**
   * fungsi untuk fetch data user
   */
  const fetchData = useCallback((parameters) => {
    router.get(route("user"), parameters, {
      preserveScroll: true,
    });
  }, []);

  /**
   * fungsi untuk menangani ketika tombol clear diklik
   */
  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();
      setValue("");

      if (searchParams !== "") {
        fetchData({
          ...params,
          page: 1,
          search: "",
        });
      }
    },
    [searchParams, value, setValue, fetchData]
  );

  /**
   * fungsi untuk menangani ketika form diisi
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
  const handleBlur = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (searchParams !== value) {
        fetchData({
          ...params,
          page: 1,
          search: value,
        });
      }
    },
    [searchParams, value, fetchData]
  );

  /**
   * fungsi untuk menangani ketika form di-submit
   */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (searchParams !== value) {
        fetchData({
          ...params,
          page: 1,
          search: value,
        });
      }
    },
    [searchParams, value, fetchData]
  );

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <SearchInput
        fullWidth
        size="small"
        name="search"
        placeholder="Cari user..."
        value={value}
        onClear={handleClear}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </form>
  );
});

export default SearchUser;
