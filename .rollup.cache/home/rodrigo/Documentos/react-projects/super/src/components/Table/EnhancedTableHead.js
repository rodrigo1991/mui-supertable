import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TableCell, TableRow, TableHead, TableSortLabel } from "@mui/material";
import { memo } from "react";
import ActionTableCell from "./StyledTableActionCell";
var EnhancedTableHead = function (_a) {
    var sortModel = _a.sortModel, onRequestSort = _a.onRequestSort, headCells = _a.headCells, actions = _a.actions;
    console.log("Rendeting EnhancedTableHead");
    var createSortHandler = function (property) { return function (event) {
        if (onRequestSort)
            onRequestSort(event, property);
    }; };
    return (_jsx(TableHead, { children: _jsxs(TableRow, { children: [headCells.map(function (headCell) {
                    return !headCell.hide &&
                        !headCell.collapsible && (_jsx(TableCell, __assign({ align: headCell.align, component: "th", padding: headCell.disablePadding ? "none" : "normal", sortDirection: sortModel.field === headCell.id ? sortModel.sort : false }, { children: _jsx(TableSortLabel, __assign({ active: sortModel.field === headCell.id, direction: sortModel.field === headCell.id ? sortModel.sort : "asc", onClick: createSortHandler(headCell.id), sx: { whiteSpace: "nowrap" } }, { children: headCell.label })) }), headCell.id));
                }), actions && (_jsx(ActionTableCell, __assign({ align: "center", component: "th" }, { children: "Acciones" }), "actions"))] }) }));
};
export default memo(EnhancedTableHead);
//# sourceMappingURL=EnhancedTableHead.js.map