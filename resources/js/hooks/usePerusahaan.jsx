import { closeLoading, openLoading } from "@/redux/reducers/loadingReducer";
import { openNotification } from "@/redux/reducers/notificationReducer";
import {
  closeDeleteConfirmation,
  closeFormPerusahaan,
  closeModalFormlImportPerusahaan,
  closeRestoreConfirmation,
  createPerusahaan,
  deleting,
  openDeleteConfirmation,
  openModalFormlImportPerusahaan,
  openRestoreConfirmation,
  restoring,
  updatePerusahaan,
} from "@/redux/reducers/perusahaanReducer";
import { router, usePage } from "@inertiajs/react";
import { saveAs } from "file-saver";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Custom hooks untuk master perusahaan.
 *
 * @returns {Object}
 */
const usePerusahaan = () => {
  const dispatch = useDispatch();
  const perusahaan = useSelector((state) => state.perusahaan);
  const { app } = usePage().props;
  const { params } = app.url;
  const url = route("master-perusahaan");

  /**
   * Fungsi untuk membuka form create & update data perusahaan.
   */
  const openModalForm = useCallback(
    (data = null) => {
      dispatch(data === null ? createPerusahaan() : updatePerusahaan(data));
    },
    [dispatch]
  );

  /**
   * fungsi untuk menutup modal form create & update
   */
  const closeModalForm = useCallback(() => {
    dispatch(closeFormPerusahaan());
  }, [dispatch]);

  /**
   * Create submit modal form
   */
  const storeModalForm = useCallback(
    (form) => {
      const url = route("master-perusahaan.store", {
        _query: params,
      });

      form.post(url, {
        preserveScroll: true,
        onSuccess: () => form.reset(),
      });
    },
    [params]
  );

  /**
   * Update submit form modal
   */
  const updateModalForm = useCallback(
    (form) => {
      const url = route("master-perusahaan.update", {
        perusahaan: form.data.id,
        _query: params,
      });

      form.patch(url, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => closeModalForm(),
      });
    },
    [params, closeModalForm]
  );

  /**
   * fungsi untuk reload data master perusahaan
   */
  const handleReloadTable = useCallback(() => {
    router.reload();
  }, [params]);

  /**
   * fungsi untuk sortir table
   */
  const handleOrderTable = useCallback(
    (field) => {
      const orderBy = params.order_by ?? "nama";
      const order = params.order ?? "asc";

      router.visit(url, {
        method: "get",
        preserveScroll: true,
        preserveState: true,
        data: {
          ...params,
          order_by: field,
          order: orderBy === field && order === "asc" ? "desc" : "asc",
        },
      });
    },
    [params, url]
  );

  /**
   * fungsi untuk merubah baris per halaman pada tabel.
   */
  const handleRowsPerPageChangeTable = useCallback(
    (event) => {
      router.visit(url, {
        preserveScroll: true,
        preserveState: true,
        data: {
          ...params,
          per_page: event.target.value,
          page: 1,
        },
      });
    },
    [params, url]
  );

  /**
   * fungsi untuk merubah halaman pada tabel.
   */
  const handlePageChangeTable = useCallback(
    (newPage) => {
      router.visit(url, {
        preserveScroll: true,
        preserveState: true,
        data: {
          ...params,
          page: newPage + 1,
        },
      });
    },
    [params, url]
  );

  /**
   * fungsi untuk membuka modal konfirmasi hapus.
   */
  const handleOpenModalDeleteConfirmation = useCallback(
    (type, id) => {
      dispatch(openDeleteConfirmation({ type, id }));
    },
    [dispatch]
  );

  /**
   * fungsi untuk menutup modal konfimasi hapus
   */
  const handleCloseModalDeleteConfirmation = useCallback(() => {
    dispatch(closeDeleteConfirmation());
  }, [dispatch]);

  /**
   * fungsi untuk submit delete
   */
  const handleDelete = useCallback(() => {
    const url = route(`master-perusahaan.${perusahaan.delete.type}`, {
      perusahaan: perusahaan.delete.id,
      _query: params,
    });

    router.visit(url, {
      method: "delete",
      preserveScroll: true,
      preserveState: true,
      data: {
        _token: app.csrf,
      },
      onStart: () => {
        dispatch(deleting(true));
      },
      onSuccess: () => {
        handleCloseModalDeleteConfirmation();
      },
      onFinish: () => {
        dispatch(deleting(false));
      },
      onError: () => {
        dispatch(
          openNotification({
            status: "error",
            message: "Terjadi kesalahan. Perusahaan gagal dihapus.",
          })
        );
      },
    });
  }, [perusahaan, params, handleCloseModalDeleteConfirmation, app]);

  /**
   * fungsi untuk membuka modal konfirmasi pemulihan
   */
  const handleOpenModalRestoreConfirmation = useCallback(
    (id) => {
      dispatch(openRestoreConfirmation(id));
    },
    [dispatch]
  );

  /**
   * fungsi untuk menutup modal konfirmasi pemulihan.
   */
  const handleCloseModalRestoreConfirmation = useCallback(() => {
    dispatch(closeRestoreConfirmation());
  }, [dispatch]);

  /**
   * fungsi untuk submit pemulihan (restore) perusahaan.
   */
  const handleRestore = useCallback(() => {
    const url = route("master-perusahaan.restore", {
      perusahaan: perusahaan.restore.id,
      _query: params,
    });

    router.visit(url, {
      method: "patch",
      preserveScroll: true,
      preserveState: true,
      onStart: () => {
        dispatch(restoring(true));
      },
      onSuccess: () => {
        handleCloseModalRestoreConfirmation();
      },
      onError: () => {
        dispatch(
          openNotification({
            status: "success",
            message: "Terjadi kesalahan. Perusahaan gagal dipulihkan.",
          })
        );
      },
      onFinish: () => {
        dispatch(restoring(false));
      },
    });
  }, [dispatch, perusahaan, params, app, handleCloseModalRestoreConfirmation]);

  /**
   * fungsi untuk request export excel
   */
  const handleExportExcel = useCallback(async () => {
    dispatch(openLoading());

    try {
      const response = await axios({
        method: "get",
        url: route("master-perusahaan.export"),
        params,
        responseType: "blob",
      });

      if (response.status === 200) {
        dispatch(closeLoading());
        saveAs(response.data, "perusahaan_export.xlsx");
      }
    } catch (error) {
      dispatch(closeLoading());
      dispatch(
        openNotification({
          status: "error",
          message: "Export excel gagal.",
        })
      );
    }
  }, [params, dispatch]);

  /**
   * fungsi untuk membuka modal form import excel
   */
  const handleOpenModalFormImport = useCallback(() => {
    dispatch(openModalFormlImportPerusahaan());
  }, [dispatch]);

  /**
   * fungsi untuk menutup modal form import excel
   */
  const handleCloseModalFormImport = useCallback(() => {
    dispatch(closeModalFormlImportPerusahaan());
  }, [dispatch]);

  return {
    modalForm: {
      open: openModalForm,
      close: closeModalForm,
      store: storeModalForm,
      update: updateModalForm,
    },

    table: {
      reload: handleReloadTable,
      order: handleOrderTable,
      changeRowsPerPage: handleRowsPerPageChangeTable,
      changePage: handlePageChangeTable,
    },

    delete: {
      open: handleOpenModalDeleteConfirmation,
      close: handleCloseModalDeleteConfirmation,
      submit: handleDelete,
    },

    restore: {
      open: handleOpenModalRestoreConfirmation,
      close: handleCloseModalRestoreConfirmation,
      submit: handleRestore,
    },

    exportExcel: handleExportExcel,

    importExcel: {
      open: handleOpenModalFormImport,
      close: handleCloseModalFormImport,
    },
  };
};

export default usePerusahaan;
