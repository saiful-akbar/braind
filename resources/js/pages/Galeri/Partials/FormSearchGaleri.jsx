import SearchInput from "@/components/Input/SearchInput";
import { router, usePage } from "@inertiajs/react";
import React, { memo } from "react";

/**
 * Komponen form search untuk galeri
 */
const FormSearchGaleri = memo(() => {
  const { app } = usePage().props;
  const { params } = app.url;
  const searchValue = params.search ?? "";

  /**
   * State
   */
  const [value, setValue] = React.useState(searchValue);

  /**
   * fungsi untuk menangani ketika form diisi
   */
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  /**
   * fungsi untuk request data
   */
  const fetchData = (parameters) => {
    router.visit(route("galeri"), {
      method: "get",
      data: parameters,
      preserveScroll: true,
      preserveState: true,
    });
  };

  /**
   * fungsi untuk menangani ketika form diblur
   */
  const handleInputBlur = () => {
    if (value !== searchValue) {
      fetchData({ ...params, search: value });
    }
  };

  /**
   * fungsi untuk menangani ketika form dibersihkan
   */
  const handleInputClear = () => {
    if (searchValue !== "") {
      setValue("");
      fetchData({ ...params, search: "" });
    }
  };

  /**
   * fungsi untuk menangani ketika form di submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData({ ...params, search: value });
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <SearchInput
        fullWidth
        size="small"
        label="Cari"
        name="search"
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onClear={handleInputClear}
        InputProps={{
          sx: {
            backgroundColor: "background.paper",
          },
        }}
      />
    </form>
  );
});

export default FormSearchGaleri;
