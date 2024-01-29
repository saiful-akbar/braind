import { closeLoading, openLoading } from "@/redux/reducers/loadingReducer";
import { openNotification } from "@/redux/reducers/notificationReducer";
import {
  closeFormImportSbp,
  closeFormSbp,
  createSbp,
  openFormImportSbp,
  updateSbp,
} from "@/redux/reducers/sbpReducer";
import { router, usePage } from "@inertiajs/react";
import { saveAs } from "file-saver";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

/**
 * Komponen custom hooks untuk Master SBP
 *
 * @returns {Object}
 */
const useSbp = () => {
  const dispatch = useDispatch();
  const { app } = usePage().props;
  const { params } = app.url;

  /**
   * fungsi untuk reload halaman sbp
   */
  const reload = useCallback(() => {
    router.reload();
  }, []);

  /**
   * fungsi untuk export data excel sbp
   */
  const exportExcel = useCallback(async () => {
    dispatch(openLoading());
    try {
      const response = await axios({
        method: "get",
        url: route("sbp.export"),
        responseType: "blob",
        params,
      });
      if (response.status === 200) {
        saveAs(response.data, "sbp_export.xlsx");
        dispatch(closeLoading());
        dispatch(
          openNotification({
            status: "success",
            message: "Export excel berhasil.",
          })
        );
      }
    } catch (error) {
      dispatch(closeLoading());
      dispatch(
        openNotification({
          status: "error",
          message: "Terjadi kesalahan, Export excel gagal.",
        })
      );
    }
  }, [params, dispatch, openLoading]);

  /**
   * fungsi untuk membuka modal form create & update.
   *
   * NB: parameter data = null maka akan dianggap sebagai
   * aksi tambah data. Sebaliknya jika data != null maka
   * akan dianggap sebagai aksi update data.
   */
  const openModalForm = useCallback(
    (data = null) => {
      if (data === null) {
        dispatch(createSbp());
      } else {
        dispatch(updateSbp(data));
      }
    },
    [dispatch]
  );

  /**
   * fungsi untuk menutup modal form create & update
   */
  const closeModalForm = useCallback(() => {
    dispatch(closeFormSbp());
  }, [dispatch]);

  /**
   * fungsi untuk sort (order) tabel
   */
  const onOrder = useCallback(
    (column) => {
      const order = params.order ?? "asc";
      const orderBy = params.order_by ?? "kantor_nama";

      const data = {
        ...params,
        order_by: column,
        order: column === orderBy && order === "asc" ? "desc" : "asc",
      };

      router.get(route("sbp"), data, {
        preserveScroll: true,
      });
    },
    [params]
  );

  /**
   * fungsi untuk berpindah halaman pada table
   */
  const onPageChange = useCallback(
    (currentPage) => {
      const data = {
        ...params,
        page: currentPage + 1,
      };

      router.get(route("sbp"), data, {
        preserveScroll: true,
      });
    },
    [params]
  );

  /**
   * fungsi untuk merubah baris per halaman pada tabel
   */
  const onRowsPerPageChange = useCallback(
    (event) => {
      const data = {
        ...params,
        page: 1,
        per_page: event.target.value,
      };

      router.get(route("sbp"), data, {
        preserveScroll: true,
      });
    },
    [params]
  );

  /**
   * fungsi untuk membuka modal form import data SBP
   */
  const openFormImport = useCallback(() => {
    dispatch(openFormImportSbp());
  }, [dispatch]);

  /**
   * fungsi untuk menutup modal form import data SBP
   */
  const closeFormImport = useCallback(() => {
    dispatch(closeFormImportSbp());
  }, [dispatch]);

  /**
   * fungsi untuk men-download template import
   */
  const downloadTemplateImport = useCallback(() => {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: route("sbp.import.template"),
        params,
        responseType: "blob",
      })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response));
    });
  }, [params]);

  return {
    reload,
    exportExcel,
    openModalForm,
    closeModalForm,
    table: {
      onOrder,
      onPageChange,
      onRowsPerPageChange,
    },
    importExcel: {
      openForm: openFormImport,
      closeForm: closeFormImport,
      downloadTemplate: downloadTemplateImport,
    },
  };
};

export default useSbp;
