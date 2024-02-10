import SearchInput from "@/components/Input/SearchInput";
import { router, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { useCallback, useState } from "react";

/**
 * Komponen form pencarian untuk halaman division (master kanwil).
 */
const SearchFormDivision = () => {
  const { app } = usePage().props;
  const { params } = app.url;
  const searchParams = params.search ?? "";

  // state
  const [value, setValue] = useState(searchParams);
  const [processing, setProcessing] = useState(false);

  /**
   * Update value saat ada perubahan pada searchParams
   */
  useEffect(() => {
    setValue(searchParams);
  }, [searchParams]);

  /**
   * Fungsi untuk menangani ketika form diisi.
   */
  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  /**
   * fungsi untuk mengirim (fetch) data
   */
  const fetchData = (parameters) => {
    router.get(route("kantor"), parameters, {
      preserveScroll: true,
      onStart: () => setProcessing(true),
      onFinish: () => setProcessing(false),
    });
  };

  /**
   * Fungsi untuk menangani ketika form di-submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData({
      ...params,
      page: 1,
      search: value,
    });
  };

  /**
   * fungsi untuk menangani ketika form di-blur
   */
  const handleBlur = useCallback(
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
    [fetchData, value, searchParams, params]
  );

  /**
   * fungsi untuk menangani ketika tombol
   * clear pada form diklik.
   */
  const handleClear = useCallback(() => {
    if (searchParams !== "") {
      fetchData({ ...params, page: 1, search: "" });
    }
  }, [fetchData, searchParams, params, setValue]);

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <SearchInput
        fullWidth
        label="Cari kantor"
        size="small"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onClear={handleClear}
        disabled={processing}
      />
    </form>
  );
};

export default SearchFormDivision;
