import DataTable from "@/components/DataTable";
import {
  openDestroyConfirmation,
  openEditForm,
  openRemoveConfirmation,
  openRestoreConfirmation,
} from "@/redux/reducers/operasiKapalPatroliReducer";
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
      field: "nomor_lambung",
      label: "Nomor Lambung",
      align: "left",
      format: "none",
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
      field: "nomor_spb",
      label: "Nomor SPB",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "tanggal_spb",
      label: "Tanggal SPB",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "penerbit_spb",
      label: "Penerbit SPB",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "jumlah_hari",
      label: "Jumlah Hari",
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
      field: "jenis_kapal",
      label: "Jenis Kapal",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "merk_tipe_mesin",
      label: "Merk Tipe Mesin",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "jumlah_mesin",
      label: "Jumlah Mesin",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "tahun_pembuatan",
      label: "Tahun Pembuatan",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "tahun_rehab",
      label: "Tahun Rehab",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "konndisi_badan_kapal",
      label: "Kondisi Badan Kapal",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "kondisi_mesin_kapal",
      label: "Kondisi Mesin Kapal",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "status_pengoperasian",
      label: "Status Pengoperasian",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "kondisi_aktif",
      label: "Kondisi Aktif",
      align: "center",
      format: "boolean",
      show: true,
      sort: true,
    },
    {
      field: "cetak",
      label: "Cetak Laporan",
      align: "center",
      format: "boolean",
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
 * Komponen table data sarana operasi kapal patroli.
 *
 * @returns {React.ReactElement}
 */
const TableOperasiKapalPatroli = memo(() => {
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
   * fungsi untuk fetch data sarana operasi kapal patroli
   */
  const fetchData = (parameters) => {
    router.visit(route("operasi-kapal-patroli"), {
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

export default TableOperasiKapalPatroli;
