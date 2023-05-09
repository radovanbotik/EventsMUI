/* eslint-disable react/prop-types */
import { useField } from "formik";
import { FormControl, InputLabel, FormHelperText, Select } from '@mui/material';

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
