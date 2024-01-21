import React, { Fragment, memo } from "react";
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
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreIcon from "@mui/icons-material/Restore";
import { numberFormat, utcToLocale } from "@/utils";

/**
 * Komponen datatable
 */
const DataTable = memo((props) => {
  const {
    columns,
    from,
    order,
    orderBy,
    data,
    update,
    remove,
    destroy,
    onUpdate,
    onRemove,
    onDestroy,
    onRestore,
    onOrder,
    paginationProps: pagination,
  } = props;

  return (
    <Fragment>
      <TableContainer>
        <Table className="nowrap">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>

              {columns.map((column) => {
                if (!column.show) return;

                if (column.sort) {
                  return (
                    <TableCell key={column.field} align={column.align}>
                      {column.sort ? (
                        <TableSortLabel
                          active={orderBy === column.field}
                          direction={orderBy === column.field ? order : "asc"}
                          onClick={() => onOrder(column.field)}
                        >
                          {column.label}
                        </TableSortLabel>
                      ) : (
                        column.label
                      )}
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
            {data.map((row, rowKey) => (
              <TableRow key={rowKey} hover>
                <TableCell>{numberFormat(from + rowKey)}</TableCell>

                {columns.map((column, columnKey) => {
                  if (!column.show) return;

                  if (column.format.toLowerCase() === "time") {
                    return (
                      <TableCell
                        key={columnKey}
                        align={column.align}
                        title={utcToLocale(row[column.field])}
                      >
                        {utcToLocale(row[column.field])}
                      </TableCell>
                    );
                  }

                  if (column.format.toLowerCase() === "number") {
                    return (
                      <TableCell
                        key={columnKey}
                        align={column.align}
                        title={numberFormat(row[column.field], 2)}
                      >
                        {numberFormat(row[column.field], 2)}
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell
                      key={columnKey}
                      align={column.align}
                      title={row[column.field]}
                    >
                      {row[column.field]}
                    </TableCell>
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

                  {remove && row?.deleted_at === null && (
                    <Tooltip title="Hapus" disableInteractive>
                      <IconButton color="error" onClick={() => onRemove(row)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}

                  {destroy && row?.deleted_at !== null && (
                    <Tooltip title="Pulihkan" disableInteractive>
                      <IconButton onClick={() => onRestore(row)}>
                        <RestoreIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}

                  {destroy && (
                    <Tooltip title="Hapus permanen" disableInteractive>
                      <IconButton color="error" onClick={() => onDestroy(row)}>
                        <DeleteForeverIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
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
        page={pagination.page}
        count={pagination.count}
        rowsPerPage={pagination.rowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100, 200]}
        labelRowsPerPage="Baris per halaman :"
        onPageChange={(event, page) => pagination.onPageChange(event, page)}
        onRowsPerPageChange={(event) => pagination.onRowsPerPageChange(event)}
      />
    </Fragment>
  );
});

const columnsType = PropTypes.shape({
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  align: PropTypes.string.isRequired,
  format: PropTypes.oneOf(["none", "time", "number"]).isRequired,
  show: PropTypes.bool.isRequired,
  sort: PropTypes.bool.isRequired,
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
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  columns: PropTypes.arrayOf(columnsType).isRequired,
  from: PropTypes.number,
  orderBy: PropTypes.string.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]),
  update: PropTypes.bool,
  remove: PropTypes.bool,
  destroy: PropTypes.bool,
  onUpdate: PropTypes.func,
  onRemove: PropTypes.func,
  onDestroy: PropTypes.func,
  onRestore: PropTypes.func,
  onOder: PropTypes.func,
  paginationProps: paginationTypes,
};

/**
 * Default props
 */
DataTable.defaultProps = {
  from: -1,
  update: false,
  remove: false,
  destroy: false,
  onUpdate: () => {},
  onRemove: () => {},
  onDestroy: () => {},
  onRestore: () => {},
  onOrder: () => {},
};

export default DataTable;
