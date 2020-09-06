import * as React from "react";
import {
  Formik,
  Form,
  Field,
  useField,
  FieldProps,
  ErrorMessage,
} from "formik";
import { TextField } from "@material-ui/core";

export function Select(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field as="select" type="text" id={name} name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextField}></ErrorMessage>
    </div>
  );
}
