import { useField } from "formik";
import { TextField } from "@mui/material";
import { useFormikContext } from "formik";

const BasicInput = ({ ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { values, setValues, setFieldValue } = useFormikContext("date");

  // console.log(field.name);
  return (
    <TextField
      className="text-input"
      {...field}
      {...props}
      // size="small"
      // value={values[field.name]}
      // onChange={e => {
      //   setFieldValue([field.name], e.target.value);
      //   setValues({ ...values, [field.name]: e.target.value });
      // }}
      helperText={meta.touched && meta.error}
      error={meta.touched && Boolean(meta.error)}
      // label={label}
      // margin={margin}
    />
  );
};

export default BasicInput;
