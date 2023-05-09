//redux
import { useDispatch, useSelector } from "react-redux";
import { createEv, createEvent, updateEv, updateEvent } from "../store/eventSlice";
import { closeForm, editingFalse, resetEvent, resetValues } from "../store/formSlice";
//formik
import { Formik } from "formik";
//yup
import * as Yup from "yup";
import dayjs from "dayjs";
//react-router-dom
import { Form } from "react-router-dom";
//utility

import Input from "./Input";
import { tags } from "../utility/tags";
import ComboBox from "./ComboBox";
import TimeDatePicker from "./TimeDatePicker";
import PlacesInput from "./PlacesInput";
import { geocodeByPlaceId, getLatLng } from "react-places-autocomplete";
import { Paper, Typography, Box, Button, MenuItem, Checkbox, ListItemText } from "@mui/material";
import { toast } from "react-toastify";

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
      initialValues={Object.keys(event).length && isEditing > 0 ? event : initialValues}
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
              dispatch(createEv(newValues));
              dispatch(resetEvent());
              dispatch(closeForm());
              return;
            }
            if (isEditing) {
              // dispatch(updateEvent(newValues));
              dispatch(updateEv(newValues));
              dispatch(resetEvent());
              dispatch(editingFalse());
              dispatch(closeForm());

              return;
            }
          }
          setSubmitting(false);
        } catch (error) {
          setSubmitting(false);
          toast.error(error.message);
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
          {/* title */}
          <Input label="Title" name="title" type="text" placeholder="e.g Roadtrip around Hungary" margin="dense" />
          {/* country */}
          <PlacesInput />
          <TimeDatePicker label="Date" name="date" />
          {/* Tags */}
          <ComboBox label="Tags" name="tags" labelId="tags-label">
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
            placeholder="e.g Best Event ever..."
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
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: formikProps.isValid ? "primary.main" : "error.main" }}
              // disabled={formikProps.isValid ? false : true}

              disabled={!formikProps.dirty || formikProps.isSubmitting}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      )}
    </Formik>
  );
};

export default EventForm;
