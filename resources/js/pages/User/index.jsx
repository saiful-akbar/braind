import AuthLayout from "@/layouts/AuthLayout";
import { numberFormat, utcToLocale } from "@/utils";
import { Link, router } from "@inertiajs/react";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import KeyIcon from "@mui/icons-material/Key";
import RestoreIcon from "@mui/icons-material/Restore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Avatar,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import UserTemplate from "./Template";
import { useDispatch } from "react-redux";
import { openNotification } from "@/redux/reducers/notificationReducer";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import RestoreConfirmation from "@/components/RestoreConfirmation";

/**
 * Halaman user
 */
const User = (props) => {
  const { data, pagination, app, access } = props;
  const { params } = app.url;
  const dispatch = useDispatch();

  // state
  const [status] = useState(params.status ?? "aktif");
  const [orderBy] = useState(params.order_by ?? "nama_lengkap");
  const [order] = useState(params.order === "desc" ? "desc" : "asc");
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteType, setDeleteType] = useState("remove");
  const [restoreId, setRestoreId] = useState(null);
  const [restoring, setRestoring] = useState(false);

  // daftar kolom
  const columns = [
    {
      field: "nama_lengkap",
      label: "Nama",
      sort: true,
      timeFormat: false,
      show: true,
    },
    {
      field: "admin",
      label: "Admin",
      sort: true,
      timeFormat: false,
      show: true,
    },
    {
      field: "email",
      label: "Email",
      sort: true,
      timeFormat: false,
      show: true,
    },
    {
      field: "kantor_nama",
      label: "kantor",
      sort: true,
      timeFormat: false,
      show: true,
    },
    {
      field: "updated_at",
      label: "Diabuat atau diperbarui",
      sort: true,
      timeFormat: true,
      show: status === "aktif",
    },
    {
      field: "deleted_at",
      label: "Dihapus",
      sort: true,
      timeFormat: true,
      show: status === "dihapus",
    },
  ];

  /**
   * fungsi untuk request data user (fetch user)
   */
  const fetchData = (parameters) => {
    router.get(route("user"), parameters, {
      preserveScroll: true,
    });
  };

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
  };

  /**
   * Fungsi untuk menangani ketika halaman table dirubah
   */
  const handlePageChange = useCallback(
    (newPage) => {
      fetchData({
        ...params,
        page: newPage + 1,
      });
    },
    [fetchData, params]
  );

  /**
   * Fungsi untuk menangani ketika baris per halaman
   * pada tabel dirubah.
   */
  const handleRowsPerPageChange = useCallback(
    (e) => {
      fetchData({
        ...params,
        page: 1,
        per_page: e.target.value,
      });
    },
    [fetchData, params]
  );

  /**
   * fungsi untuk membuka modal konfirmasi delete.
   */
  const openDeleteConfirmation = useCallback(
    (type, id) => {
      setDeleteId(id);
      setDeleteType(type);
    },
    [setDeleteId, setDeleteType]
  );

  /**
   * fungsi untuk menutup modal konfirmasi delete
   */
  const closeDeleteConfirmation = useCallback(() => {
    setDeleteId(null);
    setDeleting(false);
  }, [setDeleteId, setDeleting]);

  /**
   * fungsi untuk menjalankan proses delete user
   */
  const handleDelete = useCallback(async () => {
    setDeleting(true);

    const url = route(`user.${deleteType}`, {
      user: deleteId,
      _query: {
        ...params,
        _token: app.csrf,
      },
    });

    router.delete(url, {
      preserveScroll: true,
      onSuccess: () => {
        setDeleteId(null);
      },
      onFinish: () => {
        setDeleting(false);
      },
      onError: (error) => {
        dispatch(
          openNotification({
            status: "error",
            message: "Gagal menghapus data user.",
          })
        );
      },
    });
  }, [app, params, deleteType, deleteId, setDeleteId, setDeleting, dispatch]);

  /**
   * fungsi untuk membuka modal konfirmasi restore
   */
  const openRestoreConfirmation = useCallback(
    (id) => {
      setRestoreId(id);
    },
    [setRestoreId]
  );

  /**
   * fungsi untuk menutup modal konfirmasi restore
   */
  const closeRestoreConfirmation = useCallback(() => {
    setRestoreId(null);
  }, [setRestoreId]);

  /**
   * fungsin untuk memulihkan data user
   */
  const handleRestore = useCallback(async () => {
    setRestoring(true);

    const url = route("user.restore", {
      user: restoreId,
      _query: {
        ...params,
        _token: app.csrf,
      },
    });

    router.patch(url, null, {
      preserveScroll: true,
      onFinish: () => {
        setRestoring(false);
      },
      onSuccess: () => {
        setRestoreId(null);
      },
      onError: () => {
        dispatch(
          openNotification({
            status: "success",
            message: "Gagal memulihkan data user.",
          })
        );
      },
    });
  }, [setRestoreId, setRestoring, dispatch, restoreId, app, params, dispatch]);

  return (
    <React.Fragment>
      <TableContainer>
        <Table size="small" className="nowrap">
          <TableHead>
            <TableRow>
              <TableCell align="left">No</TableCell>

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
                  );
                }

                return (
                  <TableCell key={column.field} align={column.align}>
                    {column.label}
                  </TableCell>
                );
              })}

              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((user, index) => (
              <TableRow key={user.id} hover>
                <TableCell>{numberFormat(pagination.from + index)}</TableCell>

                {columns.map((column) => {
                  if (!column.show) return;

                  if (column.field === "nama_lengkap") {
                    return (
                      <TableCell key={column.field} title={user.nama_lengkap}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            src={user.foto}
                            alt={`Foto ${user.nama_lengkap}`}
                            sx={{
                              width: 50,
                              height: 50,
                            }}
                          />

                          <Box sx={{ ml: 1 }}>{user.nama_lengkap}</Box>
                        </Box>
                      </TableCell>
                    );
                  }

                  if (column.field === "admin") {
                    return (
                      <TableCell
                        key={column.field}
                        title={user.admin ? "Ya" : "Tidak"}
                      >
                        {user.admin ? "Ya" : "Tidak"}
                      </TableCell>
                    );
                  }

                  if (column.timeFormat) {
                    return (
                      <TableCell
                        key={column.field}
                        title={utcToLocale(user[column.field])}
                      >
                        {utcToLocale(user[column.field])}
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={column.field} title={user[column.field]}>
                      {user[column.field]}
                    </TableCell>
                  );
                })}

                <TableCell align="center">
                  {status === "aktif" && (
                    <Tooltip title="Detail" disableInteractive>
                      <IconButton
                        color="primary"
                        component={Link}
                        href={route("user.show", { user: user.id })}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}

                  {status === "aktif" && access.update && (
                    <>
                      <Tooltip title="Akses" disableInteractive>
                        <IconButton
                          color="primary"
                          component={Link}
                          href={route("user.access.edit", { user: user.id })}
                        >
                          <KeyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Edit" disableInteractive>
                        <IconButton
                          color="primary"
                          component={Link}
                          href={route("user.edit", { user: user.id })}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}

                  {status === "aktif" && access.remove && (
                    <Tooltip title="Hapus" disableInteractive>
                      <IconButton
                        color="error"
                        onClick={() =>
                          openDeleteConfirmation("remove", user.id)
                        }
                      >
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </Tooltip>
                  )}

                  {status === "dihapus" && access.destroy && (
                    <>
                      <Tooltip title="Pulihkan" disableInteractive>
                        <IconButton
                          color="primary"
                          onClick={() => openRestoreConfirmation(user.id)}
                        >
                          <RestoreIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Hapus Selamanya" disableInteractive>
                        <IconButton
                          color="error"
                          onClick={() =>
                            openDeleteConfirmation("destroy", user.id)
                          }
                        >
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

      <DeleteConfirmation
        open={deleteId !== null}
        title={deleteType === "remove" ? "Hapus user" : "Hapus user Selamanya"}
        loading={deleting}
        onDelete={handleDelete}
        onClose={closeDeleteConfirmation}
      />

      <RestoreConfirmation
        title="Pulihkan user"
        open={restoreId !== null}
        loading={restoring}
        onClose={closeRestoreConfirmation}
        onRestore={handleRestore}
      />
    </React.Fragment>
  );
};

/**
 * User layout
 */
User.layout = (page) => (
  <AuthLayout title="User">
    <UserTemplate>{page}</UserTemplate>
  </AuthLayout>
);

export default User;
