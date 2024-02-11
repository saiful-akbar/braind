import React from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup, IconButton, Tooltip } from "@mui/material";
import { usePage } from "@inertiajs/react";
import { Refresh } from "@mui/icons-material";

/**
 * Komponen button reload, export dan import excel untuk table
 */
const TableActionButton = (props) => {
  const {
    export: exportExcel,
    import: importExcel,
    reload,
    onExport,
    onImport,
    onReload,
  } = props;

  return (
    <ButtonGroup fullWidth color="secondary" variant="contained">
      {reload && (
        <Button type="button" onClick={onReload}>
          Reload
        </Button>
      )}

      {exportExcel && (
        <Button type="button" onClick={onExport}>
          Export
        </Button>
      )}

      {importExcel && (
        <Button type="button" onClick={onImport}>
          Import
        </Button>
      )}
    </ButtonGroup>
  );
};

TableActionButton.propTypes = {
  export: PropTypes.bool,
  import: PropTypes.bool,
  reload: PropTypes.bool,
  onExport: PropTypes.func,
  onImport: PropTypes.func,
  onReload: PropTypes.func,
};

TableActionButton.defaultProps = {
  export: false,
  import: false,
  reload: false,
  onExport: () => {},
  onImport: () => {},
  onReload: () => {},
};

export default TableActionButton;
