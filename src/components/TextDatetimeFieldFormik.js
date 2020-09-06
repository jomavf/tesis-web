import React from "react";
import { TextField } from "@material-ui/core";

export const TextDatetimeFieldFormik = ({
  formik,
  name,
  label,
  helperTextDefault = "",
  ...props
}) => {
  return (
    <TextField
      id="datetime-local"
      type="datetime-local"
      fullWidth
      helperText={
        formik.touched[name] && formik.errors[name]
          ? formik.errors[name]
          : helperTextDefault
      }
      defaultValue={new Date().toISOString().substr(0, 16)}
      error={formik.touched[name] && formik.errors[name]}
      label={label}
      margin="dense"
      name={name}
      onChange={formik.handleChange}
      value={formik.values[name]}
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};
