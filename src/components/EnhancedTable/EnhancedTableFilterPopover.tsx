import "dayjs/locale/es";
import { memo, useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Box, Grid, MenuItem, Popover, TextField } from "@mui/material";
import { debounce } from "lodash";

import { numberFilter, stringFilter } from "./operators";
import { Filter, FilterValue, HeadCell } from "./EnhancedTable.types";

interface EnhancedTableFilterPopoverProps<T extends object> {
  filterValue: FilterValue<T>;
  setFilterValue: (
    value: FilterValue<T> | ((prevVar: FilterValue<T>) => FilterValue<T>)
  ) => void;
  headCells: HeadCell<T>[];
  setFilterCount: (value: number | ((prevVar: number) => number)) => void;
  open: boolean;
  setOpen: (reload: boolean | ((prevVar: boolean) => boolean)) => void;
}

const EnhancedTableFilterPopover = <T extends object>({
  filterValue,
  setFilterValue,
  headCells,
  setFilterCount,
  open,
  setOpen,
}: EnhancedTableFilterPopoverProps<T>) => {
  console.log("rendering EnhancedTableFilterPopover");
  const isMounted = useRef(false);
  const [from, setFrom] = useState<Dayjs | null>(null);
  const [to, setTo] = useState<Dayjs | null>(null);

  const popoverId = open ? "simple-popover" : undefined;
  const clear = () => {
    setFilterValue((prevState) => ({
      ...prevState,
      value: null,
    }));
    setFilterCount(0);
    setOpen(false);
  };

  const updateValue = (value: any) => {
    setFilterValue((prevState) => ({
      ...prevState,
      value,
    }));
    setFilterCount(value !== null ? 1 : 0);
  };

  const debounceSetValue = debounce(updateValue, 500);

  const commonFields = (ops: Filter[]) => (
    <>
      <Grid item xs={4}>
        <TextField
          id="standard-select-operator"
          select
          label="Operadores"
          variant="standard"
          value={filterValue.operatorValue}
          fullWidth
          onChange={(e) =>
            setFilterValue((prevState) => ({
              ...prevState,
              operatorValue: e.target.value,
            }))
          }
        >
          {ops.map((filter) => (
            <MenuItem key={filter.id} value={filter.id}>
              {filter.value}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="standard-textarea"
          label="Valor"
          placeholder="Valor del filtro"
          variant="standard"
          fullWidth
          autoFocus
          onChange={(e) => debounceSetValue(e.target.value)}
        />
      </Grid>
    </>
  );

  const renderSwitch = (columnField: string) => {
    const column = headCells.find((headCell) => headCell.id === columnField);

    if (column)
      switch (column.type) {
        case "number":
        case "currency":
          return commonFields(numberFilter);
        case "string":
        case "rut":
          return commonFields(stringFilter);
        case "date":
        case "datetime":
          return (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <Grid item xs={4}>
                <DatePicker
                  label="Desde"
                  onChange={(date) => setFrom(date)}
                  defaultValue={dayjs().startOf("month")}
                  slotProps={{
                    textField: {
                      variant: "standard",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <DatePicker
                  label="Hasta"
                  onChange={(date) => setTo(date)}
                  defaultValue={dayjs().endOf("month")}
                  slotProps={{
                    textField: {
                      variant: "standard",
                    },
                  }}
                />
              </Grid>
            </LocalizationProvider>
          );
        case "boolean":
          return (
            <Grid item xs={8}>
              <TextField
                id="standard-textarea"
                select
                label="Valor"
                placeholder="Valor del filtro"
                variant="standard"
                autoFocus
                fullWidth
                onChange={(e) => updateValue(!!e.target.value)}
              >
                <MenuItem value={1}>Sí</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </TextField>
            </Grid>
          );
        default:
          return commonFields(stringFilter);
      }
    return commonFields(stringFilter);
  };

  useEffect(() => {
    if (isMounted.current) {
      if (from && to) {
        updateValue([from, to]);
      }
    }
    isMounted.current = true;
  }, [from, to]);

  return (
    <Popover
      id={popoverId}
      slotProps={{
        paper: { sx: { minWidth: { xs: "90%", md: 400 } } },
      }}
      open={open}
      onClose={() => setOpen(false)}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 198, left: 280 }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box sx={{ p: 1 }}>
        <Grid
          container
          justifyContent="flex-start"
          alignItems="flex-end"
          spacing={1}
        >
          <Grid item xs={1}>
            <IconButton size="small" onClick={clear}>
              <ClearIcon fontSize="small" />
            </IconButton>
          </Grid>

          <Grid item xs={3}>
            <TextField
              id="standard-select-column"
              select
              label="Columnas"
              variant="standard"
              value={filterValue.columnField}
              fullWidth
              onChange={(e) =>
                setFilterValue((prevState) => ({
                  ...prevState,
                  columnField: e.target.value as any,
                }))
              }
            >
              {headCells?.map((columna) => (
                <MenuItem key={columna.id} value={columna.id}>
                  {columna.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {renderSwitch(filterValue.columnField)}
        </Grid>
      </Box>
    </Popover>
  );
};
export default memo(
  EnhancedTableFilterPopover
) as typeof EnhancedTableFilterPopover;
