import React from "react";
import { TextField } from "@material-ui/core";

export const TextFieldFormik = ({
  formik,
  name,
  label,
  helperTextDefault = "",
  ...props
}) => {
  return (
    <TextField
      fullWidth
      helperText={
        formik.touched[name] && formik.errors[name]
          ? formik.errors[name]
          : helperTextDefault
      }
      error={formik.touched[name] && formik.errors[name]}
      label={label}
      margin="dense"
      name={name}
      onChange={formik.handleChange}
      value={formik.values[name]}
      variant="outlined"
    />
  );
};
