import DataTable from "@/components/DataTable";
import { usePage } from "@inertiajs/react";
import React from "react";

/**
 * Komponen tabel data master perusahaan.
 *
 * @returns {React.ReactElement}
 */
const TablePerusahaan = () => {
  const { app, access, data, pagination } = usePage().props;
  const { params } = app.url;
  const status = params.status ?? "aktif";
  const order = params.order ?? "asc";
  const orderBy = params.order_by ?? "nama";

  /**
   * Daftar kolom untuk tabel
   */
  const columns = [
    {
      field: "id",
      label: "ID",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "nama",
      label: "Nama Perusahaan",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "updated_at",
      label: "Diabuat atau diperbarui",
      align: "left",
      format: "time",
      show: status === "aktif",
      sort: true,
    },
    {
      field: "deleted_at",
      label: "Dihapus",
      align: "left",
      format: "time",
      show: Boolean(access.destroy && status === "dihapus"),
      sort: true,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      from={pagination.from}
      order={order}
      orderBy={orderBy}
      update={Boolean(access.update && status === "aktif")}
      remove={Boolean(access.remove && status === "aktif")}
      destroy={Boolean(access.destroy && status === "dihapus")}
      onOrder={() => {}}
      onUpdate={() => {}}
      onRemove={() => {}}
      onDestroy={() => {}}
      onRestore={() => {}}
      paginationProps={{
        count: pagination.total,
        page: pagination.page - 1,
        rowsPerPage: pagination.per_page,
        onPageChange: (event, page) => {},
        onRowsPerPageChange: (event) => {},
      }}
    />
  );
};

export default TablePerusahaan;
