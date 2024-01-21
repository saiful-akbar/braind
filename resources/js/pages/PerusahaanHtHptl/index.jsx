import React, { Fragment, useCallback, useEffect, useState } from "react";
import PerusahaanHtHptlTemplate from "./Template";
import AuthLayout from "@/layouts/AuthLayout";
import DataTable from "@/components/DataTable";
import { router } from "@inertiajs/react";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { useDispatch } from "react-redux";
import { openNotification } from "@/redux/reducers/notificationReducer";
import RestoreConfirmation from "@/components/RestoreConfirmation";

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
  const dispatch = useDispatch();

  // state
  const [deleteId, setDeleteId] = useState(null);
  const [deleteType, setDeleteType] = useState("remove");
  const [deleting, setDeleting] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState("Hapus perusahaan");
  const [restoreId, setRestoreId] = useState(null);
  const [restoring, setRestoring] = useState(false);

  /**
   * Update title delete
   */
  useEffect(() => {
    if (deleteType === "remove") {
      setDeleteTitle("Hapus perusahaan");
    } else {
      setDeleteTitle("Hapus perusahaan selamanya");
    }
  }, [deleteType]);

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
      field: "jumlah_ck",
      label: "Jumlah CK-1",
      align: "right",
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
      align: "right",
      format: "number",
      show: true,
      sort: true,
    },
    {
      field: "jumlah_cukai",
      label: "Jumlah Cukai",
      align: "right",
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

  /**
   * fungsi untuk request data
   */
  const fetchData = useCallback((parameters) => {
    router.visit(route("perusahaan.hthptl"), {
      method: "get",
      data: parameters,
      preserveScroll: true,
      preserveState: true,
    });
  }, []);

  /**
   * fungsi untuk menangai sort table
   */
  const handleOrder = useCallback(
    (field) => {
      fetchData({
        ...params,
        order_by: field,
        order: orderBy === field && order === "asc" ? "desc" : "asc",
      });
    },
    [fetchData, params, orderBy, order]
  );

  /**
   * fungsi untuk menanganik ketika halama pada table dirubah
   */
  const handlePageChange = useCallback(
    (currentPage) => {
      fetchData({
        ...params,
        page: currentPage + 1,
      });
    },
    [fetchData, params]
  );

  /**
   * fungsi untuk menangani ketika jumlah baris per halaman dirubah
   */
  const handleRowPerPageChange = useCallback(
    (e) => {
      fetchData({
        ...params,
        per_page: e.target.value,
        page: 1,
      });
    },
    [fetchData, params]
  );

  /**
   * fungsi untuk membuka dialog konfirmasi delete
   */
  const handleDeleteConfirmationOpen = useCallback(
    (type, id) => {
      setDeleteId(id);
      setDeleteType(type);
    },
    [setDeleteId, setDeleteType]
  );

  /**
   * fungsi untuk menutup dialog konfirmasi delete
   */
  const handleDeleteConfirmationClose = useCallback(() => {
    setDeleteId(null);
  }, [setDeleteId]);

  /**
   * fungsi untuk delete data perusahaan
   */
  const handleDelete = useCallback(() => {
    const url = route(`perusahaan.hthptl.${deleteType}`, {
      id: deleteId,
      _query: params,
    });

    router.visit(url, {
      preserveScroll: true,
      method: "delete",
      onStart: () => setDeleting(true),
      onFinish: () => setDeleting(false),
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesahan, perusahaan gagal dihapus.",
          })
        );
      },
    });
  }, [deleteId, deleteType, setDeleting, params]);

  /**
   * fungsi untuk membuka dialog konfirmasi restore
   */
  const handleRestoreConfirmationOpen = useCallback(
    (id) => {
      setRestoreId(id);
    },
    [setRestoreId]
  );

  /**
   * fungsi untuk menutup dialog konfirmasi restore
   */
  const handleRestoreConfirmationClose = useCallback(() => {
    setRestoreId(null);
  }, [setRestoreId]);

  /**
   * fungsi untuk restore data perusahaan
   */
  const handleRestore = useCallback(() => {
    const url = route(`perusahaan.hthptl.restore`, {
      id: restoreId,
      _query: params,
    });

    router.visit(url, {
      preserveScroll: true,
      method: "patch",
      onStart: () => setRestoring(true),
      onFinish: () => setRestoring(false),
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesahan, gagal memulihkan perusahaan.",
          })
        );
      },
    });
  }, [restoreId, setRestoring, params]);

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
        onOrder={handleOrder}
        onUpdate={() => {}}
        onRemove={(row) => handleDeleteConfirmationOpen("remove", row.id)}
        onDestroy={(row) => handleDeleteConfirmationOpen("destroy", row.id)}
        onRestore={(row) => handleRestoreConfirmationOpen(row.id)}
        paginationProps={{
          count: pagination.total,
          page: pagination.page - 1,
          rowsPerPage: pagination.per_page,
          onPageChange: (event, currentPage) => handlePageChange(currentPage),
          onRowsPerPageChange: (event) => handleRowPerPageChange(event),
        }}
      />

      {/* Komponen dialog konfirmasi delete */}
      <DeleteConfirmation
        title={deleteTitle}
        open={Boolean(deleteId !== null)}
        onClose={handleDeleteConfirmationClose}
        onDelete={handleDelete}
        loading={deleting}
      />

      {/* Komponen dialog konfirmasi restore */}
      <RestoreConfirmation
        open={Boolean(restoreId !== null)}
        title="Pulihkan perusahaan"
        onClose={handleRestoreConfirmationClose}
        onRestore={handleRestore}
        loading={restoring}
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
