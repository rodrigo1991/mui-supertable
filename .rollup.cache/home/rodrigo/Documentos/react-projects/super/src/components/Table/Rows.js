import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { TableRow } from "@mui/material";
import { memo } from "react";
import Link from "next/link";
import { format } from "rut.js";
import { currencyFormat, formatFecha } from "./helper";
import StyledTableCell from "./StyledTableCell";
var Rows = function (_a) {
    var rows = _a.rows, headCells = _a.headCells, rowColor = _a.rowColor, colorField = _a.colorField, Actions = _a.Actions, setReload = _a.setReload, onPageChange = _a.onPageChange;
    console.log("🚀 ~ file: Row.tsx:35 ~ row");
    var formatCell = function (val, type) {
        var formatted = null;
        switch (type) {
            case "currency":
                if (typeof val === "number" || typeof val === "string")
                    formatted = currencyFormat(val);
                break;
            case "rut":
                if (typeof val === "string")
                    formatted = format(val);
                break;
            case "date":
                if (typeof val === "string")
                    formatted = formatFecha(val);
                break;
            case "boolean":
                formatted = val ? _jsx(CheckBoxIcon, {}) : _jsx(CheckBoxOutlineBlankIcon, {});
                break;
            default:
                formatted = val;
                break;
        }
        return formatted;
    };
    var getVal = function (keys, row) {
        var val = row[keys[0]];
        for (var i = 1; i < keys.length; i += 1) {
            var key = keys[i];
            val && (val = typeof val === "object" ? val[key] : val);
        }
        return val;
    };
    // if (colorField && rowColor) {
    //   const colorKey = getVal(colorField);
    //   backgroundColor = rowColor[colorKey];
    // }
    // const backgroundColor =
    //   colorField && rowColor ? rowColor[getVal(colorField, row)] : null;
    return (_jsx(_Fragment, { children: rows.map(function (row) { return (_jsxs(TableRow, __assign({ hover: true, sx: {
                backgroundColor: colorField && rowColor ? rowColor[getVal(colorField, row)] : null,
                // '& > *': { borderBottom: 'unset' },
            } }, { children: [headCells.map(function (cell) {
                    var _a, _b, _c;
                    var id = cell.id;
                    var val = getVal(id.split("."), row);
                    var slug = ((_a = cell.link) === null || _a === void 0 ? void 0 : _a.slug) && getVal(cell.link.slug.split("."), row);
                    var href = slug
                        ? "".concat((_b = cell.link) === null || _b === void 0 ? void 0 : _b.href, "/").concat(slug)
                        : ((_c = cell.link) === null || _c === void 0 ? void 0 : _c.href) || null;
                    return (_jsx(StyledTableCell, { children: href && val ? (_jsx(Link, __assign({ href: href }, { children: "".concat(formatCell(val, cell.type)) }))) : (formatCell(val, cell.type)) }, id));
                }), Actions && (_jsx(Actions, { row: row, setReload: setReload, onPageChange: onPageChange }))] }), row.id)); }) }));
};
export default memo(Rows);
//# sourceMappingURL=Rows.js.map