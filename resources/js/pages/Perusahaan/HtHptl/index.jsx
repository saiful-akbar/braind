import React, { Fragment } from "react";
import PerusahaanHtHptlTemplate from "./Template";
import AuthLayout from "@/layouts/AuthLayout";
import DataTable from "@/components/DataTable";

/**
 * Halaman perusahaan cukai HT + HTPL
 *
 * @returns {React.ReactElement}
 */
const PerusahaanHtHptl = (props) => {
  const { data, pagination, app, access } = props;
  const { params } = app.url;
  const order = params.order === "desc" ? "desc" : "asc";
  const orderBy = params.order_by ?? "kantor_nama";
  const status = params.status ?? "aktif";

  const columns = [
    {
      field: "kantor_nama",
      label: "Kantor",
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
      field: "jumlah_ck",
      label: "Jumlah CK-1",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "jenis_bkc",
      label: "Jenis BKC",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "jumlah",
      label: "Jumlah",
      align: "left",
      format: "number",
      show: true,
      sort: true,
    },
    {
      field: "jumlah_cukai",
      label: "Jumlah Cukai",
      align: "left",
      format: "number",
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
      show: status === "dihapus",
      sort: true,
    },
  ];

  return (
    <Fragment>
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
        onRemove={(row) => {}}
        onDestroy={(row) => {}}
        onRestore={(row) => {}}
        paginationProps={{
          count: pagination.total,
          page: pagination.page - 1,
          rowsPerPage: pagination.per_page,
          onPageChange: (event, page) => {},
          onRowsPerPageChange: (event) => {},
        }}
      />
    </Fragment>
  );
};

PerusahaanHtHptl.layout = (page) => (
  <AuthLayout title="Perusahaan Cukan HT + HPTL">
    <PerusahaanHtHptlTemplate children={page} />
  </AuthLayout>
);

export default PerusahaanHtHptl;
