import { useField } from "formik";
import { TextField } from '@mui/material';

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
