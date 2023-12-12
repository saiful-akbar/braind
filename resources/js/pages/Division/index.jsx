import React, { useCallback } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import SearchInput from "@/components/Input/SearchInput";
import RefreshButton from "@/components/Buttons/RefreshButton";
import { Link, router } from "@inertiajs/react";
import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";

/**
 * Halaman Division (Kanwil)
 */
const Kanwil = (props) => {
  const { data, pagination, app, access } = props;
  const { params } = app.url;
  const searchParam = params.search ?? "";
  const order = params.order ?? "asc";
  const orderBy = params.order_by ?? "name";
  const [searchValue, setSearchValue] = useState(searchParam);

  /**
   * Daftar kolom yang akan ditampilkan pada tabel
   */
  const columns = [
    {
      field: "name",
      label: "Nama Kanwil",
      align: "left",
      sort: true,
      timeFormat: false,
      show: true,
    },
    {
      field: "created_at",
      label: "Dibuat",
      align: "left",
      sort: true,
      timeFormat: true,
      show: true,
    },
    {
      field: "updated_at",
      label: "Diperbarui",
      align: "left",
      sort: true,
      timeFormat: true,
      show: true,
    },
    {
      field: "deleted_at",
      label: "Dihapus",
      align: "left",
      sort: true,
      timeFormat: true,
      show: access.destroy,
    },
  ];

  /**
   * Fungsi untuk request (fetch) data division.
   */
  const fetchData = (parameters) => {
    router.get(route("division"), parameters, {
      preserveScroll: true,
    });
  };

  /**
   * fungsi untuk menangani ketika baris tabel dirubah.
   */
  const handleChangePage = useCallback(
    (event, page) => {
      fetchData({
        ...params,
        page: page + 1,
      });
    },
    [params, fetchData]
  );

  /**
   * fungsi untuk menangani ketika baris
   * per halamanpada tabel dirubah oleh user.
   */
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

  /**
   * fungsi untuk menangani ketika form search diisi.
   */
  const handleSearchChange = useCallback(
    (event) => {
      setSearchValue(event.target.value);
    },
    [setSearchValue]
  );

  /**
   * fungsi untuk menangani ketika form search di-submit.
   */
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

  /**
   * fungsi untuk menangani ketika form search di-blur.
   */
  const handleSearchBlur = useCallback(
    (event) => {
      if (searchParam !== searchValue) {
        fetchData({
          ...params,
          page: 1,
          search: searchValue,
        });
      }
    },
    [params, searchValue, fetchData, searchParam]
  );

  /**
   * fungsi untuk menangani ketika form search dibersihlan.
   */
  const handleSearchClear = useCallback(
    (event) => {
      event.stopPropagation();

      fetchData({
        ...params,
        page: 1,
        search: "",
      });
    },
    [params, setSearchValue, fetchData, searchParam]
  );

  /**
   * fungsi untuk menangani ketika tombol refresh diklik.
   */
  const handleRefreshClick = useCallback(() => {
    fetchData(params);
  }, [params, fetchData]);

  /**
   * fungsi untuk menangani kerika kolom di order (sort)
   */
  const handleOrder = useCallback(
    (field) => {
      fetchData({
        ...params,
        order_by: field,
        order: field === orderBy && order === "asc" ? "desc" : "asc",
      });
    },
    [fetchData, params, orderBy, order]
  );

  /**
   * [description]
   */
  const handleActionClick = useCallback((data) => {
    console.log("aksi", data);
  }, []);

  return (
    <Box sx={{ my: 5 }}>
      <Grid container spacing={3}>
        <Grid
          item
          md={4}
          xs={12}
          sx={{
            ".action-button": {
              mr: 1,
              ":last-child": {
                mr: 0,
              },
            },
          }}
        >
          {access.create && (
            <Button
              className="action-button"
              variant="contained"
              color="primary"
              component={Link}
              href={route("division.create")}
            >
              Tambah
            </Button>
          )}

          <Button className="action-button" variant="outlined" color="primary">
            Export
          </Button>

          <RefreshButton
            className="action-button"
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
              onChange={handleSearchChange}
              onBlur={handleSearchBlur}
            />
          </form>
        </Grid>

        <Grid item xs={12}>
          <DataTable
            name="Kanwil"
            columns={columns}
            data={data}
            from={pagination.from}
            to={pagination.to}
            order={order}
            orderBy={orderBy}
            update={access.update}
            remove={access.remove}
            destroy={access.destroy}
            onOrder={(field) => handleOrder(field)}
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
    <Header title="Kanwil" />
    {page}
  </AuthLayout>
);

export default Kanwil;
