import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { TableRow } from "@mui/material";
import { ComponentType, memo } from "react";
import Link from "next/link";
import { format } from "rut.js";

import { currencyFormat, formatFecha, formatFechaShort } from "./helper";
import StyledTableCell from "./StyledTableCell";
import { ActionProps, CellType, HeadCell, IdBase } from "./EnhancedTable.types";

interface RowsProps<T extends object> {
  rows: T[];
  headCells: HeadCell<T>[];
  rowColor?: Record<string, string>;
  colorField?: string[];
  setReload?: (reload: boolean | ((prev: boolean) => boolean)) => void;
  onPageChange?: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  Actions?: ComponentType<ActionProps<T>>;
}

const Rows = <T extends IdBase>({
  rows,
  headCells,
  rowColor,
  colorField,
  Actions,
  setReload,
  onPageChange,
}: RowsProps<T>) => {
  console.log("🚀 ~ file: Row.tsx:35 ~ row");
  const formatCell = (
    val: string | number | boolean | null | undefined,
    type: CellType
  ) => {
    let formatted = null;
    switch (type) {
      case "currency":
        if (typeof val === "number" || typeof val === "string")
          formatted = currencyFormat(val);
        break;
      case "rut":
        if (typeof val === "string") formatted = format(val);
        break;
      case "date":
        if (typeof val === "string") formatted = formatFechaShort(val);
        break;
      case "datetime":
        if (typeof val === "string") formatted = formatFecha(val);
        break;
      case "boolean":
        formatted = val ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />;
        break;
      default:
        formatted = val;
        break;
    }
    return formatted;
  };

  // const formatCell = {
  //   currency: currencyFormat,
  //   rut: format,
  //   date: formatFechaShort,
  //   datetime: formatFecha,
  //   boolean: formatBoolean,
  //   string: (val: string | number | boolean | null | undefined) => val,
  //   number: (val: string | number | boolean | null | undefined) => val,
  // };

  const getVal = (keys: string[], row: T) => {
    let val: any = row[keys[0] as keyof T];
    for (let i = 1; i < keys.length; i += 1) {
      const key = keys[i] as keyof typeof val;
      val &&= typeof val === "object" ? val[key] : val;
    }
    return val;
  };

  return (
    <>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          hover
          sx={{
            backgroundColor:
              colorField && rowColor ? rowColor[getVal(colorField, row)] : null,
          }}
        >
          {headCells.map((headCell) => {
            const { id } = headCell;
            const val = getVal(id.split("."), row);
            const slug =
              headCell.link?.slug && getVal(headCell.link.slug.split("."), row);
            const href = slug
              ? `${headCell.link?.href}/${slug}`
              : headCell.link?.href || null;
            return (
              <StyledTableCell
                key={id}
                align={headCell.align}
                padding={headCell.disablePadding ? "none" : "normal"}
              >
                {href && val ? (
                  <Link href={href}>{`${formatCell(val, headCell.type)}`}</Link>
                ) : (
                  formatCell(val, headCell.type)
                )}
              </StyledTableCell>
            );
          })}
          {Actions && (
            <Actions
              row={row}
              setReload={setReload}
              onPageChange={onPageChange}
            />
          )}
        </TableRow>
      ))}
    </>
  );
};
export default memo(Rows) as typeof Rows;

// export default Rows;
