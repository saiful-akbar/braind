import { useCallback, useState } from "react";
import DataTable from "@/components/DataTable";
import AuthLayout from "@/layouts/AuthLayout";
import { router } from "@inertiajs/react";
import Template from "./Template";
import DeleteConfirmationModal from "@/components/Modals/DeleteConfirmationModal";
import RestoreConfirmationModal from "@/components/Modals/RestoreConfirmationModal";

/**
 * Halaman Division (Kanwil)
 */
const Kanwil = (props) => {
  const { data, pagination, app, access } = props;
  const { params } = app.url;
  const order = params.order ?? "asc";
  const orderBy = params.order_by ?? "name";
  const display = params.display ?? "active";

  // Daftar kolom yang akan ditampilkan pada tabel
  const columns = [
    {
      field: "name",
      label: "Nama Kanwil",
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
      show: display === "active",
    },
    {
      field: "deleted_at",
      label: "Dihapus",
      align: "left",
      sort: true,
      timeFormat: true,
      show: access.destroy && display === "removed",
    },
  ];

  // delete state
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteType, setDeleteType] = useState("remove");
  const [deleteMessage, setDeleteMessage] = useState(
    "anda yakin ingin menghapus item ini?"
  );

  // restore state
  const [restoreId, setRestoreId] = useState(null);
  const [restoring, setRestoring] = useState(false);

  /**
   * Fungsi untuk membuka modal delete
   */
  const handleOpenModalDelete = useCallback(
    (type, id) => {
      setDeleteType(type);
      setDeleteId(id);

      if (type === "remove") {
        setDeleteMessage("Anda yakin ingin mengapus item ini?");
      } else {
        setDeleteMessage(
          "Anda yakin ingin menghapus item ini selamanya? data yang terhubung dengan item ini juga akan terpengaruh. Tidakan ini tidak dapat dipulihkan."
        );
      }
    },
    [setDeleteType, setDeleteId, setDeleteMessage]
  );

  /**
   * Fungsi untuk menutup modal delete
   */
  const handleCloseModalDelete = useCallback(() => {
    setDeleting(false);
    setDeleteId(null);
  }, [setDeleteId, setDeleting]);

  /**
   * fungsi untuk mengirim request hapus (fetch)
   */
  const handleDelete = useCallback(() => {
    setDeleting(true);

    const url = route(`division.${deleteType}`, {
      division: deleteId,
      _query: params,
    });

    router.delete(url, {
      preserveScroll: true,
      onFinish: () => handleCloseModalDelete(),
      onError: (err) => console.log(err),
    });
  }, [deleteId, deleteType, setDeleting, handleCloseModalDelete, params]);

  /**
   * Fungsi untuk membuka modal restore
   */
  const handleOpenModalRestore = useCallback(
    (id) => {
      setRestoreId(id);
    },
    [setRestoreId]
  );

  /**
   * Fungsi untuk menutup modal restore
   */
  const handleCloseModalRestore = useCallback(() => {
    setRestoring(false);
    setRestoreId(null);
  }, [setRestoreId, setRestoring]);

  /**
   * fungsi untuk mengirim request reqtore (festh)
   */
  const handleRestore = useCallback(() => {
    setRestoring(true);

    const url = route("division.restore", {
      division: restoreId,
      _query: params,
    });

    router.patch(url, null, {
      preserveScroll: true,
      onFinish: () => handleCloseModalRestore(),
    });
  }, [restoreId, setRestoring, params, handleCloseModalRestore]);

  /**
   * Fungsi untuk request (fetch) data division.
   */
  const fetchData = (parameters) => {
    router.get(route("division"), parameters, {
      preserveScroll: true,
    });
  };

  /**
   * fungsi untuk menangani ketika baris tabel dirubah.
   */
  const handleChangePage = useCallback(
    (event, page) => {
      fetchData({
        ...params,
        page: page + 1,
      });
    },
    [params, fetchData]
  );

  /**
   * fungsi untuk menangani ketika baris
   * per halamanpada tabel dirubah oleh user.
   */
  const handleChangeRowPerPage = useCallback(
    (event) => {
      fetchData({
        ...params,
        page: 1,
        per_page: event.target.value,
      });
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
      route("division.edit", {
        division: row.id,
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
        update={Boolean(access.update && display === "active")}
        remove={access.remove}
        destroy={Boolean(access.destroy && display === "removed")}
        onOrder={(field) => handleOrder(field)}
        onUpdate={handleUpdate}
        onRemove={(row) => handleOpenModalDelete("remove", row.id)}
        onDestroy={(row) => handleOpenModalDelete("destroy", row.id)}
        onRestore={(row) => handleOpenModalRestore(row.id)}
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
        title={deleteType === "remove" ? "Hapus Kanwil" : "Hapus Selamanya"}
        loading={deleting}
        onClose={handleCloseModalDelete}
        onDelete={handleDelete}
        message={deleteMessage}
      />

      <RestoreConfirmationModal
        open={Boolean(restoreId)}
        title="Pulihkan Kanwil"
        loading={restoring}
        onClose={handleCloseModalRestore}
        onRestore={handleRestore}
      />
    </>
  );
};

/**
 * Layout
 */
Kanwil.layout = (page) => (
  <AuthLayout title="Kanwil">
    <Template children={page} />
  </AuthLayout>
);

export default Kanwil;
