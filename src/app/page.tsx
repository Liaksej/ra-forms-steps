"use client";

import { TrainingForm } from "@/components/TrainingForm";
import { TrainingTable } from "@/components/TrainingTable";
import { useReducer } from "react";

interface State {
  rows: {
    date: string;
    distance: number;
    actions: undefined;
  }[];
}

interface Action {
  type: string;
  payload?: any;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "addNewRow":
      const existingRow = state.rows.find(
        (row) => (row.date = action.payload.date),
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
        return { ...state, rows: [...state.rows, action.payload] };
      }
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, { rows: [] });

  return (
    <div className="flex h-screen justify-start flex-col w-fit mx-auto">
      <TrainingForm dispatch={dispatch} />
      <TrainingTable rows={state.rows} />
    </div>
  );
}
