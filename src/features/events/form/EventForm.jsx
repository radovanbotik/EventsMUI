//redux
import { useDispatch, useSelector } from "react-redux";
import { setEditing } from "../../../store/eventSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

import BasicInput from "../../../common/forms/BasicInput";
import { tags } from "../../../common/util/tags";
import SelectAutocomplete from "../../../common/forms/SelectAutocomplete";
import CalendarWithTime from "../../../common/forms/CalendarWithTime";
import LocationSelectAutocomplete from "../../../common/forms/LocationSelectAutocomplete";
import { geocodeByPlaceId, getLatLng } from "react-places-autocomplete";
import { Tooltip, Button, IconButton, Stack, Toolbar } from "@mui/material";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { addEvent, updateEvent } from "../../../firestore/eventActions";
import ModalWrapper from "../../../common/modals/ModalWrapper";
import { closeModal } from "../../../store/modalSlice";
import { grey } from "@mui/material/colors";

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
            spacing={2}
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
              id="title"
              variant="filled"
              size="small"
            />
            <BasicInput
              label="Description"
              name="description"
              placeholder="e.g Best Event ever..."
              multiline
              maxRows={4}
              minRows={4}
              variant="filled"
              InputProps={{
                disableUnderline: true,
              }}
              sx={{ borderRadius: "10px", overflow: "hidden" }}
            />
            <LocationSelectAutocomplete />
            <CalendarWithTime label="Date" name="date" />
            <Stack direction="row" py={1} spacing={1} alignSelf="flex-end">
              <Button
                type="button"
                onClick={() => dispatch(closeModal())}
                variant="outlined"
                disableElevation
                sx={{
                  textTransform: "capitalize",
                  borderRadius: "10px",
                  backgroundColor: grey[100],
                  color: "text.primary",
                }}
              >
                cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disableElevation
                sx={{
                  textTransform: "capitalize",
                  borderRadius: "10px",
                  backgroundColor: grey[900],
                  ":hover": { backgroundColor: grey[800] },
                }}
              >
                submit event
              </Button>
            </Stack>
          </Stack>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default EventForm;
