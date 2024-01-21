import SearchInput from "@/components/Input/SearchInput";
import { router, usePage } from "@inertiajs/react";
import React from "react";

const Search = () => {
  const { params } = usePage().props.app.url;
  const searchParams = params.search ?? "";

  // state
  const [value, setValue] = React.useState(searchParams);
  const [loading, setLoading] = React.useState(false);

  /**
   * update value
   */
  React.useEffect(() => {
    setValue(searchParams);
  }, [searchParams]);

  /**
   * fungsi untuk request data
   */
  const fetchData = React.useCallback(
    (parameters) => {
      setLoading(true);

      router.visit(route("perusahaan.hthptl"), {
        method: "get",
        data: parameters,
        preserveScroll: true,
        preserveState: true,
        onFinish: () => setLoading(false),
      });
    },
    [value]
  );

  /**
   * fungsi untuk menangani ketika form diisi
   */
  const handleChange = React.useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  /**
   * fungsi untuk menangani keti form di-blur
   */
  const handleBlur = React.useCallback(() => {
    if (searchParams !== value) {
      fetchData({
        ...params,
        search: value,
        page: 1,
      });
    }
  }, [searchParams, value, fetchData, params]);

  /**
   * fungsi untuk menangani ketika form di submit.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    fetchData({
      ...params,
      search: value,
      page: 1,
    });
  };

  /**
   * fungsi untuk membersihkan form search
   */
  const handleClear = React.useCallback(() => {
    fetchData({
      ...params,
      search: "",
      page: 1,
    });
  }, [fetchData, params, setValue]);

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <SearchInput
        fullWidth
        size="small"
        label="Cari Perusahaan"
        name="search"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onClear={handleClear}
        disabled={loading}
      />
    </form>
  );
};

export default Search;
