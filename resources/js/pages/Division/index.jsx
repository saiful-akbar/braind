import DataTable from "@/components/DataTable";
import Header from "@/components/Header";
import SearchInput from "@/components/Input/SearchInput";
import RefreshButton from "@/components/MyButton/RefreshButton";
import AuthLayout from "@/layouts/AuthLayout";
import { router } from "@inertiajs/react";
import { Box, Button, Grid } from "@mui/material";
import React, { useCallback } from "react";
import { useState } from "react";

/**
 * Daftar kolom yang akan ditampilkan pada tabel
 */
const columns = [
  {
    field: "id",
    label: "ID",
    align: "left",
    sort: true,
    timeFormat: false,
  },
  {
    field: "name",
    label: "Nama Kanwil",
    align: "left",
    sort: true,
    timeFormat: false,
  },
  {
    field: "created_at",
    label: "Dibuat",
    align: "left",
    sort: true,
    timeFormat: true,
  },
  {
    field: "updated_at",
    label: "Diperbarui",
    align: "left",
    sort: true,
    timeFormat: true,
  },
];

/**
 * Halaman Division (Kanwil)
 */
const Kanwil = (props) => {
  const { data, pagination, app } = props;
  const { params } = app.url;
  const [searchValue, setSearchValue] = useState(params.search ?? "");

  // Fungsi untuk request (fetch) data division.
  const fetchData = (parameters) => {
    router.get(route("division"), parameters, {
      preserveScroll: true,
    });
  };

  // fungsi untuk menangani ketika baris tabel dirubah.
  const handleChangePage = useCallback(
    (event, page) => {
      fetchData({
        ...params,
        page: page + 1,
      });
    },
    [params, fetchData]
  );

  // fungsi untuk menangani ketika baris per halaman
  // pada tabel dirubah oleh user.
  const handleChangeRowPerPage = useCallback(
    (event) => {
      fetchData({
        ...params,
        page: 1,
        per_page: event.target.value,
      });
    },
    [params, fetchData]
  );

  // fungsi untuk menangani ketika form search diisi.
  const handleSearchChange = useCallback(
    (event) => {
      setSearchValue(event.target.value);
    },
    [setSearchValue]
  );

  // fungsi untuk menangani ketika form search di-submit
  const handleSearchSubmit = useCallback(
    (event) => {
      event.preventDefault();
      fetchData({
        ...params,
        page: 1,
        search: searchValue,
      });
    },
    [params, searchValue, fetchData]
  );

  // fungsi untuk menangani ketika form search di-blur
  const handleSearchBlur = useCallback(
    (event) => {
      const searchParam = params.search ?? "";

      if (searchParam !== searchValue) {
        fetchData({
          ...params,
          page: 1,
          search: searchValue,
        });
      }
    },
    [params, searchValue, fetchData]
  );

  // fungsi untuk menangani ketika form search dibersihlan.
  const handleSearchClear = useCallback(() => {
    if (!params.search || params.search === "") {
      setSearchValue("");
    } else {
      fetchData({
        ...params,
        page: 1,
        search: "",
      });
    }
  }, [params, setSearchValue, fetchData]);

  // fungsi untuk menangani ketika
  // tombol refresh diklik
  const handleRefreshClick = useCallback(() => {
    fetchData(params);
  }, [params, fetchData]);

  const handleActionClick = useCallback((data) => {
    console.log("aksi", data);
  }, []);

  return (
    <Box sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        <Grid
          item
          md={4}
          xs={12}
          sx={{
            ".buttonAction": {
              mr: 1,
              ":last-child": {
                mr: 0,
              },
            },
          }}
        >
          <Button className="buttonAction" variant="contained" color="primary">
            Tambah Kanwil
          </Button>

          <RefreshButton
            className="buttonAction"
            onClick={handleRefreshClick}
          />
        </Grid>

        <Grid item md={8} xs={12}>
          <form onSubmit={handleSearchSubmit} autoComplete="off">
            <SearchInput
              fullWidth
              placeholder="Cari berdasarkan nama kanwil..."
              size="small"
              value={searchValue}
              onClear={handleSearchClear}
              onBlur={handleSearchBlur}
              onChange={handleSearchChange}
            />
          </form>
        </Grid>

        <Grid item xs={12}>
          <DataTable
            name="Kanwil"
            columns={columns}
            data={data}
            update
            remove
            destroy
            onUpdate={handleActionClick}
            onRemove={handleActionClick}
            onDestroy={handleActionClick}
            paginationProps={{
              count: pagination.total,
              page: pagination.page - 1,
              rowsPerPage: pagination.per_page,
              onPageChange: (event, page) => handleChangePage(event, page),
              onRowsPerPageChange: (event) => handleChangeRowPerPage(event),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

/**
 * Layout
 */
Kanwil.layout = (page) => (
  <AuthLayout title="Kanwil">
    <Header title="Kanwil">{page}</Header>
  </AuthLayout>
);

export default Kanwil;
