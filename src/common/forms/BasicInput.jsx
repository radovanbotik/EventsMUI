import { useField } from "formik";
import { TextField } from "@mui/material";
import { useFormikContext } from "formik";

const BasicInput = ({ submitOnKeyDown, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { handleSubmit, resetForm } = useFormikContext();
  return (
    <TextField
      className="text-input"
      {...field}
      {...props}
      InputLabelProps={{
        style: { color: meta.error ? "red" : "grey" },
      }}
      InputProps={{
        style: { backgroundColor: meta.error ? "rgba(255, 0, 0, 0.06)" : "rgba(0, 0, 0, 0.06)" },
      }}
      helperText={meta.touched && meta.error}
      error={meta.touched && Boolean(meta.error)}
      onKeyDown={(e) => {
        if (submitOnKeyDown === true) {
          if (!e.shiftKey && e.key == "Enter") {
            e.preventDefault();
            e.target.blur();
            handleSubmit();
            return;
          }
          if (e.shiftKey && e.key == "Enter") {
            return;
          }
        }
      }}
    />
  );
};

export default BasicInput;
