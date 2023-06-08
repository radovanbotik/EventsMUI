//redux
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setEditing } from "../../../store/formSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

import BasicInput from "../../../common/forms/BasicInput";
import { tags } from "../../../common/util/tags";
import SelectAutocomplete from "../../../common/forms/SelectAutocomplete";
import CalendarWithTime from "../../../common/forms/CalendarWithTime";
import LocationSelectAutocomplete from "../../../common/forms/LocationSelectAutocomplete";
import { geocodeByPlaceId, getLatLng } from "react-places-autocomplete";
import { Tooltip, Button, MenuItem, Checkbox, ListItemText, IconButton, Stack, Toolbar } from "@mui/material";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { addEvent, updateEvent } from "../../../firestore/eventActions";
import ModalWrapper from "../../../common/modals/ModalWrapper";
import { closeModal } from "../../../store/modalSlice";

const validationSchema = Yup.object({
  title: Yup.string("Enter title of your event.")
    .required("Event title is required.")
    .min(5, "Event title should be of minimum 5 characters length."),
  // date: Yup.date("Date is required.").min(dayjs(), "Can't set a date earlier than now."),
  description: Yup.string("Enter description of your event.")
    .required("Event description is required.")
    .min(10, "Event description should be of minimum 10 characters length.")
    .max(500, "Event description should be of maximum 100 characters length."),
});

const initialValues = {
  title: "",
  date: new Date().getTime(),
  tags: [],
  description: "",
  location: null,
};

const EventForm = ({ event }) => {
  const { currentUser } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  const handleSubmit = ({ update, formdata }) => {
    if (!update) {
      addEvent({ formdata: formdata, user: currentUser });
      dispatch(closeModal());
      return;
    } else {
      updateEvent({
        formdata: formdata,
        eventId: event.id,
        userId: currentUser.id,
        hostId: event.hostId,
      });
      dispatch(setEditing(false));
      dispatch(closeModal());

      return;
    }
  };

  return (
    <ModalWrapper title={event ? "Edit event" : "New event"}>
      <Formik
        initialValues={event ? event : initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          try {
            let coords;
            const geocode = await geocodeByPlaceId(values.location.place_id);
            const latLng = await getLatLng(geocode[0]);
            coords = latLng;
            let newValues;
            if (coords) {
              newValues = {
                ...values,
                date: dayjs(values.date).toDate(),
                location: {
                  place_id: values.location.place_id,
                  description: values.location.description,
                  latLng: coords,
                },
              };
            }
            handleSubmit({ update: Boolean(event), formdata: newValues });
            setSubmitting(false);
          } catch (error) {
            setSubmitting(false);
            console.log(error);
          }
        }}
      >
        {(formikProps) => (
          <Stack
            useFlexGap
            spacing={1}
            sx={{ p: 4 }}
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              formikProps.handleSubmit();
            }}
          >
            <BasicInput
              label="Title"
              name="title"
              type="text"
              placeholder="e.g Roadtrip around Hungary"
              margin="dense"
              id="title"
            />
            <LocationSelectAutocomplete />
            <CalendarWithTime label="Date" name="date" />
            <SelectAutocomplete label="Tags" name="tags" labelId="tags-label">
              {tags.map((tag) => {
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
              maxRows={4}
              minRows={4}
            />

            <Toolbar disableGutters variant="dense">
              <Button type="submit" variant="contained" disabled={!formikProps.dirty || formikProps.isSubmitting}>
                Submit
              </Button>
              <Tooltip title="Discard" placement="top">
                <IconButton onClick={formikProps.resetForm} sx={{ marginLeft: "auto" }}>
                  <DeleteForeverOutlined />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </Stack>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default EventForm;
