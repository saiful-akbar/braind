import DataTable from "@/components/DataTable";
import {
  openDestroyConfirmation,
  openEditForm,
  openRemoveConfirmation,
  openRestoreConfirmation,
} from "@/redux/reducers/operasiAlatPemindaiReducer";
import { router, usePage } from "@inertiajs/react";
import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";

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
      field: "pemindai",
      label: "Pemindai",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "nama_alat",
      label: "Nama ALat",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "ukuran",
      label: "Ukuran",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "merek",
      label: "merek",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "tipe",
      label: "tipe",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "nomor_seri",
      label: "Nomor Seri",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "tampilan",
      label: "Tampilan",
      align: "left",
      format: "none",
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
      field: "kondisi",
      label: "Kondisi",
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
      field: "jam_operasi",
      label: "Jam Operasi",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "jam_pemindaian",
      label: "Jam Pemindaian",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "jumlah_pemindaian",
      label: "Jumlah Pemindaian",
      align: "right",
      format: "number",
      show: true,
      sort: true,
    },
    {
      field: "hasil_keluaran",
      label: "Hasil Keluaran",
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
 * Komponen table data penindakan.
 *
 * @returns {React.ReactElement}
 */
const TableOperasiAlatPemindai = memo(() => {
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
   * fungsi untuk fetch data sarana operasi alat pemindai
   */
  const fetchData = (parameters) => {
    router.visit(route("operasi-alat-pemindai"), {
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
   * fungsi untuk membuka modal konfirmasi hapus
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

export default TableOperasiAlatPemindai;
