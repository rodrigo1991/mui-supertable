import { ComponentType } from "react";
import { ActionProps, HeadCell, IdBase } from "./types";
interface RowsProps<T> {
    rows: T[];
    headCells: HeadCell<T>[];
    rowColor?: Record<string, string>;
    colorField?: string[];
    setReload?: (reload: boolean | ((prev: boolean) => boolean)) => void;
    onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
    Actions?: ComponentType<ActionProps<T>>;
}
declare const _default: <T extends IdBase>({ rows, headCells, rowColor, colorField, Actions, setReload, onPageChange, }: RowsProps<T>) => import("react/jsx-runtime").JSX.Element;
export default _default;
