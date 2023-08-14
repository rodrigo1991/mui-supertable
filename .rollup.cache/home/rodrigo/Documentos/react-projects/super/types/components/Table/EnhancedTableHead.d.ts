/// <reference types="react" />
import { HeadCell, TableSortModel } from "./types";
interface EnhancedTableHeadProps<T> {
    sortModel: TableSortModel<T>;
    onRequestSort?: (event: React.MouseEvent<unknown>, property: string) => void;
    headCells: HeadCell<T>[];
    actions: boolean;
}
declare const _default: <T>({ sortModel, onRequestSort, headCells, actions, }: EnhancedTableHeadProps<T>) => import("react/jsx-runtime").JSX.Element;
export default _default;
