import DataTable from "@/components/DataTable";
import AuthLayout from "@/layouts/AuthLayout";
import { router } from "@inertiajs/react";
import { useCallback } from "react";
import Template from "./Template";

/**
 * Halaman Division (Kanwil)
 */
const Kanwil = (props) => {
  const { data, pagination, app, access } = props;
  const { params } = app.url;
  const order = params.order ?? "asc";
  const orderBy = params.order_by ?? "name";

  /**
   * Daftar kolom yang akan ditampilkan pada tabel
   */
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
      label: "Dibuat atau Diperbarui",
      align: "left",
      sort: true,
      timeFormat: true,
      show: true,
    },
    {
      field: "deleted_at",
      label: "Dihapus",
      align: "left",
      sort: true,
      timeFormat: true,
      show: access.destroy,
    },
  ];

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

  const handleActionClick = useCallback((data) => {
    console.log("aksi", data);
  }, []);

  return (
    <DataTable
      name="Kanwil"
      columns={columns}
      data={data}
      from={pagination.from}
      to={pagination.to}
      order={order}
      orderBy={orderBy}
      update={access.update}
      remove={access.remove}
      destroy={access.destroy}
      onOrder={(field) => handleOrder(field)}
      onUpdate={handleUpdate}
      onRemove={handleActionClick}
      onDestroy={handleActionClick}
      paginationProps={{
        count: pagination.total,
        page: pagination.page - 1,
        rowsPerPage: pagination.per_page,
        onPageChange: (event, page) => handleChangePage(event, page),
        onRowsPerPageChange: (event) => handleChangeRowPerPage(event),
      }}
    />
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
