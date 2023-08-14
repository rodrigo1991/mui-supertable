import { jsx as _jsx } from "react/jsx-runtime";
import { TablePagination } from '@mui/material';
import { memo } from 'react';
var defaultLabelDisplayedRows = function (_a) {
    var from = _a.from, to = _a.to, count = _a.count;
    return "".concat(from, "\u2013").concat(to, " de ").concat(count !== -1 ? count : "more than ".concat(to));
};
var EnhancedTablePagination = function (_a) {
    var rowCount = _a.rowCount, pageSize = _a.pageSize, page = _a.page, onPageChange = _a.onPageChange, onRowsPerPageChange = _a.onRowsPerPageChange, sm = _a.sm;
    console.log('🚀 ~ file: EnhancedTablePagination.tsx:51 ~ rowCount:', rowCount);
    return (_jsx(TablePagination, { rowsPerPageOptions: [5, 20, 50, 100], component: "div", count: rowCount, rowsPerPage: pageSize, page: page, labelRowsPerPage: sm ? 'Filas por página' : 'Filas', labelDisplayedRows: defaultLabelDisplayedRows, onPageChange: onPageChange, onRowsPerPageChange: onRowsPerPageChange }));
};
var MemoizedEnhancedTablePagination = memo(EnhancedTablePagination);
export default MemoizedEnhancedTablePagination;
//# sourceMappingURL=EnhancedTablePagination.js.map