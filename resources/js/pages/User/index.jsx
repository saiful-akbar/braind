import React, { memo, useState, useEffect, useCallback } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import UserTemplate from "./Template";
import {
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableSortLabel,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Tooltip,
  Avatar,
  Box,
} from "@mui/material";
import { usePage, router } from "@inertiajs/react";
import { utcToLocale } from "@/utils";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreIcon from "@mui/icons-material/Restore";
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyIcon from '@mui/icons-material/Key';

/**
 * Halaman user
 */
const User = (props) => {
  const { data, pagination, app, access } = usePage().props;
  const { params } = app.url;

  // state
  const [display] = useState(params.display ?? "active");
  const [orderBy] = useState(params.order_by ?? "full_name");
  const [order] = useState(params.order ?? "asc");

  // daftar kolom
  const columns = [
    {
      field: "full_name",
      label: "Nama",
      sort: true,
      timeFormat: false,
      show: true,
    },
    {
      field: "division_name",
      label: "Kanwil",
      sort: true,
      timeFormat: false,
      show: true,
    },
    {
      field: "updated_at",
      label: "Diabuat/Diperbarui",
      sort: true,
      timeFormat: true,
      show: display === "active",
    },
    {
      field: "deleted_at",
      label: "Dihapus",
      sort: true,
      timeFormat: true,
      show: display === "removed",
    },
  ];

  /**
   * fungsi untuk request data user (fetch user)
   */
  const fetchData = (parameters) => {
    router.get(route("user"), parameters, {
      preserveScroll: true,
    });
  }

  /**
   * fungsi untuk menangani ketika kolom disortir
   */
  const handleOrderClick = (e) => {
    const { field } = e.target.dataset;

    fetchData({
      ...params,
      order_by: field,
      order: orderBy === field && order === "asc" ? "desc" : "asc",
    });
  }

  /**
   * Fungsi untuk menangani ketika halaman table dirubah
   */
  const handlePageChange = useCallback((newPage) => {
    fetchData({
      ...params,
      page: newPage + 1,
    });
  }, [fetchData, params]);

  /**
   * Fungsi untuk menangani ketika baris per halaman
   * pada tabel dirubah.
   */
  const handleRowsPerPageChange = useCallback((e) => {
    fetchData({
      ...params,
      page: 1,
      per_page: e.target.value,
    });
  }, [fetchData, params]);

  return (
    <React.Fragment>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                if (!column.show) return;

                if (column.sort) {
                  return (
                    <TableCell key={column.field} align={column.align}>
                      <TableSortLabel
                        active={orderBy === column.field}
                        direction={orderBy === column.field ? order : "asc"}
                        onClick={handleOrderClick}
                        data-field={column.field}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  )
                }

                return (
                  <TableCell key={column.field} align={column.align}>
                    {column.label}
                  </TableCell>
                )
              })}

              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id} hover>
                {columns.map((column) => {
                  if (!column.show) return;

                  if (column.field === "full_name") {
                    return (
                      <TableCell key={column.field}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Avatar src={user.photo} />
                          <Box sx={{ ml: 1 }}>{user.full_name}</Box>
                        </Box>
                      </TableCell>
                    )
                  }

                  if (column.timeFormat) {
                    return (
                      <TableCell key={column.field}>
                        {utcToLocale(user[column.field])}
                      </TableCell>
                    ) 
                  }

                  return (
                    <TableCell key={column.field}>
                      {user[column.field]}
                    </TableCell>
                  )
                })}

                <TableCell align="center">
                  {display === "active" && (
                    <Tooltip title="Detail" disableInteractive>
                      <IconButton color="primary">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}

                  {display === "active" && access.update && (
                    <>
                      <Tooltip title="Akses" disableInteractive>
                        <IconButton color="primary">
                          <KeyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Edit" disableInteractive>
                        <IconButton color="primary">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}

                  {display === "active" && access.remove && (
                    <Tooltip title="Hapus" disableInteractive>
                      <IconButton color="error">
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </Tooltip>
                  )}

                  {display === "removed" && access.destroy && (
                    <>
                      <Tooltip title="Pulihkan" disableInteractive>
                        <IconButton color="primary">
                          <RestoreIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Hapus Selamanya" disableInteractive>
                        <IconButton color="error">
                          <DeleteForeverIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        showFirstButton
        showLastButton
        component="div"
        count={pagination.total}
        page={pagination.page - 1}
        onPageChange={handlePageChange}
        rowsPerPage={pagination.per_page}
        rowsPerPageOptions={[10, 25, 50, 100, 200]}
        labelRowsPerPage="Baris per halaman :"
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </React.Fragment>
  );
};

/**
 * User layout
 */
User.layout = (page) => (
  <AuthLayout title="Master User">
    <UserTemplate title="Master User">
      {page}
    </UserTemplate>
  </AuthLayout>
);

export default User;
