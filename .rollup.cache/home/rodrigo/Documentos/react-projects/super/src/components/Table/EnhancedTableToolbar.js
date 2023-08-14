import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable react/jsx-props-no-spreading */
import { memo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import { Badge, Box, Grid, MenuItem, Popover, TextField, Tooltip, Typography, Toolbar, } from '@mui/material';
import { debounce } from 'lodash';
// import { es as esLocale } from 'date-fns/locale';
// import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import { formatDate } from '../../../utils/helper';
import { dateFilter, numberFilter, stringFilter } from './operators';
var EnhancedTableToolbar = function (_a) {
    var 
    // reload,
    setReload = _a.setReload, csvExport = _a.csvExport, filterValue = _a.filterValue, setFilterValue = _a.setFilterValue, headCells = _a.headCells, filterCount = _a.filterCount, setFilterCount = _a.setFilterCount, add = _a.add, title = _a.title;
    console.log('rendering EnhancedTableToolbar');
    // const isMounted = useRef(false);
    // const date = new Date();
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var _c = useState('text'), textType = _c[0], setTextType = _c[1];
    var _d = useState(stringFilter), operators = _d[0], setOperators = _d[1];
    // const [fechas, setFechas] = useState<DateRange<Date>>([
    //   new Date(date.getFullYear(), date.getMonth() - 1, 1),
    //   new Date(),
    // ]);
    var popoverId = open ? 'simple-popover' : undefined;
    var clear = function () {
        setOperators(stringFilter);
        if (setFilterValue)
            setFilterValue(function (prev) { return ({
                columnField: 'name',
                operatorValue: '%',
                value: prev.value === '' ? null : '',
            }); });
        setTextType('text');
        setFilterCount(0);
        setOpen(false);
    };
    var updateValue = function (value) {
        if (setFilterValue)
            setFilterValue(function (prevState) { return (__assign(__assign({}, prevState), { value: value })); });
        setFilterCount(value ? 1 : 0);
    };
    var debounceSetValue = debounce(updateValue, 500);
    var handleColumnChange = function (columnField) {
        if (setFilterValue)
            setFilterValue(function (prevState) { return (__assign(__assign({}, prevState), { columnField: columnField })); });
        console.log(columnField);
        var column = headCells === null || headCells === void 0 ? void 0 : headCells.find(function (headCell) { return headCell.id === columnField; });
        console.log(column);
        if (column)
            switch (column.type) {
                case 'number':
                    setOperators(numberFilter);
                    setTextType('text');
                    if (setFilterValue)
                        setFilterValue(function (prevState) { return (__assign(__assign({}, prevState), { operatorValue: numberFilter[0].id })); });
                    break;
                case 'string':
                    setOperators(stringFilter);
                    setTextType('text');
                    if (setFilterValue)
                        setFilterValue(function (prevState) { return (__assign(__assign({}, prevState), { operatorValue: stringFilter[0].id })); });
                    break;
                case 'date':
                    setOperators(dateFilter);
                    setTextType('date');
                    if (setFilterValue)
                        setFilterValue(function (prevState) { return (__assign(__assign({}, prevState), { operatorValue: dateFilter[0].id })); });
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
    return (_jsxs(_Fragment, { children: [_jsxs(Toolbar, __assign({ sx: {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                } }, { children: [_jsx(Typography, __assign({ sx: { flex: '1 1 100%' }, variant: "h6", id: "tableTitle", component: "div" }, { children: title && "".concat(title, "s") })), add && (_jsx(Tooltip, __assign({ title: "Crear ".concat(title) }, { children: _jsx(IconButton, __assign({ onClick: function () { return add(true); } }, { children: _jsx(AddIcon, {}) })) }))), csvExport && (_jsx(Tooltip, __assign({ title: "Exportar" }, { children: _jsx(IconButton, __assign({ onClick: csvExport }, { children: _jsx(FileDownloadOutlinedIcon, {}) })) }))), filterValue && setFilterValue && (_jsx(Tooltip, __assign({ title: "Filtros" }, { children: _jsx(IconButton, __assign({ onClick: function () { return setOpen(true); } }, { children: _jsx(Badge, __assign({ badgeContent: filterCount, color: "primary" }, { children: _jsx(FilterListIcon, {}) })) })) }))), setReload && (_jsx(Tooltip, __assign({ title: "Actualizar" }, { children: _jsx(IconButton, __assign({ onClick: function () { return setReload(function (prev) { return !prev; }); } }, { children: _jsx(RefreshIcon, {}) })) })))] })), open && (_jsx(Popover, __assign({ id: popoverId, open: open, onClose: function () { return setOpen(false); }, anchorReference: "anchorPosition", anchorPosition: { top: 198, left: 280 }, anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                } }, { children: _jsx(Box, __assign({ sx: { p: 1 } }, { children: _jsxs(Grid, __assign({ container: true, justifyContent: "center", alignItems: "flex-end", spacing: 1 }, { children: [_jsx(Grid, __assign({ item: true, xs: 1 }, { children: _jsx(IconButton, __assign({ size: "small", onClick: clear }, { children: _jsx(ClearIcon, { fontSize: "small" }) })) })), _jsx(Grid, __assign({ item: true, xs: 3 }, { children: _jsx(TextField, __assign({ id: "standard-select-column", select: true, label: "Columnas", variant: "standard", value: filterValue === null || filterValue === void 0 ? void 0 : filterValue.columnField, fullWidth: true, onChange: function (e) { return handleColumnChange(e.target.value); } }, { children: headCells === null || headCells === void 0 ? void 0 : headCells.map(function (columna) { return (_jsx(MenuItem, __assign({ value: columna.id }, { children: columna.label }), columna.id)); }) })) })), textType === 'date' ? (_jsx(Grid, { item: true, xs: 8 })) : (_jsxs(_Fragment, { children: [_jsx(Grid, __assign({ item: true, xs: 4 }, { children: _jsx(TextField, __assign({ id: "standard-select-operator", select: true, label: "Operadores", variant: "standard", value: filterValue === null || filterValue === void 0 ? void 0 : filterValue.operatorValue, fullWidth: true, onChange: function (e) {
                                                return setFilterValue &&
                                                    setFilterValue(function (prevState) { return (__assign(__assign({}, prevState), { operatorValue: e.target.value })); });
                                            } }, { children: operators.map(function (filter) { return (_jsx(MenuItem, __assign({ value: filter.id }, { children: filter.value }), filter.id)); }) })) })), _jsx(Grid, __assign({ item: true, xs: 4 }, { children: _jsx(TextField, { id: "standard-textarea", label: "Valor", placeholder: "Valor del filtro", variant: "standard", 
                                            // value={filterValue.value}
                                            fullWidth: true, autoFocus: true, onChange: function (e) { return debounceSetValue(e.target.value); } }) }))] }))] })) })) })))] }));
};
export default memo(EnhancedTableToolbar);
//# sourceMappingURL=EnhancedTableToolbar.js.map