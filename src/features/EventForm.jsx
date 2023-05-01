import {
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Button,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
//date-fns
import { format, parseISO } from "date-fns";
//redux
import { useDispatch, useSelector } from "react-redux";
import { createEvent, updateEvent } from "../store/slice";
import { closeForm, editingFalse, resetEvent, setValues, resetValues } from "../store/formSlice";
//formik
import { useFormik } from "formik";
//yup
import * as Yup from "Yup";
//react-router-dom
import { Form } from "react-router-dom";
//utility
import getCities from "../utility/getCities";
import getCountries from "../utility/getCountries";
import getDate from "../utility/getDate";
import { tags } from "../utility/tags";

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

const lookUp = {
  title: "textfield",
  country: "select",
  city: "select",
  date: "textfield - date",
  tags: "select - combobox",
  description: "textfield - textarea",
};

const validationSchema = Yup.object({
  title: Yup.string("Enter title of your event.")
    .required("Event title is required.")
    .min(5, "Event title should be of minimum 5 characters length."),
  country: Yup.string().required("Event country is required.").oneOf(["SK", "CZ", "HU"]),
  city: Yup.string().required("Event city is required."),
  date: Yup.date(),
  description: Yup.string("Enter description of your event.")
    .required("Event description is required.")
    .min(10, "Event description should be of minimum 10 characters length.")
    .max(100, "Event description should be of maximum 100 characters length."),
});

const EventForm = () => {
  const { values, isEditing, event } = useSelector(store => store.formReducer);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: Object.keys(event).length > 0 ? event : values,
    validationSchema: validationSchema,
    onSubmit: values => {
      if (!isEditing) {
        dispatch(createEvent(values));
        dispatch(closeForm());
        console.log(values);
        return;
      }
      if (isEditing) {
        dispatch(updateEvent(values));
        dispatch(closeForm());
        console.log(values);
        return;
      }
    },
  });

  return (
    <Paper
      sx={{ display: "flex", flexDirection: "column", p: 2 }}
      component={Form}
      method="post"
      action="new-event"
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="h5">{isEditing ? "Edit event" : "Create new event"}</Typography>
      {/* event name */}
      <TextField
        id="title"
        name="title"
        label="Event"
        margin="dense"
        placeholder="e.g Roadtrip around Hungary"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      {/* country */}
      <TextField
        id="country"
        name="country"
        select
        margin="dense"
        value={formik.values.country}
        onChange={formik.handleChange}
        error={formik.touched.country && Boolean(formik.errors.country)}
        helperText={formik.touched.country && formik.errors.country}
      >
        {getCountries("slovakia", "czech republic", "hungary").map(country => (
          <MenuItem key={country?.name} value={country.isoCode}>
            {country.name}
          </MenuItem>
        ))}
      </TextField>
      {/* city */}
      <TextField
        id="city"
        name="city"
        select
        value={formik.values.city}
        onChange={formik.handleChange}
        error={formik.touched.city && Boolean(formik.errors.city)}
        helperText={formik.touched.city && formik.errors.city}
        margin="dense"
      >
        {getCities(formik.values.country).map(city => (
          <MenuItem key={`${city.name + city.latitude}`} value={city.name}>
            {city.name}
          </MenuItem>
        ))}
      </TextField>
      {/* date */}
      <TextField
        type="date"
        margin="dense"
        name="date"
        value={formik.values.date}
        onChange={formik.handleChange}
        error={formik.touched.date && Boolean(formik.errors.date)}
        helperText={formik.touched.date && formik.errors.date}
      />
      {/* tags */}
      <FormControl margin="dense">
        <InputLabel id="tags">Tags</InputLabel>
        <Select
          labelId="tags"
          id="tags"
          name="tags"
          multiple
          value={formik.values.tags}
          onChange={formik.handleChange}
          input={<OutlinedInput label="select2" />}
          renderValue={selected => selected.join(", ")}
          MenuProps={MenuProps}
          error={formik.touched.tags && Boolean(formik.errors.tags)}
          helperText={formik.touched.tags && formik.errors.tags}
        >
          {tags.map(tag => {
            return (
              <MenuItem key={tag.id} value={tag.name}>
                <Checkbox checked={formik.values.tags.indexOf(tag.name) > -1} />
                <ListItemText primary={tag.name} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {/* desc */}
      <TextField
        id="description"
        name="description"
        label="Description"
        margin="dense"
        multiline
        maxRows={4}
        placeholder="Our plan trip..."
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      {/* buttons */}
      <Box sx={{ display: "flex", alignItems: "flex-end", width: 1, justifyContent: "space-between", mt: 4 }}>
        <Button
          type="button"
          variant="outlined"
          onClick={() => {
            dispatch(closeForm());
            dispatch(editingFalse());
            dispatch(resetValues());
            dispatch(resetEvent());
          }}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default EventForm;
