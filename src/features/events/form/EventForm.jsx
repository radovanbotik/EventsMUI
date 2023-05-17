//redux
import { useDispatch, useSelector } from "react-redux";
import { createEvent, updateEvent } from "../../../store/eventSlice";
import { closeForm, editingFalse, resetEvent, resetValues } from "../../../store/formSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { Form } from "react-router-dom";

import BasicInput from "../../../common/forms/BasicInput";
import { tags } from "../../../common/util/tags";
import SelectAutocomplete from "../../../common/forms/SelectAutocomplete";
import CalendarWithTime from "../../../common/forms/CalendarWithTime";
import LocationSelectAutocomplete from "../../../common/forms/LocationSelectAutocomplete";
import { geocodeByPlaceId, getLatLng } from "react-places-autocomplete";
import { Typography, Button, MenuItem, Checkbox, ListItemText, ButtonGroup, Stack } from "@mui/material";

// country: Yup.string().required("Event country is required.").oneOf(["SK", "CZ", "HU"]),
// city: Yup.string().required("Event city is required."),
const validationSchema = Yup.object({
  title: Yup.string("Enter title of your event.")
    .required("Event title is required.")
    .min(5, "Event title should be of minimum 5 characters length."),
  date: Yup.date("Date is required.").min(dayjs(), "Can't set a date earlier than now."),
  description: Yup.string("Enter description of your event.")
    .required("Event description is required.")
    .min(10, "Event description should be of minimum 10 characters length.")
    .max(500, "Event description should be of maximum 100 characters length."),
});

const initialValues = {
  title: "",
  date: dayjs().toISOString(),
  tags: [],
  description: "",
  location: null,
};

const EventForm = () => {
  const { isEditing, event } = useSelector(store => store.formReducer);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={Object.keys(event).length > 0 && isEditing ? event : initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let coords;
          const geocode = await geocodeByPlaceId(values.location.place_id);
          const latLng = await getLatLng(geocode[0]);
          coords = latLng;
          let newValues;
          if (coords) {
            newValues = {
              ...values,
              location: {
                place_id: values.location.place_id,
                description: values.location.description,
                latLng: coords,
              },
            };

            if (!isEditing) {
              // dispatch(createEvent(newValues));
              dispatch(createEvent(newValues));
              dispatch(resetEvent());
              dispatch(closeForm());
              return;
            }
            if (isEditing) {
              // dispatch(updateEvent(newValues));
              console.log("ran");
              dispatch(updateEvent(newValues));
              dispatch(resetEvent());
              dispatch(editingFalse());
              dispatch(closeForm());

              return;
            }
          }
          setSubmitting(false);
        } catch (error) {
          setSubmitting(false);
          console.log(error);
        }
      }}
    >
      {formikProps => (
        <Stack
          useFlexGap
          spacing={1}
          sx={{ p: 4 }}
          component={Form}
          method="post"
          action="new-event"
          onSubmit={formikProps.handleSubmit}
        >
          <Typography variant="h5">{isEditing ? "Edit event" : "Create new event"}</Typography>
          <BasicInput label="Title" name="title" type="text" placeholder="e.g Roadtrip around Hungary" margin="dense" />
          <LocationSelectAutocomplete />
          <CalendarWithTime label="Date" name="date" />
          <SelectAutocomplete label="Tags" name="tags" labelId="tags-label">
            {tags.map(tag => {
              return (
                <MenuItem key={tag.id} value={tag.name}>
                  <Checkbox checked={formikProps.values.tags.indexOf(tag.name) > -1} />
                  <ListItemText primary={tag.name} />
                </MenuItem>
              );
            })}
          </SelectAutocomplete>
          <BasicInput
            label="Description"
            name="description"
            placeholder="e.g Best Event ever..."
            margin="dense"
            multiline
            maxRows={8}
            minRows={8}
          />

          <ButtonGroup fullWidth size="medium" sx={{ mt: 4, gap: 2 }}>
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                dispatch(closeForm());
                dispatch(editingFalse());
                dispatch(resetValues());
                dispatch(resetEvent());
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: formikProps.isValid ? "primary.main" : "error.main" }}
              // disabled={formikProps.isValid ? false : true}

              disabled={!formikProps.dirty || formikProps.isSubmitting}
            >
              Submit
            </Button>
          </ButtonGroup>
        </Stack>
      )}
    </Formik>
  );
};

export default EventForm;
