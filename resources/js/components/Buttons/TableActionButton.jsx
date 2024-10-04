import React from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup, IconButton, Tooltip } from "@mui/material";
import { usePage } from "@inertiajs/react";
import { Refresh } from "@mui/icons-material";

/**
 * Komponen button reload, export dan import excel untuk table
 */
const TableActionButton = ({
  export: exportExcel = false,
  import: importExcel = false,
  reload = false,
  print = false,
  onExport = () => {},
  onImport = () => {},
  onReload = () => {},
  onPrint = () => {},
}) => {
  return (
    <ButtonGroup fullWidth color="secondary" variant="contained">
      {reload && (
        <Button type="button" onClick={onReload}>
          Reload
        </Button>
      )}

      {print && (
        <Button type="button" onClick={onPrint}>
          Cetak
        </Button>
      )}

      {exportExcel && (
        <Button type="button" onClick={onExport}>
          Ekspor
        </Button>
      )}

      {importExcel && (
        <Button type="button" onClick={onImport}>
          Impor
        </Button>
      )}
    </ButtonGroup>
  );
};

TableActionButton.propTypes = {
  export: PropTypes.bool,
  import: PropTypes.bool,
  reload: PropTypes.bool,
  print: PropTypes.bool,
  onExport: PropTypes.func,
  onImport: PropTypes.func,
  onReload: PropTypes.func,
  onPrint: PropTypes.func,
};

export default TableActionButton;
