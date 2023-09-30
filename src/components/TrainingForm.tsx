"use client";

import { Button, FormHelperText, TextField } from "@mui/material";
import { FormEvent, Dispatch } from "react";
import { isValidDate, isValidDistance } from "@/utils";

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

interface TrainingFormProps {
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
  formFields: { date: string; distance: string };
  validatedFormFields: { date: boolean; distance: boolean };
}

export const TrainingForm = ({
  dispatch,
  editedRow,
  formFields,
  validatedFormFields,
}: TrainingFormProps) => {
  const handlerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const dateFieldElement = form.elements.namedItem(
      "date",
    ) as HTMLInputElement;
    const distanceFieldElement = form.elements.namedItem(
      "distance",
    ) as HTMLInputElement;
    const dateField: string = dateFieldElement?.value;
    const distanceField: number = Number(distanceFieldElement?.value);

    if (!isValidDate(dateField)) {
      dispatch({
        type: "validateFormFields",
        payload: { date: "Введите дату в формате ДД.ММ.ГГ" },
      });
      return;
    } else {
      dispatch({ type: "validateFormFields", payload: { date: true } });
    }

    if (!isValidDistance(distanceField)) {
      dispatch({
        type: "validateFormFields",
        payload: { distance: "Введите число" },
      });
      return;
    } else {
      dispatch({ type: "validateFormFields", payload: { distance: true } });
    }

    const row = {
      date: dateField,
      distance: distanceField,
    };
    dispatch({ type: "addNewRow", payload: row });

    dispatch({ type: "changeFormFields", payload: { date: "", distance: "" } });
  };

  return (
    <form id="form" className="p-4 flex gap-2" onSubmit={handlerSubmit}>
      <div className="date-field">
        <TextField
          name="date"
          id="outlined-basic"
          label="Дата (ДД.ММ.ГГ)"
          variant="outlined"
          required={true}
          value={
            editedRow && editedRow.data ? editedRow.data.date : formFields.date
          }
          onChange={(event) => {
            if (editedRow && editedRow.data) {
              dispatch({ type: "changeDate", payload: event.target.value });
            } else {
              dispatch({
                type: "changeFormFields",
                payload: { ...formFields, date: event.target.value },
              });
            }
          }}
        />

        <FormHelperText error>{validatedFormFields.date}</FormHelperText>
      </div>
      <div className="distance-field">
        <TextField
          name="distance"
          id="outlined-basic"
          label="Пройдено км"
          variant="outlined"
          required={true}
          value={
            editedRow && editedRow.data
              ? editedRow.data.distance
              : formFields.distance
          }
          onChange={(event) => {
            if (editedRow && editedRow.data) {
              dispatch({ type: "changeDistance", payload: event.target.value });
            } else {
              dispatch({
                type: "changeFormFields",
                payload: { ...formFields, distance: event.target.value },
              });
            }
          }}
        />
        <FormHelperText error>{validatedFormFields.distance}</FormHelperText>
      </div>
      <Button variant="outlined" className="h-[56px]" type="submit">
        Ok
      </Button>
    </form>
  );
};
