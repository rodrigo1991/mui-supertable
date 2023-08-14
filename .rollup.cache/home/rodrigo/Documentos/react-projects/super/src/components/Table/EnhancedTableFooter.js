import { __assign } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { TableFooter, TableRow, Chip } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import WarningIcon from '@mui/icons-material/Warning';
import StyledTableFooterCell from './StyledTableFooterCell';
var EnhancedTableFooter = function (_a) {
    var chips = _a.chips, sm = _a.sm;
    return (_jsx(TableFooter, __assign({ sx: { float: sm ? 'left' : 'none' } }, { children: _jsx(TableRow, { children: chips.map(function (chip) { return (_jsx(StyledTableFooterCell, { children: chip.color === 'error' ? (_jsx(Chip, { color: chip.color, variant: chip.variant, label: chip.label, clickable: true, onClick: chip.onClick, onDelete: chip.onDelete })) : (_jsx(Chip, { color: chip.color, variant: chip.variant, label: chip.label, clickable: true, onClick: chip.onClick, onDelete: chip.onDelete, deleteIcon: chip.color === 'warning' ? _jsx(WarningIcon, {}) : _jsx(DoneIcon, {}) })) }, Math.random())); }) }) })));
};
export default EnhancedTableFooter;
//# sourceMappingURL=EnhancedTableFooter.js.map