/* eslint-disable react/prop-types */
import { useField } from "formik";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ComboBox = ({ label, labelId, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl margin="dense">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label}
        {...field}
        {...props}
        multiple
        MenuProps={MenuProps}
        renderValue={selected => selected.join(", ")}
        input={<OutlinedInput label="Tag" />}
      />
      {meta.touched && meta.error && <FormHelperText>{meta.touched && Boolean(meta.error)}</FormHelperText>}
    </FormControl>
  );
};

export default ComboBox;
