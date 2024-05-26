import DataTable from "@/components/DataTable";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import RestoreConfirmation from "@/components/RestoreConfirmation";
import AuthLayout from "@/layouts/AuthLayout";
import { router } from "@inertiajs/react";
import { Fragment, useCallback, useState } from "react";
import Template from "./Template";
import { useDispatch } from "react-redux";
import { updateKantor } from "@/redux/reducers/kantorReducer";

/**
 * Halaman kantor (Kanwil)
 */
const Kantor = (props) => {
  const { data, pagination, app, access } = props;
  const { params } = app.url;
  const order = params.order ?? "asc";
  const orderBy = params.order_by ?? "nama";
  const status = params.status ?? "aktif";
  const dispatch = useDispatch();

  // Daftar kolom yang akan ditampilkan pada tabel
  const columns = [
    {
      field: "nama",
      label: "Nama Kantor",
      align: "left",
      format: "none",
      sort: true,
      show: true,
    },
    {
      field: "updated_at",
      label: "Dibuat atau diperbarui",
      align: "left",
      format: "time",
      sort: true,
      show: status === "aktif",
    },
    {
      field: "deleted_at",
      label: "Dihapus",
      align: "left",
      format: "time",
      sort: true,
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
    dispatch(
      updateKantor({
        id: row.id,
        nama: row.nama,
      })
    );
  }, []);

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
        onOrder={(field) => handleOrder(field)}
        onUpdate={(row) => handleUpdate(row)}
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

      <DeleteConfirmation
        open={Boolean(deleteId)}
        loading={deleting}
        onClose={closeDeleteConfirmation}
        onDelete={handleDelete}
        title={
          deleteType === "remove" ? "Hapus kantor" : "Hapus kantor selamanya"
        }
      />

      <RestoreConfirmation
        open={Boolean(restoreId)}
        title="Pulihkan kantor"
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
Kantor.layout = (page) => (
  <AuthLayout title="Kantor">
    <Template children={page} />
  </AuthLayout>
);

export default Kantor;
