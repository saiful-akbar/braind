import AuthLayout from "@/layouts/AuthLayout";
import React from "react";
import CommodityTemplate from "./Template";
import DataTable from "@/components/DataTable";

/**
 * Halaman commodity
 */
const Commodity = (props) => {
  const { data, pagination, app, access } = props;
  const { params } = app.url;
  const order = params.order ?? "asc";
  const orderBy = params.order_by ?? "name";
  const display = params.display ?? "active";

  const columns = [
    {
      field: "name",
      label: "Kode Komoditi",
      align: "left",
      timeFormat: false,
      show: true,
      sort: true,
    },
    {
      field: "updated_at",
      label: "Dibuat/Diperbarui",
      align: "left",
      timeFormat: true,
      show: display === "active",
      sort: true,
    },
    {
      field: "deleted_at",
      label: "Dihapus",
      align: "left",
      timeFormat: true,
      show: display === "removed",
      sort: true,
    },
  ];

  return (
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
      onOrder={(field) => {}}
      onUpdate={() => {}}
      onRemove={(row) => {}}
      onDestroy={(row) => {}}
      onRestore={(row) => {}}
      paginationProps={{
        count: pagination.total,
        page: pagination.page - 1,
        rowsPerPage: pagination.per_page,
        onPageChange: (event, page) => {},
        onRowsPerPageChange: (event) => {},
      }}
    />
  );
};

/**
 * Layout
 */
Commodity.layout = (page) => (
  <AuthLayout title="Master Kode Komoditi">
    <CommodityTemplate>{page}</CommodityTemplate>
  </AuthLayout>
);

export default Commodity;
