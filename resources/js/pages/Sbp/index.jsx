import AuthLayout from "@/layouts/AuthLayout";
import React, { Fragment, useState } from "react";
import SbpTemplate from "./Template";
import DataTable from "@/components/DataTable";
import { useCallback } from "react";
import { router } from "@inertiajs/react";
import { useDispatch } from "react-redux";
import { openNotification } from "@/redux/reducers/notificationReducer";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import RestoreConfirmation from "@/components/RestoreConfirmation";
import useSbp from "@/hooks/useSbp";

/**
 * Halaman utama SBP
 */
const Sbp = (props) => {
  const { data, pagination, access, app } = props;
  const { params } = app.url;
  const status = params.status ?? "aktif";
  const dispatch = useDispatch();

  const columns = [
    {
      field: "kantor_id",
      label: "ID Kantor",
      align: "left",
      format: "none",
      sort: true,
      show: true,
    },
    {
      field: "kantor_nama",
      label: "Nama Kantor",
      align: "left",
      format: "none",
      sort: true,
      show: true,
    },
    {
      field: "id",
      label: "ID SBP",
      align: "left",
      format: "none",
      sort: true,
      show: true,
    },
    {
      field: "jumlah",
      label: "Jumlah",
      align: "right",
      format: "decimal",
      sort: true,
      show: true,
    },
    {
      field: "tindak_lanjut",
      label: "Tidak lanjut",
      align: "right",
      format: "decimal",
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

  // state
  const [deleteId, setDeleteId] = useState(null);
  const [deleteType, setDeleteType] = useState("remove");
  const [deleting, setDeleting] = useState(false);
  const [restoreId, setRestoreId] = useState(null);
  const [restoring, setRestoring] = useState(false);

  const { openModalForm, table } = useSbp();

  /**
   * fungsi untuk membuka modal konfirmasi hapus
   */
  const handleOpenDeleteConfirmation = useCallback(
    (type, id) => {
      setDeleteType(type);
      setDeleteId(id);
    },
    [setDeleteType, setDeleteId]
  );

  /**
   * fungsi untuk menutup model konfirmasi hapus
   */
  const handleCloseDeleteConfirmation = useCallback(() => {
    setDeleteId(null);
    setDeleting(false);
  }, [setDeleteId, setDeleting]);

  /**
   * fungsi request untuk menghapus data sbp
   */
  const handleDelete = useCallback(() => {
    const url = route(`sbp.${deleteType}`, {
      sbp: deleteId,
      _query: params,
    });

    router.delete(url, {
      preserveScroll: true,
      onStart: () => setDeleting(true),
      onFinish: () => setDeleting(false),
      onSuccess: () => handleCloseDeleteConfirmation(),
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesalahan. Gagal menghapus SBP.",
          })
        );
      },
    });
  }, [
    deleteId,
    deleteType,
    setDeleting,
    handleCloseDeleteConfirmation,
    dispatch,
  ]);

  /**
   * fungsi untuk menutup modal konfirmasi restore
   */
  const handleCloseRestoreConfirmation = useCallback(() => {
    setRestoreId(null);
    setRestoring(false);
  }, [setRestoreId, setRestoring]);

  /**
   * fungsi untuk membuka modal konfirmasi restore
   */
  const handleOpenRestoreConfirmation = useCallback(
    (id) => {
      setRestoreId(id);
    },
    [setRestoreId]
  );

  /**
   * fungsi request untuk restore data sbp
   */
  const handleRestore = useCallback(() => {
    const url = route("sbp.restore", {
      sbp: restoreId,
      _query: params,
    });

    router.patch(url, null, {
      preserveScroll: true,
      onStart: () => setRestoring(true),
      onFinish: () => setRestoring(false),
      onSuccess: () => handleCloseRestoreConfirmation(),
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesalahan. SBP gagal dipulihkan.",
          })
        );
      },
    });
  }, [restoreId, setRestoring, handleCloseRestoreConfirmation, dispatch]);

  return (
    <Fragment>
      <DataTable
        columns={columns}
        data={data}
        from={pagination.from}
        orderBy={params.order_by ?? "kantor_nama"}
        order={params.order ?? "asc"}
        update={Boolean(access.update && status === "aktif")}
        remove={Boolean(access.remove && status === "aktif")}
        destroy={Boolean(access.destroy && status === "dihapus")}
        onOrder={table.onOrder}
        onUpdate={(row) => openModalForm(row)}
        onRemove={(row) => handleOpenDeleteConfirmation("remove", row.id)}
        onDestroy={(row) => handleOpenDeleteConfirmation("destroy", row.id)}
        onRestore={(row) => handleOpenRestoreConfirmation(row.id)}
        paginationProps={{
          count: pagination.total,
          page: pagination.page - 1,
          rowsPerPage: pagination.per_page,
          onPageChange: (event, page) => table.onPageChange(page),
          onRowsPerPageChange: (event) => table.onRowsPerPageChange(event),
        }}
      />

      <DeleteConfirmation
        title={deleteType === "remove" ? "Hapus SBP" : "Hapus SBP selamanya"}
        open={Boolean(deleteId !== null)}
        onDelete={handleDelete}
        onClose={handleCloseDeleteConfirmation}
        loading={deleting}
      />

      <RestoreConfirmation
        title="Pulihkan SBP"
        open={Boolean(restoreId !== null)}
        onRestore={handleRestore}
        onClose={handleCloseRestoreConfirmation}
        loading={restoring}
      />
    </Fragment>
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
