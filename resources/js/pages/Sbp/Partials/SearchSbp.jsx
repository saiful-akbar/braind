import SearchInput from "@/components/Input/SearchInput";
import { router, usePage } from "@inertiajs/react";
import React, { useCallback, useState } from "react";

/**
 * Komponen parsial untuk form search sbp
 */
const SearchSbp = () => {
  const { app } = usePage().props;
  const { params } = app.url;
  const searchParams = params.search ?? "";

  // state
  const [value, setValue] = useState(searchParams);
  const [processing, setProcessing] = useState(false);

  /**
   * fungsi untuk mengatasi ketika form search diisi
   */
  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  /**
   * fungsi untul fetch data sbp
   */
  const fetchData = useCallback(
    (searchValue) => {
      setProcessing(true);

      const url = route("sbp");
      const data = {
        ...params,
        page: 1,
        search: searchValue,
      };

      router.get(url, data, {
        preserveScroll: true,
        onFinish: () => setProcessing(false),
      });
    },
    [params, setProcessing]
  );

  /**
   * fungsi untuk mengatasi ketika form di-submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchParams !== value) {
      fetchData(value);
    }
  };

  /**
   * fungsi untuk menangani ketika form di-blur
   */
  const handleBlur = useCallback(
    (e) => {
      e.preventDefault();

      if (searchParams !== value) {
        fetchData(value);
      }
    },
    [searchParams, value, fetchData]
  );

  /**
   * fungsi untuk mengatasi ketika tombol clear diklik
   */
  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();

      if (searchParams !== "") {
        setValue("");
        fetchData("");
      }
    },
    [searchParams, value, fetchData, setValue]
  );

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <SearchInput
        fullWidth
        size="small"
        label="Cari SBP"
        name="search"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onClear={handleClear}
        disabled={processing}
      />
    </form>
  );
};

export default SearchSbp;
