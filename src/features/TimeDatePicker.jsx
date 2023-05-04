/* eslint-disable react/prop-types */
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { FormControl, FormHelperText } from "@mui/material";
import dayjs from "dayjs";

import { useField, useFormikContext } from "formik";

export default function TimeDatePicker({ label, ...props }) {
  const { values, setFieldValue } = useFormikContext("date");
  const [field, meta] = useField(props);

  return (
    <FormControl margin="dense">
      <MobileDateTimePicker
        label={label}
        {...field}
        {...props}
        value={dayjs(values.date)}
        // disablePast
        minDate={dayjs()}
        onChange={e => setFieldValue(dayjs(e))}
      />
      {meta.touched && meta.error && <FormHelperText>{meta.touched && Boolean(meta.error)}</FormHelperText>}
    </FormControl>
  );
}
