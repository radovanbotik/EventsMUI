import { useSelector, useDispatch } from "react-redux";
import EventForm from "../form/EventForm";
import { loadEvents } from "../../../store/eventSlice";
import { Grid } from "@mui/material";
import EventList from "./EventList";
import useSubscribeEvents from "../../../hooks/useSubscribeEvents";

const EventDashboard = () => {
  const { events } = useSelector((store) => store.eventReducer);
  const { isOpen } = useSelector((store) => store.formReducer);
  const { filterOptions } = useSelector((store) => store.eventReducer);
  const { currentUser } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  useSubscribeEvents({
    userId: currentUser?.id,
    filterOptions,
    action: (events) => dispatch(loadEvents(events)),
    dependancies: [filterOptions],
  });

  return (
    <Grid spacing={2} container columns={{ xs: 6, lg: 12 }} sx={{ height: "100%" }}>
      <Grid item lg={6} xs={6}>
        <EventList events={events} />
      </Grid>
      <Grid item lg={3} xs={6}>
        hello hello
        {isOpen && <EventForm />}
      </Grid>
      <Grid item>hello 2</Grid>
    </Grid>
  );
};

export default EventDashboard;
