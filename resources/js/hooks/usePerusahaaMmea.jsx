import { openNotification } from "@/redux/reducers/notificationReducer";
import {
  closeFormPerusahaanMmea,
  createPerusahaanMmea,
  updatePerusahaanMmea,
} from "@/redux/reducers/perusahaanMmeaReducer";
import { usePage } from "@inertiajs/react";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

/**
 * Komponen hooks untuk Perusahaan Cukai MMEA.
 *
 * @returns {Object}
 */
const usePerusahaanMmea = () => {
  const { app } = usePage().props;
  const { params } = app.url;
  const dispatch = useDispatch();

  /**
   * Fungsi untuk membuka modal form create & update
   */
  const openModalForm = useCallback(
    (data = null) => {
      if (data === null) {
        dispatch(createPerusahaanMmea());
      } else {
        dispatch(updatePerusahaanMmea(data));
      }
    },
    [dispatch]
  );

  /**
   * Fungsi untuk menutup modal form create & update
   */
  const closeModalForm = useCallback(() => {
    dispatch(closeFormPerusahaanMmea());
  }, [dispatch]);

  /**
   * fungsi untuk submit modal (create data)
   */
  const storeSubmit = useCallback(
    (form) => {
      const url = route("perusahaan.mmea.store", {
        _query: params,
      });

      form.post(url, {
        preserveScroll: false,
        onSuccess: () => form.reset(),
        onError: () => {
          dispatch(
            openNotification({
              status: "error",
              message: "Terjadi kesalahan. Periksa kembali inputan anda.",
            })
          );
        },
      });
    },
    [dispatch, params]
  );

  return {
    modalForm: {
      close: closeModalForm,
      open: openModalForm,
      store: storeSubmit,
    },
  };
};

export default usePerusahaanMmea;
