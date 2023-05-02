/* eslint-disable react/prop-types */
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { FormControl } from "@mui/material";
import dayjs from "dayjs";

import { useField, useFormikContext } from "formik";

export default function TimeDatePicker({ label, ...props }) {
  const { values, setFieldValue } = useFormikContext();
  const [field] = useField(props);

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
    </FormControl>
  );
}
