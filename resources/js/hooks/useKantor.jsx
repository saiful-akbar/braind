import React, { useCallback } from "react";

/**
 * Komponen custom hooks untuk master Kantor
 */
const useKantor = () => {
  const getAll = useCallback(async () => {
    return axios({
      method: "get",
      url: route("kantor.json"),
    })
      .then((response) => response.data)
      .catch((error) => error.response);
  }, []);

  return {
    getAll,
  };
};

export default useKantor;
