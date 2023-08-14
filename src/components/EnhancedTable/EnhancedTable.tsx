/* eslint-disable no-underscore-dangle */
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ComponentType, memo, useCallback, useMemo, useState } from "react";

import CenterSpinner from "./CenterSpinner";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
// import Row from './Row';
import Rows from "./Rows";
import {
  FilterValue,
  HeadCell,
  ActionProps,
  TableSortModel,
  IdBase,
  FooterChips,
  NestedKeyOf,
  OnRequestSort,
} from "./EnhancedTable.types";
import EnhancedTableFooter from "./EnhancedTableFooter";
import EnhancedTablePagination from "./EnhancedTablePagination";

interface EnhancedTableProps<T extends object> {
  // reload?: () => void;
  setReload?: (reload: boolean | ((prevVar: boolean) => boolean)) => void;
  csvExport?: () => Promise<void>;
  filterValue?: FilterValue;
  setFilterValue?: (
    filter: FilterValue | ((prevVar: FilterValue) => FilterValue)
  ) => void;
  loading: boolean;
  rows: T[];
  headCells: HeadCell<T>[];
  footerChips?: FooterChips;
  rowCount: number;
  page: number;
  pageSize: number;
  onPageChange?: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  onRowsPerPageChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  sortModel: TableSortModel<T>;
  onRequestSort?: OnRequestSort<T>;
  rowColor?: Record<string, string>;
  colorField?: string[];
  title?: string;
  add?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  Actions?: ComponentType<ActionProps<T>>;
  ht?: number;
}

const EnhancedTable = <T extends IdBase>({
  // reload,
  setReload,
  csvExport,
  filterValue,
  setFilterValue,
  loading,
  headCells,
  rows,
  footerChips,
  rowCount,
  page,
  pageSize,
  onPageChange,
  onRowsPerPageChange,
  sortModel,
  onRequestSort,
  rowColor,
  colorField,
  title,
  add,
  Actions,
  ht,
}: EnhancedTableProps<T>) => {
  console.log("🚀 ~ file: index.tsx:84 ~ EnhancedTable", rows);

  const [filterCount, setFilterCount] = useState(0);

  const theme = useTheme();

  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const size = sm ? 680 : 600;

  const chips = footerChips
    ? footerChips(sm, setFilterValue, setFilterCount)
    : null;

  const memoizedonRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, property: NestedKeyOf<T>) =>
      onRequestSort && onRequestSort(event, property),
    [sortModel]
  ) as OnRequestSort<T>;

  const memoizedCsvExport = useCallback(() => csvExport && csvExport(), []);
  const memoizedSetFilterValue = useCallback(
    (filter: FilterValue | ((prevVar: FilterValue) => FilterValue)) =>
      setFilterValue && setFilterValue(filter),
    [setFilterValue]
  );
  const memoizedSetFilterCount = useCallback(
    (value: number | ((prevVar: number) => number)) => setFilterCount(value),
    []
  );
  const memoizedOnPageChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, p: number) =>
      onPageChange && onPageChange(event, p),
    []
  );
  const memoizedOnRowsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      onRowsPerPageChange && onRowsPerPageChange(event),
    []
  );

  // const memoizedRows = useMemo(() => rows, []);
  const memoizedRowColor = useMemo(() => rowColor, [rowColor]);
  const memoizedColorField = useMemo(() => colorField, []);

  // const memoizedReload = useCallback(() => reload && reload(), []);

  // const memoizedSetReload = useCallback(
  //   (reload: boolean | ((prev: boolean) => boolean)) =>
  //     setReload && setReload(reload),
  //   []
  // );

  // const MemoizedRows = useMemo(
  //   () => (
  //     <>
  //       {rows.map(row => (
  //         <Row
  //           row={row}
  //           key={row.id}
  //           headCells={headCells}
  //           rowColor={rowColor}
  //           colorField={colorField}
  //           Actions={Actions}
  //           setFilterValue={memoizedSetFilterValue}
  //           onPageChange={memoizedOnPageChange}
  //         />
  //       ))}
  //     </>
  //   ),
  //   [rows]
  // );

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        p: 2,
        backgroundColor: "background.default",
      }}
    >
      <EnhancedTableToolbar<T>
        // reload={reload && memoizedReload}
        setReload={setReload}
        csvExport={csvExport && memoizedCsvExport}
        filterValue={filterValue}
        setFilterValue={memoizedSetFilterValue}
        headCells={headCells}
        filterCount={filterCount}
        setFilterCount={memoizedSetFilterCount}
        title={title}
        add={add}
      />
      <TableContainer sx={{ height: ht || size }}>
        {loading && <CenterSpinner disableShrink />}
        <Table aria-labelledby="tableTitle" size="small" stickyHeader>
          <EnhancedTableHead<T>
            sortModel={sortModel}
            onRequestSort={memoizedonRequestSort}
            headCells={headCells}
            actions={!!Actions}
          />
          <TableBody
            sx={{
              opacity: loading ? 0.5 : 1,
            }}
          >
            <Rows
              rows={rows}
              headCells={headCells}
              rowColor={memoizedRowColor}
              colorField={memoizedColorField}
              Actions={Actions}
              setReload={setReload}
              onPageChange={memoizedOnPageChange}
            />
          </TableBody>
        </Table>
      </TableContainer>
      {chips && <EnhancedTableFooter chips={chips} sm={sm} />}
      {onPageChange && onRowsPerPageChange && (
        <EnhancedTablePagination
          rowCount={rowCount}
          pageSize={pageSize}
          page={page}
          onPageChange={memoizedOnPageChange}
          onRowsPerPageChange={memoizedOnRowsPerPageChange}
          sm={sm}
        />
      )}
    </Paper>
  );
};
// const MemoizedComponent = memo(EnhancedTable) as typeof EnhancedTable;
// export default MemoizedComponent;
// export default EnhancedTable;
export default memo(EnhancedTable) as typeof EnhancedTable;
