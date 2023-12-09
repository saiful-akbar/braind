import DataTable from "@/components/DataTable";
import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { router } from "@inertiajs/react";
import { Box } from "@mui/material";
import React, { useCallback } from "react";

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
        per_page: event.target.value,
      });
    },
    [params, fetchData]
  );

  const handleClick = useCallback((data) => {
    console.log("aksi", data);
  }, []);

  return (
    <Box sx={{ mt: 5 }}>
      <DataTable
        columns={columns}
        data={data}
        update
        remove
        destroy
        onUpdate={handleClick}
        onRemove={handleClick}
        onDestroy={handleClick}
        paginationProps={{
          count: pagination.total,
          page: pagination.page - 1,
          rowsPerPage: pagination.per_page,
          onPageChange: (event, page) => handleChangePage(event, page),
          onRowsPerPageChange: (event) => handleChangeRowPerPage(event),
        }}
      />
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
