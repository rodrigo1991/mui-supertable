import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { TableRow } from "@mui/material";
import { ComponentType, memo } from "react";
// import Link from "next/link";
import { format } from "rut.js";

import { currencyFormat, formatFecha } from "./helper";
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

  const getVal = (keys: string[], row: T) => {
    let val: any = row[keys[0] as keyof T];
    for (let i = 1; i < keys.length; i += 1) {
      const key = keys[i] as keyof typeof val;
      val &&= typeof val === "object" ? val[key] : val;
    }
    return val;
  };

  // if (colorField && rowColor) {
  //   const colorKey = getVal(colorField);
  //   backgroundColor = rowColor[colorKey];
  // }

  // const backgroundColor =
  //   colorField && rowColor ? rowColor[getVal(colorField, row)] : null;

  return (
    <>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          hover
          sx={{
            backgroundColor:
              colorField && rowColor ? rowColor[getVal(colorField, row)] : null,
            // '& > *': { borderBottom: 'unset' },
          }}
        >
          {headCells.map((cell) => {
            const { id } = cell;
            const val = getVal(id.split("."), row);
            const slug =
              cell.link?.slug && getVal(cell.link.slug.split("."), row);
            const href = slug
              ? `${cell.link?.href}/${slug}`
              : cell.link?.href || null;
            return (
              <StyledTableCell key={id}>
                {href && val
                  ? formatCell(val, cell.type)
                  : // <Link href={href}>{`${formatCell(val, cell.type)}`}</Link>
                    formatCell(val, cell.type)}
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
