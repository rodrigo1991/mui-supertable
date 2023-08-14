/* eslint-disable react/jsx-props-no-spreading */
import { memo, useState } from "react";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import {
  Badge,
  Box,
  Grid,
  MenuItem,
  Popover,
  TextField,
  Tooltip,
  Typography,
  Toolbar,
} from "@mui/material";
import { debounce } from "lodash";
// import { es as esLocale } from 'date-fns/locale';
// import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';

// import { formatDate } from '../../../utils/helper';

import { dateFilter, numberFilter, stringFilter } from "./operators";
import { Filter, FilterValue, HeadCell } from "./EnhancedTable.types";

interface EnhancedTableToolbarProps<T extends object> {
  // reload?: () => void;
  setReload?: (reload: boolean | ((prev: boolean) => boolean)) => void;
  csvExport?: () => Promise<void> | undefined;
  filterValue?: FilterValue;
  setFilterValue?: (value: (prevVar: FilterValue) => FilterValue) => void;
  headCells?: HeadCell<T>[];
  filterCount: number;
  setFilterCount: (value: number | ((prevVar: number) => number)) => void;
  add?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  title?: string;
}

const EnhancedTableToolbar = <T extends object>({
  // reload,
  setReload,
  csvExport,
  filterValue,
  setFilterValue,
  headCells,
  filterCount,
  setFilterCount,
  add,
  title,
}: EnhancedTableToolbarProps<T>) => {
  console.log("rendering EnhancedTableToolbar");
  // const isMounted = useRef(false);
  // const date = new Date();
  const [open, setOpen] = useState(false);
  const [textType, setTextType] = useState("text");
  const [operators, setOperators] = useState<Filter[]>(stringFilter);
  // const [fechas, setFechas] = useState<DateRange<Date>>([
  //   new Date(date.getFullYear(), date.getMonth() - 1, 1),
  //   new Date(),
  // ]);

  const popoverId = open ? "simple-popover" : undefined;
  const clear = () => {
    setOperators(stringFilter);
    if (setFilterValue)
      setFilterValue((prev) => ({
        columnField: "name",
        operatorValue: "%",
        value: prev.value === "" ? null : "",
      }));
    setTextType("text");
    setFilterCount(0);
    setOpen(false);
  };

  const updateValue = (value: string) => {
    if (setFilterValue)
      setFilterValue((prevState) => ({
        ...prevState,
        value,
      }));
    setFilterCount(value ? 1 : 0);
  };

  const debounceSetValue = debounce(updateValue, 500);

  const handleColumnChange = (columnField: string) => {
    if (setFilterValue)
      setFilterValue((prevState) => ({
        ...prevState,
        columnField,
      }));

    console.log(columnField);
    const column = headCells?.find((headCell) => headCell.id === columnField);
    console.log(column);

    if (column)
      switch (column.type) {
        case "number":
          setOperators(numberFilter);
          setTextType("text");
          if (setFilterValue)
            setFilterValue((prevState) => ({
              ...prevState,
              operatorValue: numberFilter[0].id,
            }));
          break;
        case "string":
          setOperators(stringFilter);
          setTextType("text");
          if (setFilterValue)
            setFilterValue((prevState) => ({
              ...prevState,
              operatorValue: stringFilter[0].id,
            }));
          break;
        case "date":
          setOperators(dateFilter);
          setTextType("date");
          if (setFilterValue)
            setFilterValue((prevState) => ({
              ...prevState,
              operatorValue: dateFilter[0].id,
            }));
          break;

        default:
          break;
      }
  };

  // useEffect(() => {
  //   document.addEventListener('keyup', e => {
  //     if (e.code === 'KeyF') setOpen(true);
  //   });
  //   document.addEventListener('keyup', e => {
  //     if (e.code === 'Escape') clear();
  //   });
  // }, []);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     if (fechas[0] && fechas[1]) {
  //       const desde = `${formatDate(fechas[0])}T00:00:00`;
  //       const hasta = `${formatDate(fechas[1])}T23:59:59`;
  //       console.log(desde, hasta);
  //       updateValue(
  //         `filter[updatedAt][$gte]=${desde}&filter[updatedAt][$lte]=${hasta}`
  //       );
  //     }
  //   }
  //   isMounted.current = true;
  // }, []);

  return (
    <>
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
        {add && (
          <Tooltip title={`Crear ${title}`}>
            <IconButton onClick={() => add(true)}>
              <AddIcon />
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
          <Tooltip title="Filtros">
            <IconButton onClick={() => setOpen(true)}>
              <Badge badgeContent={filterCount} color="primary">
                <FilterListIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        )}
        {setReload && (
          <Tooltip title="Actualizar">
            {/* <IconButton onClick={reload}> */}
            <IconButton onClick={() => setReload((prev) => !prev)}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      {open && (
        <Popover
          id={popoverId}
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
              justifyContent="center"
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
                  value={filterValue?.columnField}
                  fullWidth
                  onChange={(e) => handleColumnChange(e.target.value)}
                >
                  {headCells?.map((columna) => (
                    <MenuItem key={columna.id} value={columna.id}>
                      {columna.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {textType === "date" ? (
                <Grid item xs={8}>
                  {/* <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={esLocale}
                >
                  <DateRangePicker
                    startText="Desde"
                    endText="Hasta"
                    value={fechas}
                    onChange={newValue => setFechas(newValue)}
                    renderInput={(startProps, endProps) => (
                      <>
                        <TextField variant="standard" {...startProps} />
                        <Box sx={{ mx: 2 }}> a </Box>
                        <TextField variant="standard" {...endProps} />
                      </>
                    )}
                  />
                </LocalizationProvider> */}
                </Grid>
              ) : (
                <>
                  <Grid item xs={4}>
                    <TextField
                      id="standard-select-operator"
                      select
                      label="Operadores"
                      variant="standard"
                      value={filterValue?.operatorValue}
                      fullWidth
                      onChange={(e) =>
                        setFilterValue &&
                        setFilterValue((prevState) => ({
                          ...prevState,
                          operatorValue: e.target.value,
                        }))
                      }
                    >
                      {operators.map((filter) => (
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
                      // value={filterValue.value}
                      fullWidth
                      autoFocus
                      onChange={(e) => debounceSetValue(e.target.value)}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </Popover>
      )}
    </>
  );
};
export default memo(EnhancedTableToolbar) as typeof EnhancedTableToolbar;
