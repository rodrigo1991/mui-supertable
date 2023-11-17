import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, TableRow, Tooltip } from "@mui/material";
import {
  ComponentType,
  FC,
  PropsWithChildren,
  ReactNode,
  forwardRef,
  memo,
  useState,
} from "react";
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
  onClick?: (row: T) => void;
  Actions?: ComponentType<ActionProps<T>>;
}

const Content: FC<PropsWithChildren> = forwardRef((props, ref) => (
  <div {...props} ref={ref as React.RefObject<HTMLDivElement>}>
    {props.children}
  </div>
));

const Rows = <T extends IdBase>({
  rows,
  headCells,
  rowColor,
  colorField,
  setReload,
  onPageChange,
  onClick,
  Actions,
}: RowsProps<T>) => {
  // console.log('🚀 ~ rendering: Rows.tsx:152 ~ Rows:');
  const [selected, setSelected] = useState<string>("");
  const handleClick = (row: T) => {
    setSelected(row.id);
    if (onClick) onClick(row);
  };

  // const isSelected = (id: string) => selected.indexOf(id) !== -1;
  const isSelected = (id: string) => selected === id;

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
      case "visible":
        formatted = val ? <VisibilityIcon /> : <VisibilityOffIcon />;
        break;
      case "text":
        if (typeof val === "string")
          formatted =
            val.length > 50 ? (
              <Tooltip title={val}>
                <Content>{`${val.slice(0, 50)}...`}</Content>
              </Tooltip>
            ) : (
              <Content>{val}</Content>
            );
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
      {rows.map((row) => {
        const isItemSelected = isSelected(row.id);
        return (
          <TableRow
            key={row.id}
            hover
            onClick={() => onClick && handleClick(row)}
            selected={isItemSelected}
            sx={{
              backgroundColor:
                colorField && rowColor
                  ? rowColor[getVal(colorField, row)]
                  : null,
              cursor: onClick ? "pointer" : "default",
            }}
          >
            {headCells.map((headCell) => {
              const { id } = headCell;
              const val = getVal(id.split("."), row);
              const slug =
                headCell.link?.slug &&
                getVal(headCell.link.slug.split("."), row);
              const href = slug
                ? `${headCell.link?.href}/${slug}`
                : headCell.link?.href || null;

              const params =
                headCell.button?.params &&
                headCell.button.params.map((param: string) =>
                  getVal(param.split("."), row)
                );

              let cell = null;

              if (href && val)
                cell = (
                  <Link href={href}>{`${formatCell(val, headCell.type)}`}</Link>
                );
              else if (
                headCell.button &&
                params &&
                !params.some((param) => param === null)
              )
                cell = (
                  <Button
                    onClick={() => headCell.button?.onClick(...params)}
                  >{`${formatCell(val, headCell.type)}`}</Button>
                );
              else cell = formatCell(val, headCell.type);

              return (
                <StyledTableCell
                  key={id}
                  align={headCell.align}
                  padding={headCell.disablePadding ? "none" : "normal"}
                >
                  {cell}
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
        );
      })}
    </>
  );
};
export default memo(Rows) as typeof Rows;
