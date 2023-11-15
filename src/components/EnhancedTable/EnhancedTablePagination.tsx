import { TablePagination } from "@mui/material";
import { FC, memo } from "react";

interface DefaultLabelDisplayedRowsInterface {
  from: number;
  to: number;
  count: number;
}

interface EnhancedTablePaginationProps {
  rowCount: number;
  pageSize: number;
  page: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  sm: boolean;
}

const defaultLabelDisplayedRows = ({
  from,
  to,
  count,
}: DefaultLabelDisplayedRowsInterface) =>
  `${from}–${to} de ${count !== -1 ? count : `more than ${to}`}`;

const EnhancedTablePagination: FC<EnhancedTablePaginationProps> = ({
  rowCount,
  pageSize,
  page,
  onPageChange,
  onRowsPerPageChange,
  sm,
}) => (
  <TablePagination
    rowsPerPageOptions={[5, 20, 50, 100]}
    component="div"
    count={rowCount}
    rowsPerPage={pageSize}
    page={page}
    labelRowsPerPage={sm ? "Filas por página" : "Filas"}
    labelDisplayedRows={defaultLabelDisplayedRows}
    onPageChange={onPageChange}
    onRowsPerPageChange={onRowsPerPageChange}
  />
);

const MemoizedEnhancedTablePagination = memo(
  EnhancedTablePagination
) as typeof EnhancedTablePagination;
export default MemoizedEnhancedTablePagination;
// export default EnhancedTablePagination;
