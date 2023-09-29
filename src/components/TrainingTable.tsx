import {
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { Dispatch, MouseEvent } from "react";

interface Column {
  id: "date" | "distance" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "date", label: "Дата\u00a0(ДД.ММ.ГГ)", minWidth: 170, align: "left" },
  {
    id: "distance",
    label: "Пройдено\u00a0км",
    minWidth: 170,
    align: "center",
  },
  {
    id: "actions",
    label: "Действия",
    minWidth: 170,
    align: "right",
  },
];

interface Action {
  type: "addNewRow" | "deleteRow" | "editRow" | "changeDate" | "changeDistance";
  payload: any;
}

interface TrainingTableProps {
  rows: { date: string; distance: number; actions: undefined }[] | [];
  dispatch: Dispatch<Action>;
  editedRow: {
    data: {
      date: string;
      distance: number;
      actions: undefined;
    };
    index: number;
  } | null;
}

export const TrainingTable = ({ rows, dispatch }: TrainingTableProps) => {
  const handlerDelete = (event: MouseEvent) => {
    event.preventDefault();

    const tabRow = (event.target as HTMLTableRowElement).closest("tr");
    const dateField = tabRow?.firstElementChild?.textContent;

    dispatch({ type: "deleteRow", payload: dateField });
  };

  const handlerEdit = (
    event: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    const tabRow = (event.target as HTMLTableRowElement).closest("tr");
    const dateField = tabRow?.firstElementChild?.textContent;

    dispatch({ type: "editRow", payload: dateField });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 1111 }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.date}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((column) => {
                  let value = row[column.id];
                  if (column.id === "actions") {
                    value = undefined;
                  }
                  if (column.id === "date") {
                    value = row.date;
                  }
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {value === undefined ? (
                        <>
                          <IconButton
                            aria-label="edit"
                            size="small"
                            onClick={(event) => handlerEdit(event)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="clear"
                            size="small"
                            onClick={(event) => handlerDelete(event)}
                          >
                            <ClearIcon />
                          </IconButton>
                        </>
                      ) : (
                        value
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </TableContainer>
    </Paper>
  );
};
