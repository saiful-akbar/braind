import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { utcToLocale } from "@/utils";

/**
 * Komponen datatable
 */
const DataTable = memo((props) => {
  const {
    name,
    columns,
    data,
    update,
    remove,
    destroy,
    onUpdate,
    onRemove,
    onDestroy,
    paginationProps: pagination,
  } = props;

  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field} align={column.align}>
                  {column.label}
                </TableCell>
              ))}

              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>

          {data.length > 0 ? (
            <TableBody>
              {data.map((row, rowKey) => (
                <TableRow key={rowKey} hover>
                  {columns.map((column, columnKey) => {
                    if (column.timeFormat) {
                      return (
                        <TableCell key={columnKey}>
                          {utcToLocale(row[column.field])}
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={columnKey}>{row[column.field]}</TableCell>
                    );
                  })}

                  <TableCell align="center">
                    {update && (
                      <Tooltip title="Edit" disableInteractive>
                        <IconButton onClick={() => onUpdate(row)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}

                    {remove && (
                      <Tooltip title="Pindahkan ke sampah" disableInteractive>
                        <IconButton onClick={() => onRemove(row)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}

                    {destroy && (
                      <Tooltip title="Hapus permanen" disableInteractive>
                        <IconButton onClick={() => onDestroy(row)}>
                          <DeleteForeverIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  {`Tidak ada data ${name}`}
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <TablePagination
        showFirstButton
        showLastButton
        component="div"
        rowsPerPageOptions={[10, 25, 50, 100, 200]}
        count={pagination.count}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onPageChange={(event, page) => pagination.onPageChange(event, page)}
        onRowsPerPageChange={(event) => pagination.onRowsPerPageChange(event)}
        labelRowsPerPage="Baris per halaman :"
      />
    </>
  );
});

const columnsType = PropTypes.shape({
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  sort: PropTypes.bool.isRequired,
  align: PropTypes.string.isRequired,
  timeFormat: PropTypes.bool.isRequired,
});

const paginationTypes = PropTypes.shape({
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
});

/**
 * Prop types
 */
DataTable.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  columns: PropTypes.arrayOf(columnsType).isRequired,
  update: PropTypes.bool,
  remove: PropTypes.bool,
  destroy: PropTypes.bool,
  onUpdate: PropTypes.func,
  onRemove: PropTypes.func,
  onDestroy: PropTypes.func,
  paginationProps: paginationTypes,
};

/**
 * Default props
 */
DataTable.defaultProps = {
  update: false,
  remove: false,
  destroy: false,
  onUpdate: () => {},
  onRemove: () => {},
  onDestroy: () => {},
};

export default DataTable;
