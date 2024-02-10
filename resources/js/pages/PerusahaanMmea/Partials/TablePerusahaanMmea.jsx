import DataTable from "@/components/DataTable";
import usePerusahaanMmea from "@/hooks/usePerusahaaMmea";
import { usePage } from "@inertiajs/react";
import React from "react";

/**
 * Komponen table untuk menampilkan data perusahaan cukai MMEA.
 *
 * @returns {React.ReactElement}
 */
const TablePerusahaanMmea = () => {
  const { app, access, pagination, data } = usePage().props;
  const { params } = app.url;
  const { table } = usePerusahaanMmea();
  const status = params.status ?? "aktif";
  const orderBy = params.order_by ?? "kantor_nama";
  const order = params.order ?? "asc";
  const isUpdate = Boolean(access.update && status === "aktif");
  const isRemove = Boolean(access.update && status === "aktif");
  const isDestroy = Boolean(access.update && status === "dihapus");

  /**
   * Dafta kolom
   */
  const columns = [
    {
      field: "kantor_nama",
      label: "Nama Kantor",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "nama_perusahaan",
      label: "Nama Perusahaan",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "nppbkc",
      label: "NPPBKC",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "jumlah_dokumen",
      label: "Jumlah Dokumen",
      align: "right",
      format: "number",
      show: true,
      sort: true,
    },
    {
      field: "jumlah_liter",
      label: "Jumlah Liter",
      align: "right",
      format: "decimal",
      show: true,
      sort: true,
    },
    {
      field: "jumlah_cukai",
      label: "Jumlah Cukai",
      align: "right",
      format: "decimal",
      show: true,
      sort: true,
    },
    {
      field: "tanggal_input",
      label: "Tanggal Input",
      align: "left",
      format: "none",
      show: true,
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
      update={isUpdate}
      remove={isRemove}
      destroy={isDestroy}
      onOrder={(field) => table.order(field)}
      onUpdate={(row) => {}}
      onRemove={(row) => {}}
      onDestroy={(row) => {}}
      onRestore={(row) => {}}
      paginationProps={{
        count: pagination.total,
        page: pagination.page - 1,
        rowsPerPage: pagination.per_page,
        onPageChange: (event, page) => table.changePage(page),
        onRowsPerPageChange: (event) => table.changeRowsPerPage(event),
      }}
    />
  );
};

export default TablePerusahaanMmea;
