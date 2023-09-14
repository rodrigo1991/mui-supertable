import { ChipProps, TableCellProps } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export interface IdBase {
  id: string | number;
}

export type Order = "asc" | "desc";

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export interface HeadCell<T extends object> extends TableCellProps {
  id: NestedKeyOf<T>;
  label: string;
  type: CellType;
  hide?: boolean;
  collapsible?: boolean;
  disablePadding?: boolean;
  link?: { href: string; slug?: NestedKeyOf<T> };
}

export type FooterChips<T extends object> = (
  sm: boolean,
  setFilterValue?: (
    filter: FilterValue<T> | ((prevVar: FilterValue<T>) => FilterValue<T>)
  ) => void,
  setFilterCount?: (value: number | ((prevVar: number) => number)) => void
) => ChipProps[];

export type CellType =
  | "string"
  | "number"
  | "date"
  | "boolean"
  | "currency"
  | "rut";

export interface TableSortModel<T extends object> {
  field: NestedKeyOf<T>;
  sort: Order;
}

export interface FilterValue<T extends object> {
  columnField: NestedKeyOf<T>;
  operatorValue: string;
  value: any;
}

export interface Filter {
  id: string;
  value: string;
}

export interface ActionProps<T> {
  row: T;
  setReload?: (reload: boolean | ((prev: boolean) => boolean)) => void;
  onPageChange?: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
}

export interface ActionDialogProps<T> extends ActionProps<T> {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export type OnRequestSort<T extends object> = (
  event: React.MouseEvent<unknown>,
  property: NestedKeyOf<T>
) => void;
