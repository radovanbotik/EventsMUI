import { useField } from "formik";
import { TextField } from "@mui/material";
import { useFormikContext } from "formik";

const BasicInput = ({ submitOnKeyDown, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { values, setValues, setFieldValue, handleSubmit } = useFormikContext();

  return (
    <TextField
      className="text-input"
      {...field}
      {...props}
      helperText={meta.touched && meta.error}
      error={meta.touched && Boolean(meta.error)}
      onKeyDown={e => {
        if (submitOnKeyDown === true) {
          if (!e.shiftKey && e.key === "Enter") {
            console.log(e.key);
            handleSubmit();
          }
        }
      }}
    />
  );
};

export default BasicInput;
