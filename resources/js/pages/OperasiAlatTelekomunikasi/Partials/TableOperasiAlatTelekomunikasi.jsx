import DataTable from "@/components/DataTable";
import {
  openDestroyConfirmation,
  openEditForm,
  openRemoveConfirmation,
  openRestoreConfirmation,
} from "@/redux/reducers/operasiAlatTelekomunikasiReducer";
import { router, usePage } from "@inertiajs/react";
import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";

/**
 * fungsi untuk membuat daftar kolom yang akan ditampilkan pada tabel
 *
 * @param {Object} access
 * @param {string} status
 * @returns {array}
 */
const columns = (access, status) => {
  return [
    {
      field: "kantor_nama",
      label: "Nama Kantor",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "nama_barang",
      label: "Nama Barang",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "kode_barang",
      label: "Kode Barang",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "nup",
      label: "NUP",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "jenis_perangkat",
      label: "Jenis Perangkat",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "harga_perolehan",
      label: "Harga Perolehan",
      align: "right",
      format: "decimal",
      show: true,
      sort: true,
    },
    {
      field: "tahun_perolehan",
      label: "Tahun Perolehan",
      align: "right",
      format: "number",
      show: true,
      sort: true,
    },
    {
      field: "merek",
      label: "Merek",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "tipe",
      label: "Tipe",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "rentang_frekuensi",
      label: "Rentang Frekuensi",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "teknologi_digital",
      label: "Teknologi Digital",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "status",
      label: "Status",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "lokasi_penempatan",
      label: "Lokasi Penempatan",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "catatan",
      label: "Catatan",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "tanggal_input",
      label: "Tanggal Input",
      align: "left",
      format: "none",
      show: status === "aktif",
      sort: true,
    },
    {
      field: "deleted_at",
      label: "Dihapus",
      align: "left",
      format: "time",
      show: Boolean(status === "dihapus" && access.destroy),
      sort: true,
    },
  ];
};

/**
 * Komponen table data sarana operasi alat telekomunikasi.
 *
 * @returns {React.ReactElement}
 */
const TableOperasiAlatTelekomunikasi = memo(() => {
  const { app, access, data, pagination } = usePage().props;
  const { params } = app.url;
  const status = params.status ?? "aktif";
  const order = params.order ?? "asc";
  const orderBy = params.order_by ?? "kantor_nama";
  const isUpdate = access.update;
  const isRemove = access.remove;
  const isDestroy = access.destroy;
  const dispatch = useDispatch();

  /**
   * fungsi untuk fetch data sarana operasi alat telekomunikasi
   */
  const fetchData = (parameters) => {
    router.visit(route("operasi-alat-telekomunikasi"), {
      method: "get",
      data: parameters,
      preserveScroll: true,
      preserveState: true,
    });
  };

  /**
   * fungsi untuk sortir (order) tabel
   */
  const handleOrder = useCallback(
    (field) => {
      fetchData({
        ...params,
        order_by: field,
        order: Boolean(orderBy === field && order === "asc") ? "desc" : "asc",
      });
    },
    [params, orderBy, order]
  );

  /**
   * fungsi untuk menangani ketika baris perhalaman dirubah
   */
  const handleRowPerPageChange = useCallback(
    (e) => {
      fetchData({
        ...params,
        page: 1,
        per_page: e.target.value,
      });
    },
    [fetchData]
  );

  /**
   * fungsi untuk menangani ketika halaman dirubah
   */
  const handlePageChange = useCallback(
    (page) => {
      fetchData({
        ...params,
        page: page + 1,
      });
    },
    [fetchData]
  );

  /**
   * fungsi untuk membuka form edit
   */
  const handleOpenEditForm = useCallback(
    (row) => {
      dispatch(openEditForm(row));
    },
    [dispatch]
  );

  /**
   * fungsi untuk membuka modal konfirmasi remove atau destroy
   */
  const handleOpenDeleteConfirmation = useCallback(
    (type, id) => {
      if (type === "remove") {
        dispatch(openRemoveConfirmation(id));
      } else if (type === "destroy") {
        dispatch(openDestroyConfirmation(id));
      }
    },
    [dispatch]
  );

  /**
   * fungsi untuk membuka modal konfirmasi restore
   */
  const handleOpenRestoreConfirmation = useCallback(
    (id) => {
      dispatch(openRestoreConfirmation(id));
    },
    [dispatch]
  );

  return (
    <DataTable
      columns={columns(access, status)}
      data={data}
      from={pagination.from}
      order={order}
      orderBy={orderBy}
      update={Boolean(isUpdate && status === "aktif")}
      remove={Boolean(isRemove && status === "aktif")}
      destroy={Boolean(isDestroy && status === "dihapus")}
      onOrder={handleOrder}
      onUpdate={(row) => handleOpenEditForm(row)}
      onRemove={(row) => handleOpenDeleteConfirmation("remove", row.id)}
      onDestroy={(row) => handleOpenDeleteConfirmation("destroy", row.id)}
      onRestore={(row) => handleOpenRestoreConfirmation(row.id)}
      paginationProps={{
        count: pagination.total,
        page: pagination.page - 1,
        rowsPerPage: pagination.per_page,
        onRowsPerPageChange: (e) => handleRowPerPageChange(e),
        onPageChange: (e, page) => handlePageChange(page),
      }}
    />
  );
});

export default TableOperasiAlatTelekomunikasi;
