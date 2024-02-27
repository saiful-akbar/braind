import SearchInput from "@/components/Input/SearchInput";
import { router, usePage } from "@inertiajs/react";
import React, { memo, useCallback, useEffect, useState } from "react";

/**
 * komponen form search untuk tabel penindakan.
 *
 * @returns {React.ReactElement}
 */
const FormSearchPenindakan = memo(() => {
  const { app } = usePage().props;
  const { params } = app.url;

  /**
   * State
   */
  const [value, setValue] = useState(params.search ?? "");
  const [processing, setProcessing] = useState(false);

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
      router.visit(route("penindakan"), {
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
      setValue("");
      fetchData("");
    }
  }, [params, fetchData, setValue]);

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
        label="Cari"
        nama="search"
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onClear={handleInputClear}
        disabled={processing}
      />
    </form>
  );
});

export default FormSearchPenindakan;
