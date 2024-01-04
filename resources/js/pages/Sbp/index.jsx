import AuthLayout from "@/layouts/AuthLayout";
import React, { Fragment, useState } from "react";
import SbpTemplate from "./Template";
import DataTable from "@/components/DataTable";
import { useCallback } from "react";
import { router } from "@inertiajs/react";
import DeleteConfirmationModal from "@/components/Modals/DeleteConfirmationModal";
import { useDispatch } from "react-redux";
import { openNotification } from "@/redux/reducers/notificationReducer";
import RestoreConfirmationModal from "@/components/Modals/RestoreConfirmationModal";

/**
 * Halaman utama SBP
 */
const Sbp = (props) => {
  const { data, pagination, access, app } = props;
  const { params } = app.url;
  const status = params.status ?? "aktif";
  const order = params.order ?? "asc";
  const orderBy = params.order_by ?? "kantor_nama";
  const dispatch = useDispatch();

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

  // state
  const [deleteId, setDeleteId] = useState(null);
  const [deleteType, setDeleteType] = useState("remove");
  const [deleting, setDeleting] = useState(false);

  const [restoreId, setRestoreId] = useState(null);
  const [restoring, setRestoring] = useState(false);

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
  const handleDelete = useCallback(async () => {
    setDeleting(true);

    try {
      const response = await axios({
        method: "delete",
        data: {
          _token: app.csrf,
        },
        url: route(`sbp.${deleteType}`, {
          sbp: deleteId,
        }),
      });

      if (response.status === 200) {
        router.reload();
        setDeleting(false);
        handleCloseDeleteConfirmation();
        dispatch(
          openNotification({
            status: "success",
            message: "Data SBP berhasil dihapus.",
          })
        );
      }
    } catch (error) {
      setDeleting(false);
      dispatch(
        openNotification({
          status: "error",
          message: "Terjadi kesalahan, gagal menghpaus data SBP",
        })
      );
    }
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
  const handleRestore = useCallback(async () => {
    setRestoring(true);

    try {
      const response = await axios({
        method: "patch",
        data: {
          _token: app.csrf,
        },
        url: route(`sbp.restore`, {
          sbp: restoreId,
        }),
      });

      if (response.status === 200) {
        router.reload();
        setRestoring(false);
        handleCloseRestoreConfirmation();
        dispatch(
          openNotification({
            status: "success",
            message: "Data SBP berhasil dipulihkan.",
          })
        );
      }
    } catch (error) {
      setRestoring(false);
      dispatch(
        openNotification({
          status: "error",
          message: "Terjadi kesalahan, gagal memulihkan data SBP",
        })
      );
    }
  }, [restoreId, setRestoring, handleCloseRestoreConfirmation, dispatch]);

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
        onUpdate={(row) => handleUpdate(row.id)}
        onRemove={(row) => handleOpenDeleteConfirmation("remove", row.id)}
        onDestroy={(row) => handleOpenDeleteConfirmation("destroy", row.id)}
        onRestore={(row) => handleOpenRestoreConfirmation(row.id)}
        paginationProps={{
          count: pagination.total,
          page: pagination.page - 1,
          rowsPerPage: pagination.per_page,
          onPageChange: (event, page) => handlePageChange(page),
          onRowsPerPageChange: (event) => handleRowsPerPageChange(event),
        }}
      />

      <DeleteConfirmationModal
        title={deleteType === "remove" ? "Hapus SBP" : "Hapus SBP selamanya"}
        open={Boolean(deleteId !== null)}
        onDelete={handleDelete}
        onClose={handleCloseDeleteConfirmation}
        loading={deleting}
      />

      <RestoreConfirmationModal
        title="Pulihkan data SBP"
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
