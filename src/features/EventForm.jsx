import { Paper, Typography, Box, Button, MenuItem, Checkbox, ListItemText } from "@mui/material";
//date-fns
import { format, parseISO } from "date-fns";
//redux
import { useDispatch, useSelector } from "react-redux";
import { createEvent, updateEvent } from "../store/slice";
import { closeForm, editingFalse, resetEvent, setValues, resetValues } from "../store/formSlice";
//formik
import { Formik } from "formik";
//yup
import * as Yup from "yup";
//react-router-dom
import { Form } from "react-router-dom";
//utility
import getCities from "../utility/getCities";
import getCountries from "../utility/getCountries";
import Input from "./Input";
import SelectInput from "./SelectInput";
import { tags } from "../utility/tags";
import ComboBox from "./ComboBox";

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

  console.log("hello");

  return (
    <Formik
      initialValues={Object.keys(event).length > 0 ? event : values}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values);
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
      }}
    >
      {formikProps => (
        <Paper
          sx={{ display: "flex", flexDirection: "column", p: 2 }}
          component={Form}
          method="post"
          action="new-event"
          onSubmit={formikProps.handleSubmit}
        >
          <Typography variant="h5">{isEditing ? "Edit event" : "Create new event"}</Typography>
          <Input label="Title" name="title" type="text" placeholder="e.g Roadtrip around Hungary" margin="dense" />
          <SelectInput label="Country" name="country" margin="dense" labelId="country-label">
            {getCountries("slovakia", "czech republic", "hungary").map(country => (
              <MenuItem key={country.name} value={country.isoCode}>
                {country.name}
              </MenuItem>
            ))}
          </SelectInput>

          <SelectInput label="City" name="city" margin="dense" labelId="city-label">
            {getCities(formikProps.values.country).map(city => (
              <MenuItem key={`${city.name + city.latitude}`} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </SelectInput>
          {/* Date */}
          <Input name="date" type="date" margin="dense" />
          {/* Tags */}
          <ComboBox label="Tags" name="tags" labelId="tags-label" margin="dense">
            {tags.map(tag => {
              return (
                <MenuItem key={tag.id} value={tag.name}>
                  <Checkbox checked={formikProps.values.tags.indexOf(tag.name) > -1} />
                  <ListItemText primary={tag.name} />
                </MenuItem>
              );
            })}
          </ComboBox>
          {/* desc */}
          <Input
            label="Description"
            name="description"
            placeholder="Describe the event."
            margin="dense"
            multiline
            maxRows={4}
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
      )}
    </Formik>
  );
};

export default EventForm;
