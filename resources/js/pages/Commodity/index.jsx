import AuthLayout from "@/layouts/AuthLayout";
import React from "react";
import CommodityTemplate from "./Template";
import DataTable from "@/components/DataTable";
import { useCallback } from "react";
import { router } from "@inertiajs/react";
import { useDispatch } from "react-redux";
import { editCommodity } from "@/redux/reducers/commodityReducer";
import DeleteConfirmationModal from "@/components/Modals/DeleteConfirmationModal";
import { useState } from "react";
import RestoreConfirmationModal from "@/components/Modals/RestoreConfirmationModal";

/**
 * Halaman commodity
 */
const Commodity = (props) => {
  const { data, pagination, app, access } = props;
  const { params } = app.url;
  const order = params.order ?? "asc";
  const orderBy = params.order_by ?? "id";
  const display = params.display ?? "active";
  const dispatch = useDispatch();

  // state
  const [deleteId, setDeleteId] = useState(null);
  const [deleteType, setDeleteType] = useState("remove");
  const [deleting, setDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  const [restoreId, setRestoreId] = useState(null);
  const [restoring, setRestoring] = useState(false);

  const columns = [
    {
      field: "id",
      label: "ID",
      align: "left",
      timeFormat: false,
      show: true,
      sort: true,
    },
    {
      field: "name",
      label: "Kode Komoditi",
      align: "left",
      timeFormat: false,
      show: true,
      sort: true,
    },
    {
      field: "updated_at",
      label: "Dibuat/Diperbarui",
      align: "left",
      timeFormat: true,
      show: display === "active",
      sort: true,
    },
    {
      field: "deleted_at",
      label: "Dihapus",
      align: "left",
      timeFormat: true,
      show: display === "removed",
      sort: true,
    },
  ];

  /**
   * fungsi untuk featch data commodity
   */
  const fetchData = (parameters) => {
    router.get(route("commodity"), parameters, {
      preserveScroll: true,
    });
  };

  /**
   * fungsi untuk menangani order (sort) tabel
   */
  const handleOrderTable = useCallback(
    (field) => {
      fetchData({
        ...params,
        order_by: field,
        order: orderBy === field && order === "asc" ? "desc" : "asc",
      });
    },
    [fetchData, params]
  );

  /**
   * fungsi untuk menangani ketika halaman pada tabel dirubah
   */
  const handlePageTableChange = useCallback(
    (e, newPage) => {
      fetchData({
        ...params,
        page: newPage + 1,
      });
    },
    [params, fetchData]
  );

  /**
   * fungsi untuk menangani ketika baris per halaman pada...
   * ...tabel dirubah.
   */
  const handleRowsPerPageTableChange = useCallback(
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
   * fungsi untuk mmebuka dialog modal untuk edit commodity
   */
  const handleEditRow = useCallback(
    (row) => {
      dispatch(
        editCommodity({
          id: row.id,
          name: row.name,
        })
      );
    },
    [dispatch]
  );

  /**
   * fungsi untuk membuka modal konfirmasi delete
   */
  const openDeleteConfirmationModal = useCallback(
    (type, id) => {
      setDeleteType(type);
      setDeleteId(id);

      if (type === "remove") {
        setDeleteMessage("Anda yakin ingin menghapus komoditi ini?");
      } else {
        setDeleteMessage(
          "Data terkait dengan komoditi ini juga akan terpengaruh. Tidakan ini tidak dapat dipulihkan kembali."
        );
      }
    },
    [setDeleteId, setDeleteType, setDeleteMessage]
  );

  /**
   * fungsi untuk menutup modal konfirmasi delete
   */
  const closeDeleteConfirmationModal = useCallback(() => {
    setDeleteId(null);
  }, [setDeleteId]);

  /**
   * fungsi untuk remove data (soft delete)
   */
  const handleDelete = useCallback(() => {
    setDeleting(true);

    const url = route(`commodity.${deleteType}`, {
      commodity: deleteId,
      _query: {
        ...params,
        _token: app.csrf,
      },
    });

    router.delete(url, {
      preserveScroll: true,
      onFinish: () => {
        setDeleting(false);
        closeDeleteConfirmationModal();
      },
    });
  }, [
    params,
    deleteType,
    deleteId,
    setDeleting,
    closeDeleteConfirmationModal,
    app,
  ]);

  /**
   * fungsi untuk membuka modal konfirmasi restore
   */
  const openRestoreConfirmationModal = useCallback(
    (id) => {
      setRestoreId(id);
    },
    [setRestoreId]
  );

  /**
   * fungsi untuk menutup modal konfirmasi restore.
   */
  const closeRestoreConfirmationModal = useCallback(() => {
    setRestoreId(null);
  }, [setRestoreId]);

  /**
   * fungsi untuk menjalankan requet restore ke server
   */
  const handleRestore = useCallback(() => {
    setRestoring(true);

    const url = route("commodity.restore", {
      commodity: restoreId,
      _query: params,
    });

    const parameters = {
      _token: app.csrf,
    };

    router.patch(url, parameters, {
      preserveScroll: true,
      onFinish: () => {
        setRestoring(false);
        closeRestoreConfirmationModal();
      },
    });
  }, [restoreId, params, setRestoring, app, closeRestoreConfirmationModal]);

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        from={pagination.from}
        to={pagination.to}
        order={order}
        orderBy={orderBy}
        update={Boolean(access.update && display === "active")}
        remove={access.remove}
        destroy={Boolean(access.destroy && display === "removed")}
        onOrder={handleOrderTable}
        onUpdate={handleEditRow}
        onRemove={(row) => openDeleteConfirmationModal("remove", row.id)}
        onDestroy={(row) => openDeleteConfirmationModal("destroy", row.id)}
        onRestore={(row) => openRestoreConfirmationModal(row.id)}
        paginationProps={{
          count: pagination.total,
          page: pagination.page - 1,
          rowsPerPage: pagination.per_page,
          onPageChange: (event, page) => handlePageTableChange(event, page),
          onRowsPerPageChange: (event) => handleRowsPerPageTableChange(event),
        }}
      />

      <DeleteConfirmationModal
        open={Boolean(deleteId)}
        title={
          deleteType === "remove"
            ? "Hapus Komoditi"
            : "Hapus Komoditi Selamanya"
        }
        loading={deleting}
        onClose={closeDeleteConfirmationModal}
        onDelete={handleDelete}
        message={deleteMessage}
      />

      <RestoreConfirmationModal
        open={Boolean(restoreId)}
        title="Pulihkan Komoditi"
        loading={restoring}
        onClose={closeRestoreConfirmationModal}
        onRestore={handleRestore}
      />
    </>
  );
};

/**
 * Layout
 */
Commodity.layout = (page) => (
  <AuthLayout title="Master Kode Komoditi">
    <CommodityTemplate>{page}</CommodityTemplate>
  </AuthLayout>
);

export default Commodity;
