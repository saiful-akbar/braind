import { useCallback, useState } from "react";
import DataTable from "@/components/DataTable";
import AuthLayout from "@/layouts/AuthLayout";
import { router } from "@inertiajs/react";
import Template from "./Template";
import DeleteConfirmationModal from "@/components/Modals/DeleteConfirmationModal";
import RestoreConfirmationModal from "@/components/Modals/RestoreConfirmationModal";

/**
 * Halaman kantor (Kanwil)
 */
const Kantor = (props) => {
  const { data, pagination, app, access } = props;
  const { params } = app.url;
  const order = params.order ?? "asc";
  const orderBy = params.order_by ?? "nama";
  const status = params.status ?? "aktif";

  // Daftar kolom yang akan ditampilkan pada tabel
  const columns = [
    {
      field: "id",
      label: "ID",
      align: "left",
      sort: true,
      timeFormat: false,
      show: true,
    },
    {
      field: "nama",
      label: "Nama Kantor",
      align: "left",
      sort: true,
      timeFormat: false,
      show: true,
    },
    {
      field: "updated_at",
      label: "Dibuat/Diperbarui",
      align: "left",
      sort: true,
      timeFormat: true,
      show: status === "aktif",
    },
    {
      field: "deleted_at",
      label: "Dihapus",
      align: "left",
      sort: true,
      timeFormat: true,
      show: access.destroy && status === "dihapus",
    },
  ];

  // delete state
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteType, setDeleteType] = useState("remove");

  // restore state
  const [restoreId, setRestoreId] = useState(null);
  const [restoring, setRestoring] = useState(false);

  /**
   * Fungsi untuk membuka modal delete
   */
  const openDeleteConfirmation = useCallback(
    (type, id) => {
      setDeleteType(type);
      setDeleteId(id);
    },
    [setDeleteType, setDeleteId]
  );

  /**
   * Fungsi untuk menutup modal delete
   */
  const closeDeleteConfirmation = useCallback(() => {
    setDeleting(false);
    setDeleteId(null);
  }, [setDeleteId, setDeleting]);

  /**
   * fungsi untuk mengirim request hapus (fetch)
   */
  const handleDelete = useCallback(() => {
    setDeleting(true);

    const url = route(`kantor.${deleteType}`, {
      kantor: deleteId,
      _query: params,
    });

    router.delete(url, {
      preserveScroll: true,
      onFinish: () => closeDeleteConfirmation(),
      onError: (err) => console.log(err),
    });
  }, [deleteId, deleteType, setDeleting, closeDeleteConfirmation, params]);

  /**
   * Fungsi untuk membuka modal restore
   */
  const openRestoreConfirmation = useCallback(
    (id) => {
      setRestoreId(id);
    },
    [setRestoreId]
  );

  /**
   * Fungsi untuk menutup modal restore
   */
  const closeRestoreConfirmation = useCallback(() => {
    setRestoring(false);
    setRestoreId(null);
  }, [setRestoreId, setRestoring]);

  /**
   * fungsi untuk mengirim request reqtore (festh)
   */
  const handleRestore = useCallback(() => {
    setRestoring(true);

    const url = route("kantor.restore", {
      kantor: restoreId,
      _query: params,
    });

    router.patch(url, null, {
      preserveScroll: true,
      onFinish: () => closeRestoreConfirmation(),
    });
  }, [restoreId, setRestoring, params, closeRestoreConfirmation]);

  /**
   * Fungsi untuk request (fetch) data kantor.
   */
  const fetchData = (parameters) => {
    router.get(route("kantor"), parameters, {
      preserveScroll: true,
    });
  };

  /**
   * fungsi untuk menangani ketika baris tabel dirubah.
   */
  const handleChangePage = useCallback(
    (event, page) => {
      fetchData({ ...params, page: page + 1 });
    },
    [params, fetchData]
  );

  /**
   * fungsi untuk menangani ketika baris
   * per halamanpada tabel dirubah oleh user.
   */
  const handleChangeRowPerPage = useCallback(
    (e) => {
      const { value } = e.target;
      fetchData({ ...params, page: 1, per_page: value });
    },
    [params, fetchData]
  );

  /**
   * fungsi untuk menangani kerika kolom di order (sort)
   */
  const handleOrder = useCallback(
    (field) => {
      fetchData({
        ...params,
        order_by: field,
        order: field === orderBy && order === "asc" ? "desc" : "asc",
      });
    },
    [fetchData, params, orderBy, order]
  );

  /**
   * fungsi untuk menangani ketika button edit diklik.
   */
  const handleUpdate = useCallback((row) => {
    router.get(
      route("kantor.edit", {
        kantor: row.id,
      })
    );
  }, []);

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        from={pagination.from}
        to={pagination.to}
        order={order}
        orderBy={orderBy}
        update={Boolean(access.update && status === "aktif")}
        remove={access.remove}
        destroy={Boolean(access.destroy && status === "dihapus")}
        onOrder={(field) => handleOrder(field)}
        onUpdate={handleUpdate}
        onRemove={(row) => openDeleteConfirmation("remove", row.id)}
        onDestroy={(row) => openDeleteConfirmation("destroy", row.id)}
        onRestore={(row) => openRestoreConfirmation(row.id)}
        paginationProps={{
          count: pagination.total,
          page: pagination.page - 1,
          rowsPerPage: pagination.per_page,
          onPageChange: (event, page) => handleChangePage(event, page),
          onRowsPerPageChange: (event) => handleChangeRowPerPage(event),
        }}
      />

      <DeleteConfirmationModal
        open={Boolean(deleteId)}
        title={
          deleteType === "remove" ? "Hapus kantor" : "Hapus kantor selamanya"
        }
        loading={deleting}
        onClose={closeDeleteConfirmation}
        onDelete={handleDelete}
      />

      <RestoreConfirmationModal
        open={Boolean(restoreId)}
        title="Pulihkan Kantor"
        loading={restoring}
        onClose={closeRestoreConfirmation}
        onRestore={handleRestore}
      />
    </>
  );
};

/**
 * Layout
 */
Kantor.layout = (page) => (
  <AuthLayout title="Kantor">
    <Template children={page} />
  </AuthLayout>
);

export default Kantor;
