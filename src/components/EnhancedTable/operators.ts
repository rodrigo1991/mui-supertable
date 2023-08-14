import { Filter } from "./EnhancedTable.types";

export const stringFilter: Filter[] = [
  {
    id: "%",
    value: "Contiene",
  },
  {
    id: "=",
    value: "Es igual a",
  },
];

export const numberFilter: Filter[] = [
  {
    id: ">=",
    value: "Es mayor o igual a",
  },
  {
    id: "<=",
    value: "Es menor o igual a",
  },
  {
    id: "=",
    value: "Es igual a",
  },
];

export const dateFilter: Filter[] = [
  {
    id: "between",
    value: "between",
  },
];
