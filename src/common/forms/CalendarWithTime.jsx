/* eslint-disable react/prop-types */
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useField, useFormikContext } from "formik";
import { FormControl, FormHelperText } from "@mui/material";
import BasicInput from "./BasicInput";

export default function CalendarWithTime({ label, ...props }) {
  const { values, setValues, setFieldValue } = useFormikContext();
  const [field, meta, helpers] = useField(props);
  return (
    <FormControl>
      <DateTimePicker
        label={label}
        {...field}
        {...props}
        // formatDensity="dense"
        disablePast
        views={["day"]}
        value={dayjs(values.date)}
        onChange={(e) => {
          setFieldValue("date", e);
        }}
        slots={{
          textField: BasicInput,
        }}
        slotProps={{
          textField: {
            ...props,
            // value: dayjs(values.date),
            // onChange: (e) => {
            //   setFieldValue("date", e);
            // },
            // error: meta.error,
          },
        }}
      />
      {meta.touched && meta.error && <FormHelperText>{meta.touched && Boolean(meta.error)}</FormHelperText>}
    </FormControl>
  );
}
