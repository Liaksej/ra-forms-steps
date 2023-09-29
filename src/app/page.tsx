"use client";

import { TrainingForm } from "@/components/TrainingForm";
import { TrainingTable } from "@/components/TrainingTable";
import { useReducer } from "react";
import { utils } from "@/utils";

interface State {
  rows: {
    date: string;
    distance: number;
    actions: undefined;
  }[];
  editedRow: {
    data: {
      date: string;
      distance: number;
      actions: undefined;
    };
    index: number;
  } | null;
  formFields: { date: string; distance: string };
  validatedFormFields: { date: boolean; distance: boolean };
}

interface Action {
  type:
    | "addNewRow"
    | "deleteRow"
    | "editRow"
    | "changeDate"
    | "changeDistance"
    | "changeFormFields"
    | "validateFormFields";
  payload: any;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "addNewRow":
      if (state.editedRow) {
        const newRows = [...state.rows];
        newRows[state.editedRow.index] = action.payload;

        return {
          ...state,
          rows: newRows.sort(
            (a, b) => utils(a.date).getTime() - utils(b.date).getTime(),
          ),
          editedRow: null,
        };
      } else {
        const existingRow = state.rows.find(
          (row) => row.date === action.payload.date,
        );
        if (existingRow) {
          return {
            ...state,
            rows: state.rows.map((row) =>
              row.date === action.payload.date
                ? {
                    ...row,
                    distance: row.distance + action.payload.distance,
                  }
                : row,
            ),
          };
        } else {
          return {
            ...state,
            rows: [...state.rows, action.payload].sort(
              (a, b) => utils(a.date).getTime() - utils(b.date).getTime(),
            ),
          };
        }
      }
    case "deleteRow":
      return {
        ...state,
        rows: state.rows.filter((row) => row.date !== action.payload),
      };
    case "editRow":
      const rowIndex = state.rows.findIndex(
        (row) => row.date === action.payload,
      );
      return {
        ...state,
        editedRow: { data: state.rows[rowIndex], index: rowIndex },
      };
    case "changeDate":
      if (!state.editedRow) {
        return state;
      }
      return {
        ...state,
        editedRow: {
          ...state.editedRow,
          data: {
            ...state.editedRow?.data,
            date: action.payload,
          },
        },
      };
    case "changeDistance":
      if (!state.editedRow) {
        return state;
      }
      return {
        ...state,
        editedRow: {
          ...state.editedRow,
          data: {
            ...state.editedRow?.data,
            distance: action.payload,
          },
        },
      };
    case "changeFormFields": {
      return {
        ...state,
        formFields: action.payload,
      };
    }
    case "validateFormFields": {
      return {
        ...state,
        validatedFormFields: action.payload,
      };
    }
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, {
    rows: [],
    editedRow: null,
    formFields: { date: "", distance: "" },
    validatedFormFields: { date: true, distance: true },
  });

  return (
    <div className="flex h-screen justify-start flex-col w-fit mx-auto">
      <TrainingForm
        rows={state.rows}
        editedRow={state.editedRow}
        formFields={state.formFields}
        validatedFormFields={state.validatedFormFields}
        dispatch={dispatch}
      />
      <TrainingTable
        rows={state.rows}
        editedRow={state.editedRow}
        dispatch={dispatch}
      />
    </div>
  );
}
