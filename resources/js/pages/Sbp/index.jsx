import AuthLayout from "@/layouts/AuthLayout";
import React from "react";
import SbpTemplate from "./Template";
import DataTable from "@/components/DataTable";
import { useCallback } from "react";
import { router } from "@inertiajs/react";

/**
 * Halaman utama SBP
 */
const Sbp = (props) => {
  const { data, pagination, access, app } = props;
  const { params } = app.url;
  const status = params.status ?? "aktif";
  const order = params.order ?? "asc";
  const orderBy = params.order_by ?? "kantor_nama";

  const columns = [
    {
      field: "kantor_nama",
      label: "Kantor",
      align: "left",
      format: "none",
      sort: true,
      show: true,
    },
    {
      field: "user_nama_lengkap",
      label: "User",
      align: "left",
      format: "none",
      sort: true,
      show: true,
    },
    {
      field: "jumlah",
      label: "Jumlah",
      align: "left",
      format: "number",
      sort: true,
      show: true,
    },
    {
      field: "tindak_lanjut",
      label: "Tidak lanjut",
      align: "left",
      format: "number",
      sort: true,
      show: true,
    },
    {
      field: "tanggal_input",
      label: "Tanggal input",
      align: "left",
      format: "none",
      sort: true,
      show: true,
    },
    {
      field: "deleted_at",
      label: "Dihapus",
      align: "left",
      sort: true,
      format: "time",
      show: status === "dihapus",
    },
  ];

  /**
   * fungsi untuk redirect ke halaman edit
   */
  const handleUpdate = useCallback((id) => {
    router.get(
      route("sbp.edit", {
        sbp: id,
      })
    );
  }, []);

  /**
   * fungsi untuk request data SBP
   */
  const fetchData = useCallback((parameters) => {
    router.get(route("sbp"), parameters, {
      preserveScroll: true,
    });
  }, []);

  /**
   * fungsi untuk menangani sort pada tabel
   */
  const handleOrder = useCallback(
    (column) => {
      fetchData({
        ...params,
        order_by: column,
        order: orderBy === column && order === "asc" ? "desc" : "asc",
      });
    },
    [fetchData, params, order, orderBy]
  );

  /**
   * fungsi untuk mengatasi ketika halaman pada table dirubah
   */
  const handlePageChange = useCallback(
    (newPage) => {
      fetchData({
        ...params,
        page: newPage + 1,
      });
    },
    [fetchData, params]
  );

  /**
   * fungsi untuk menangani ketika baris per halaman pada tabel dirubah
   */
  const handleRowsPerPageChange = useCallback(
    (e) => {
      fetchData({
        ...params,
        page: 1,
        per_page: e.target.value,
      });
    },
    [fetchData, params]
  );

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
      onOrder={handleOrder}
      onUpdate={(row) => handleUpdate(row.id)}
      onRemove={(row) => {}}
      onDestroy={(row) => {}}
      onRestore={(row) => {}}
      paginationProps={{
        count: pagination.total,
        page: pagination.page - 1,
        rowsPerPage: pagination.per_page,
        onPageChange: (event, page) => handlePageChange(page),
        onRowsPerPageChange: (event) => handleRowsPerPageChange(event),
      }}
    />
  );
};

/**
 * Layout
 */
Sbp.layout = (page) => (
  <AuthLayout title="Master SBP">
    <SbpTemplate>{page}</SbpTemplate>
  </AuthLayout>
);

export default Sbp;
