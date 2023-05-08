/* eslint-disable react/prop-types */
import { useField } from "formik";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";

const SelectInput = ({ label, labelId, margin, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl margin={margin}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select labelId={labelId} label={label} {...field} {...props} />
      {meta.touched && meta.error && <FormHelperText>{meta.touched && Boolean(meta.error)}</FormHelperText>}
    </FormControl>
  );
};

export default SelectInput;
