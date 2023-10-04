import { ChangeEvent, memo, useState } from "react";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Badge, Tooltip, Typography, Toolbar } from "@mui/material";

import { FilterValue, HeadCell } from "./EnhancedTable.types";
import VisuallyHiddenInput from "./VisuallyHiddenInput";
import EnhancedTableFilterPopover from "./EnhancedTableFilterPopover";

interface EnhancedTableToolbarProps<T extends object> {
  setReload?: (reload: boolean | ((prev: boolean) => boolean)) => void;
  csvExport?: () => Promise<void> | undefined;
  filterValue?: FilterValue<T>;
  setFilterValue?: (
    value: FilterValue<T> | ((prevVar: FilterValue<T>) => FilterValue<T>)
  ) => void;
  headCells: HeadCell<T>[];
  filterCount: number;
  setFilterCount: (value: number | ((prevVar: number) => number)) => void;
  setAdd?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  setBulk?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  setFile?: (
    value: File | null | ((prevVar: File | null) => File | null)
  ) => void;
  title?: string;
}

const EnhancedTableToolbar = <T extends object>({
  setReload,
  csvExport,
  filterValue,
  setFilterValue,
  headCells,
  filterCount,
  setFilterCount,
  setAdd,
  setBulk,
  setFile,
  title,
}: EnhancedTableToolbarProps<T>) => {
  console.log("rendering EnhancedTableToolbar");
  const [open, setOpen] = useState(false);

  const bulkChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;
    if (setFile) setFile(files ? files[0] : null);
    if (setBulk) setBulk(true);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {title && `${title}s`}
      </Typography>
      {setAdd && (
        <Tooltip title={`Crear ${title}`}>
          <IconButton onClick={() => setAdd(true)}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
      {setBulk && setFile && (
        <Tooltip title={`Cargar ${title}s`}>
          <IconButton component="label" aria-label="carga masiva">
            <VisuallyHiddenInput
              type="file"
              onClick={(event) => {
                event.currentTarget.value = "";
              }}
              onChange={bulkChangeHandler}
            />
            <CloudUploadIcon />
          </IconButton>
        </Tooltip>
      )}
      {csvExport && (
        <Tooltip title="Exportar">
          <IconButton onClick={csvExport}>
            <FileDownloadOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
      {filterValue && setFilterValue && (
        <>
          <Tooltip title="Filtros">
            <IconButton onClick={() => setOpen(true)}>
              <Badge badgeContent={filterCount} color="primary">
                <FilterListIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          {open && (
            <EnhancedTableFilterPopover
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              headCells={headCells}
              setFilterCount={setFilterCount}
              open={open}
              setOpen={setOpen}
            />
          )}
        </>
      )}
      {setReload && (
        <Tooltip title="Actualizar">
          <IconButton onClick={() => setReload((prev) => !prev)}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
export default memo(EnhancedTableToolbar) as typeof EnhancedTableToolbar;
