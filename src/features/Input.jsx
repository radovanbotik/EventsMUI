import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

const Input = ({ label, margin, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      className="text-input"
      {...field}
      {...props}
      helperText={meta.touched && meta.error}
      error={meta.touched && Boolean(meta.error)}
      label={label}
      margin={margin}
    />
  );
};

export default Input;
