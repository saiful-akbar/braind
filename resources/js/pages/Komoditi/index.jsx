import AuthLayout from "@/layouts/AuthLayout";
import React, { Fragment, useState } from "react";
import KomoditiTemplate from "./Template";
import DataTable from "@/components/DataTable";
import { useCallback } from "react";
import { router } from "@inertiajs/react";
import { useDispatch } from "react-redux";
import { updateKomoditi } from "@/redux/reducers/komoditiReducer";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import RestoreConfirmation from "@/components/RestoreConfirmation";

/**
 * Halaman commodity
 */
const Komoditi = (props) => {
  const { data, pagination, app, access } = props;
  const { params } = app.url;
  const order = params.order === "desc" ? "desc" : "asc";
  const orderBy = params.order_by ?? "kode";
  const status = params.status ?? "aktif";
  const dispatch = useDispatch();

  // state
  const [deleteId, setDeleteId] = useState(null);
  const [deleteType, setDeleteType] = useState("remove");
  const [deleting, setDeleting] = useState(false);

  const [restoreId, setRestoreId] = useState(null);
  const [restoring, setRestoring] = useState(false);

  const columns = [
    {
      field: "id",
      label: "ID Komoditi",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "kode",
      label: "Kode Komoditi",
      align: "left",
      format: "none",
      show: true,
      sort: true,
    },
    {
      field: "updated_at",
      label: "Dibuat atau diperbarui",
      align: "left",
      format: "time",
      show: status === "aktif",
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
   * fungsi untuk featch data commodity
   */
  const fetchData = (parameters) => {
    router.get(route("komoditi"), parameters, {
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
    [fetchData, params, orderBy, order]
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
  const handleEditRow = useCallback((row) => {
    dispatch(
      updateKomoditi({
        id: row.id,
        kode: row.kode,
      })
    );
  }, [dispatch]);

  /**
   * fungsi untuk membuka modal konfirmasi delete
   */
  const openDeleteConfirmation = useCallback(
    (type, id) => {
      setDeleteType(type);
      setDeleteId(id);
    },
    [setDeleteId, setDeleteType]
  );

  /**
   * fungsi untuk menutup modal konfirmasi delete
   */
  const closeDeleteConfirmation = useCallback(() => {
    setDeleteId(null);
  }, [setDeleteId]);

  /**
   * fungsi untuk remove data (soft delete)
   */
  const handleDelete = useCallback(() => {
    setDeleting(true);

    const url = route(`komoditi.${deleteType}`, {
      komoditi: deleteId,
      _query: {
        ...params,
        _token: app.csrf,
      },
    });

    router.delete(url, {
      preserveScroll: true,
      onFinish: () => {
        setDeleting(false);
        closeDeleteConfirmation();
      },
    });
  }, [params, deleteType, deleteId, setDeleting, closeDeleteConfirmation, app]);

  /**
   * fungsi untuk membuka modal konfirmasi restore
   */
  const openRestoreConfirmation = useCallback(
    (id) => {
      setRestoreId(id);
    },
    [setRestoreId]
  );

  /**
   * fungsi untuk menutup modal konfirmasi restore.
   */
  const closeRestoreConfirmation = useCallback(() => {
    setRestoreId(null);
  }, [setRestoreId]);

  /**
   * fungsi untuk menjalankan requet restore ke server
   */
  const handleRestore = useCallback(() => {
    setRestoring(true);

    const url = route("komoditi.restore", {
      komoditi: restoreId,
      _query: params,
    });

    const parameters = {
      _token: app.csrf,
    };

    router.patch(url, parameters, {
      preserveScroll: true,
      onFinish: () => {
        setRestoring(false);
        closeRestoreConfirmation();
      },
    });
  }, [restoreId, params, setRestoring, app, closeRestoreConfirmation]);

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
        onOrder={handleOrderTable}
        onUpdate={handleEditRow}
        onRemove={(row) => openDeleteConfirmation("remove", row.id)}
        onDestroy={(row) => openDeleteConfirmation("destroy", row.id)}
        onRestore={(row) => openRestoreConfirmation(row.id)}
        paginationProps={{
          count: pagination.total,
          page: pagination.page - 1,
          rowsPerPage: pagination.per_page,
          onPageChange: (event, page) => handlePageTableChange(event, page),
          onRowsPerPageChange: (event) => handleRowsPerPageTableChange(event),
        }}
      />

      <DeleteConfirmation
        open={Boolean(deleteId)}
        title={
          deleteType === "remove"
            ? "Hapus komoditi"
            : "Hapus komoditi selamanya"
        }
        loading={deleting}
        onClose={closeDeleteConfirmation}
        onDelete={handleDelete}
      />

      <RestoreConfirmation
        open={Boolean(restoreId)}
        title="Pulihkan komoditi"
        loading={restoring}
        onClose={closeRestoreConfirmation}
        onRestore={handleRestore}
      />
    </Fragment>
  );
};

/**
 * Layout
 */
Komoditi.layout = (page) => (
  <AuthLayout title="Kode Komoditi">
    <KomoditiTemplate>{page}</KomoditiTemplate>
  </AuthLayout>
);

export default Komoditi;
