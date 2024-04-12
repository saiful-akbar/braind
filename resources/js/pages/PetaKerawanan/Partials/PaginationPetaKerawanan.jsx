import { router, usePage } from "@inertiajs/react";
import { Box, Pagination } from "@mui/material";
import React, { memo } from "react";

/**
 * Komponen pagination untuk halaman peta kerawanan kantor.
 */
const PaginationPetaKerawanan = memo(() => {
  const { pagination, app } = usePage().props;
  const { params } = app.url;

  /**
   * fungsi untuk menangani ketika halaman dirubah
   */
  const handlePageChange = (event, value) => {
    const data = {
      ...params,
      page: value,
    };

    router.get(route("peta-kerawanan"), data, {
      preserveState: true,
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 3,
      }}
    >
      <Pagination
        size="large"
        page={pagination.page}
        count={pagination.last_page}
        onChange={handlePageChange}
      />
    </Box>
  );
});

export default PaginationPetaKerawanan;
