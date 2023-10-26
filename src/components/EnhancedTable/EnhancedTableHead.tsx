import { TableCell, TableRow, TableHead, TableSortLabel } from "@mui/material";
import { memo } from "react";

import ActionTableCell from "./StyledTableActionCell";
import {
  HeadCell,
  NestedKeyOf,
  OnRequestSort,
  TableSortModel,
} from "./EnhancedTable.types";

interface EnhancedTableHeadProps<T extends object> {
  sortModel?: TableSortModel<T>;
  onRequestSort?: OnRequestSort<T>;
  headCells: HeadCell<T>[];
  actions: boolean;
}
const EnhancedTableHead = <T extends object>({
  sortModel,
  onRequestSort,
  headCells,
  actions,
}: EnhancedTableHeadProps<T>) => {
  // console.log('Rendeting EnhancedTableHead');
  const createSortHandler =
    (property: NestedKeyOf<T>) => (event: React.MouseEvent<unknown>) => {
      if (onRequestSort) onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(
          (headCell) =>
            !headCell.hide &&
            !headCell.collapsible && (
              <TableCell
                key={headCell.id}
                align={headCell.align}
                component="th"
                padding={headCell.disablePadding ? "none" : "normal"}
                sortDirection={
                  sortModel?.field === headCell.id ? sortModel?.sort : false
                }
              >
                {onRequestSort ? (
                  <TableSortLabel
                    active={sortModel?.field === headCell.id}
                    direction={
                      sortModel?.field === headCell.id ? sortModel?.sort : "asc"
                    }
                    onClick={createSortHandler(headCell.id)}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    {headCell.label}
                  </TableSortLabel>
                ) : (
                  headCell.label
                )}
              </TableCell>
            )
        )}
        {actions && (
          <ActionTableCell key="actions" align="center" component="th">
            Acciones
          </ActionTableCell>
        )}
      </TableRow>
    </TableHead>
  );
};
export default memo(EnhancedTableHead) as typeof EnhancedTableHead;
