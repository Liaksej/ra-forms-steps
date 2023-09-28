"use client";

import { Button, TextField } from "@mui/material";
import { FormEvent, Dispatch } from "react";

interface Action {
  type: string;
  payload: any;
}

interface TrainingFormProps {
  dispatch: Dispatch<Action>;
}

export const TrainingForm = ({ dispatch }: TrainingFormProps) => {
  const handlerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const dateField: string = (
      form.elements.namedItem("date") as HTMLInputElement
    )?.value;
    const distanceField: number = Number(
      (form.elements.namedItem("distance") as HTMLInputElement)?.value,
    );
    const row = { date: dateField, distance: distanceField };
    dispatch({ type: "addNewRow", payload: row });
  };

  return (
    <form id="form" className="p-4 flex gap-2" onSubmit={handlerSubmit}>
      <TextField
        name="date"
        id="outlined-basic"
        label="Дата (ДД.ММ.ГГ)"
        variant="outlined"
        required={true}
      />
      <TextField
        name="distance"
        id="outlined-basic"
        label="Пройдено км"
        variant="outlined"
        required={true}
      />
      <Button variant="outlined" className="h-[56px]" type="submit">
        Ok
      </Button>
    </form>
  );
};
