import { ComponentType } from "react";
import { FilterValue, HeadCell, ActionProps, TableSortModel, IdBase, FooterChips } from "./types";
interface EnhancedTableProps<T> {
    setReload?: (reload: boolean | ((prevVar: boolean) => boolean)) => void;
    csvExport?: () => Promise<void>;
    filterValue?: FilterValue;
    setFilterValue?: (filter: FilterValue | ((prevVar: FilterValue) => FilterValue)) => void;
    loading: boolean;
    rows: T[];
    headCells: HeadCell<T>[];
    footerChips?: FooterChips;
    rowCount: number;
    page: number;
    pageSize: number;
    onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
    onRowsPerPageChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    sortModel: TableSortModel<T>;
    onRequestSort?: (event: React.MouseEvent<unknown>, property: string) => void;
    rowColor?: Record<string, string>;
    colorField?: string[];
    title?: string;
    add?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
    Actions?: ComponentType<ActionProps<T>>;
    ht?: number;
}
declare const _default: <T extends IdBase>({ setReload, csvExport, filterValue, setFilterValue, loading, headCells, rows, footerChips, rowCount, page, pageSize, onPageChange, onRowsPerPageChange, sortModel, onRequestSort, rowColor, colorField, title, add, Actions, ht, }: EnhancedTableProps<T>) => import("react/jsx-runtime").JSX.Element;
export default _default;
