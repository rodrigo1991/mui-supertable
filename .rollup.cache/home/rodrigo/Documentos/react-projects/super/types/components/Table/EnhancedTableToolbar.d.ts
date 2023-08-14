import { FilterValue, HeadCell } from './types';
interface EnhancedTableToolbarProps<T> {
    setReload?: (reload: boolean | ((prev: boolean) => boolean)) => void;
    csvExport?: () => Promise<void> | undefined;
    filterValue?: FilterValue;
    setFilterValue?: (value: (prevVar: FilterValue) => FilterValue) => void;
    headCells?: HeadCell<T>[];
    filterCount: number;
    setFilterCount: (value: number | ((prevVar: number) => number)) => void;
    add?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
    title?: string;
}
declare const _default: <T>({ setReload, csvExport, filterValue, setFilterValue, headCells, filterCount, setFilterCount, add, title, }: EnhancedTableToolbarProps<T>) => import("react/jsx-runtime").JSX.Element;
export default _default;
