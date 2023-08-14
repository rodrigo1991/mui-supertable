import { FC } from 'react';
interface EnhancedTablePaginationProps {
    rowCount: number;
    pageSize: number;
    page: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    sm: boolean;
}
declare const MemoizedEnhancedTablePagination: FC<EnhancedTablePaginationProps>;
export default MemoizedEnhancedTablePagination;
