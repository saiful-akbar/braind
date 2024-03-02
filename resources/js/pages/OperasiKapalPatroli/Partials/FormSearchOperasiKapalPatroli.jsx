import SearchInput from "@/components/Input/SearchInput";
import { router, usePage } from "@inertiajs/react";
import React, { memo, useCallback, useEffect, useState } from "react";

/**
 * komponen form search untuk tabel sarana operasi kapal patroli.
 *
 * @returns {React.ReactElement}
 */
const FormSearchOperasiKapalPatroli = memo(() => {
  const { app } = usePage().props;
  const { params } = app.url;
  const search = params.search ?? "";

  /**
   * State
   */
  const [value, setValue] = useState(search);
  const [processing, setProcessing] = useState(false);

  /**
   * Update state value saat ada perubahan pada params.search.
   */
  useEffect(() => {
    setValue(search);
  }, [search]);

  /**
   * fungsi untuk request data
   */
  const fetchData = useCallback(
    (searchValue) => {
      router.visit(route("operasi-kapal-patroli"), {
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
    [params, setProcessing]
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
  const handleInputBlur = useCallback(() => {
    if (search !== value) fetchData(value);
  }, [search, fetchData, value]);

  /**
   * fungsi untuk menangani ketika form di hapus
   */
  const handleInputClear = useCallback(() => {
    if (search !== "") {
      setValue("");
      fetchData("");
    }
  }, [search, fetchData, setValue]);

  /**
   * fungsi untuk menangani ketika form di submit
   */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (search !== value) fetchData(value);
    },
    [search, fetchData, value]
  );

  return (
    <form
      name="form_search"
      id="form_search"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <SearchInput
        fullWidth
        size="small"
        label="Cari"
        name="search"
        id="search"
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onClear={handleInputClear}
        disabled={processing}
      />
    </form>
  );
});

export default FormSearchOperasiKapalPatroli;
