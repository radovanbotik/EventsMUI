/* eslint-disable react/prop-types */
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import { useField, useFormikContext } from "formik";

import { FormControl, FormHelperText } from "@mui/material";

export default function CalendarWithTime({ label, ...props }) {
  const { values, setValues, setFieldValue } = useFormikContext();
  const [field, meta, helpers] = useField(props);
  return (
    <FormControl margin="dense">
      <DateTimePicker
        label={label}
        {...field}
        {...props}
        disablePast
        value={dayjs(values.date)}
        onChange={e => {
          setFieldValue("date", e);
        }}
      />
      {meta.touched && meta.error && <FormHelperText>{meta.touched && Boolean(meta.error)}</FormHelperText>}
    </FormControl>
  );
}
