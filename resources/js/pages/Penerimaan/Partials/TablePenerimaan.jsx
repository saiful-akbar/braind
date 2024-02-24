import DataTable from "@/components/DataTable";
import {
  openDestroyConfirmation,
  openEditForm,
  openRemoveConfirmation,
  openRestoreConfirmation,
} from "@/redux/reducers/penerimaanReducer";
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
      field: "target_bea_masuk",
      label: "Target Bea Masuk",
      align: "right",
      format: "decimal",
      show: true,
      sort: true,
    },
    {
      field: "realisasi_bea_masuk",
      label: "Realisasi Bea Masuk",
      align: "right",
      format: "decimal",
      show: true,
      sort: true,
    },
    {
      field: "target_bea_keluar",
      label: "Target Bea Keluar",
      align: "right",
      format: "decimal",
      show: true,
      sort: true,
    },
    {
      field: "realisasi_bea_keluar",
      label: "Realisasi Bea Keluar",
      align: "right",
      format: "decimal",
      show: true,
      sort: true,
    },
    {
      field: "target_cukai",
      label: "Target Cukai",
      align: "right",
      format: "decimal",
      show: true,
      sort: true,
    },
    {
      field: "realisasi_cukai",
      label: "Realisasi Cukai",
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
 * Komponen table master perusahaan.
 *
 * @returns {React.ReactElement}
 */
const TablePenerimaan = memo(() => {
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
   * fungsi untuk fetch data perusahaan
   */
  const fetchData = (parameters) => {
    router.visit(route("penerimaan"), {
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

export default TablePenerimaan;
