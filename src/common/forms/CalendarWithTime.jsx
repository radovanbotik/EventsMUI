/* eslint-disable react/prop-types */
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs from "dayjs";

import { useField, useFormikContext } from "formik";

import { FormControl, FormHelperText } from "@mui/material";

export default function CalendarWithTime({ label, ...props }) {
  const { values, setValues, setFieldValue } = useFormikContext("date");
  const [field, meta, helpers] = useField(props);
  return (
    <FormControl margin="dense">
      <MobileDateTimePicker
        label={label}
        {...field}
        {...props}
        value={dayjs(values.date)}
        disablePast
        onChange={e => setValues(prev => ({ ...prev, date: dayjs(e) }))}
        // minDate={dayjs()}
        // onChange={e => {
        //   // console.log(dayjs(e));
        //   // helpers.setValue(dayjs(e).toISOString());
        //   setValues(prev => ({ ...prev, date: dayjs(e).toISOString() }));
        // }}
      />
      {meta.touched && meta.error && <FormHelperText>{meta.touched && Boolean(meta.error)}</FormHelperText>}
    </FormControl>
  );
}
