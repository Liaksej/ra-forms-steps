import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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

interface TrainingTableProps {
  rows: { date: string; distance: number; actions: undefined }[];
}

export const TrainingTable = ({ rows }: TrainingTableProps) => {
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
                    value = "Йойойо!";
                  }
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {value}
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
