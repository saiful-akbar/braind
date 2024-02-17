import DataTable from "@/components/DataTable";
import {
  openRemoveConfirmation,
  openDestroyConfirmation,
  openRestoreConfirmation,
  openEditForm,
} from "@/redux/reducers/perusahaanMmeaReducer";
import { router, usePage } from "@inertiajs/react";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

/**
 * Daftar kolom untuk tabel.
 *
 * @param {create, read, update, remove, destroy} access
 * @param {aktif, dihapus} status
 * @returns
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
};

/**
 * Komponen table untuk menampilkan data perusahaan cukai MMEA.
 *
 * @returns {React.ReactElement}
 */
const TablePerusahaanMmea = () => {
  const { app, access, pagination, data } = usePage().props;
  const { params } = app.url;
  const status = params.status ?? "aktif";
  const orderBy = params.order_by ?? "kantor_nama";
  const order = params.order ?? "asc";
  const isUpdate = Boolean(access.update && status === "aktif");
  const isRemove = Boolean(access.update && status === "aktif");
  const isDestroy = Boolean(access.update && status === "dihapus");
  const dispatch = useDispatch();

  /**
   * fungsi untuk request data perusahaan mmea
   */
  const fetchData = useCallback((parameters) => {
    router.visit(route("perusahaan-mmea"), {
      method: "get",
      data: parameters,
      preserveScroll: true,
      preserveState: true,
    });
  }, []);

  /**
   * Fungsi untuk request order table
   */
  const handleOrder = useCallback(
    (field) => {
      fetchData({
        ...params,
        order_by: field,
        order: Boolean(orderBy === field && order === "asc") ? "desc" : "asc",
      });
    },
    [fetchData, params, orderBy, order]
  );

  /**
   * Fungsi untuk merubah halaman tabel
   */
  const handlePageChange = useCallback(
    (newPage) => {
      fetchData({
        ...params,
        page: newPage + 1,
      });
    },
    [params, fetchData]
  );

  /**
   * Fungsi untuk merubah baris per halaman tabel
   */
  const handleRowsPerPageChange = useCallback(
    (e) => {
      fetchData({
        ...params,
        page: 1,
        per_page: e.target.value,
      });
    },
    [params, fetchData]
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
   * fungsi untuk membuka modal delete confirmation
   */
  const handleOpenDeleteConfirmation = useCallback(
    (id, type) => {
      dispatch(
        type === "destroy"
          ? openDestroyConfirmation(id)
          : openRemoveConfirmation(id)
      );
    },
    [dispatch]
  );

  /**
   * fungsi untuk mmebuka modal restore confimration
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
      update={isUpdate}
      remove={isRemove}
      destroy={isDestroy}
      onOrder={handleOrder}
      onUpdate={handleOpenEditForm}
      onRemove={(row) => handleOpenDeleteConfirmation(row.id, "remove")}
      onDestroy={(row) => handleOpenDeleteConfirmation(row.id, "destroy")}
      onRestore={(row) => handleOpenRestoreConfirmation(row.id)}
      paginationProps={{
        count: pagination.total,
        page: pagination.page - 1,
        rowsPerPage: pagination.per_page,
        onPageChange: (e, page) => handlePageChange(page),
        onRowsPerPageChange: (e) => handleRowsPerPageChange(e),
      }}
    />
  );
};

export default TablePerusahaanMmea;
