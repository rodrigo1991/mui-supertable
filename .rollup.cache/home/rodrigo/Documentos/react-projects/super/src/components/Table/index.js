import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable no-underscore-dangle */
import { Paper, Table, TableBody, TableContainer, useMediaQuery, } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { memo, useCallback, useMemo, useState } from "react";
import CenterSpinner from "./CenterSpinner";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
// import Row from './Row';
import Rows from "./Rows";
import EnhancedTableFooter from "./EnhancedTableFooter";
import EnhancedTablePagination from "./EnhancedTablePagination";
var EnhancedTable = function (_a) {
    var 
    // reload,
    setReload = _a.setReload, csvExport = _a.csvExport, filterValue = _a.filterValue, setFilterValue = _a.setFilterValue, loading = _a.loading, headCells = _a.headCells, rows = _a.rows, footerChips = _a.footerChips, rowCount = _a.rowCount, page = _a.page, pageSize = _a.pageSize, onPageChange = _a.onPageChange, onRowsPerPageChange = _a.onRowsPerPageChange, sortModel = _a.sortModel, onRequestSort = _a.onRequestSort, rowColor = _a.rowColor, colorField = _a.colorField, title = _a.title, add = _a.add, Actions = _a.Actions, ht = _a.ht;
    console.log("🚀 ~ file: index.tsx:84 ~ EnhancedTable", rows);
    var _b = useState(0), filterCount = _b[0], setFilterCount = _b[1];
    var theme = useTheme();
    var sm = useMediaQuery(theme.breakpoints.up("sm"));
    var size = sm ? 680 : 600;
    var chips = footerChips
        ? footerChips(sm, setFilterValue, setFilterCount)
        : null;
    var memoizedonRequestSort = useCallback(function (event, property) {
        return onRequestSort && onRequestSort(event, property);
    }, [sortModel]);
    var memoizedCsvExport = useCallback(function () { return csvExport && csvExport(); }, []);
    var memoizedSetFilterValue = useCallback(function (filter) {
        return setFilterValue && setFilterValue(filter);
    }, [setFilterValue]);
    var memoizedSetFilterCount = useCallback(function (value) { return setFilterCount(value); }, []);
    var memoizedOnPageChange = useCallback(function (event, p) {
        return onPageChange && onPageChange(event, p);
    }, []);
    var memoizedOnRowsPerPageChange = useCallback(function (event) {
        return onRowsPerPageChange && onRowsPerPageChange(event);
    }, []);
    // const memoizedRows = useMemo(() => rows, []);
    var memoizedRowColor = useMemo(function () { return rowColor; }, [rowColor]);
    var memoizedColorField = useMemo(function () { return colorField; }, []);
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
    return (_jsxs(Paper, __assign({ sx: {
            width: "100%",
            overflow: "hidden",
            p: 2,
            backgroundColor: "background.default",
        } }, { children: [_jsx(EnhancedTableToolbar, { 
                // reload={reload && memoizedReload}
                setReload: setReload, csvExport: csvExport && memoizedCsvExport, filterValue: filterValue, setFilterValue: memoizedSetFilterValue, headCells: headCells, filterCount: filterCount, setFilterCount: memoizedSetFilterCount, title: title, add: add }), _jsxs(TableContainer, __assign({ sx: { height: ht || size } }, { children: [loading && _jsx(CenterSpinner, { disableShrink: true }), _jsxs(Table, __assign({ "aria-labelledby": "tableTitle", size: "small", stickyHeader: true }, { children: [_jsx(EnhancedTableHead, { sortModel: sortModel, onRequestSort: memoizedonRequestSort, headCells: headCells, actions: !!Actions }), _jsx(TableBody, __assign({ sx: {
                                    opacity: loading ? 0.5 : 1,
                                } }, { children: _jsx(Rows, { rows: rows, headCells: headCells, rowColor: memoizedRowColor, colorField: memoizedColorField, Actions: Actions, setReload: setReload, onPageChange: memoizedOnPageChange }) }))] }))] })), chips && _jsx(EnhancedTableFooter, { chips: chips, sm: sm }), onPageChange && onRowsPerPageChange && (_jsx(EnhancedTablePagination, { rowCount: rowCount, pageSize: pageSize, page: page, onPageChange: memoizedOnPageChange, onRowsPerPageChange: memoizedOnRowsPerPageChange, sm: sm }))] })));
};
// const MemoizedComponent = memo(EnhancedTable) as typeof EnhancedTable;
// export default MemoizedComponent;
export default memo(EnhancedTable
// (prevProps, nextProps) =>isEqual(prevProps, nextProps)
);
//# sourceMappingURL=index.js.map