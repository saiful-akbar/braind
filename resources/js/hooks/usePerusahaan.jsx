import { openNotification } from "@/redux/reducers/notificationReducer";
import {
  closeFormPerusahaan,
  createPerusahaan,
  updatePerusahaan,
} from "@/redux/reducers/perusahaanReducer";
import { usePage } from "@inertiajs/react";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Custom hooks untuk master perusahaan.
 *
 * @returns {Object}
 */
const usePerusahaan = () => {
  const perusahaan = useSelector((state) => state.perusahaan);
  const dispatch = useDispatch();
  const { app } = usePage().props;
  const { params } = app.url;

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

  return {
    modalForm: {
      open: openModalForm,
      close: closeModalForm,
      store: storeModalForm,
    },
  };
};

export default usePerusahaan;
