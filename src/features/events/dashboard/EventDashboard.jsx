import { useSelector, useDispatch } from "react-redux";
import { loadEvents } from "../../../store/eventSlice";
import { Grid } from "@mui/material";
import EventList from "./EventList";
import useSubscribeToEvents from "../../../hooks/useSubscribeToEvents";
import NewsFeed from "./NewsFeed";
import UserSummary from "./UserSummary";

const EventDashboard = () => {
  const { events } = useSelector((store) => store.eventReducer);
  const { filterOptions } = useSelector((store) => store.eventReducer);
  const { currentUser } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  useSubscribeToEvents({
    userId: currentUser?.id,
    filterOptions,
    action: (events) => dispatch(loadEvents(events)),
    dependancies: [filterOptions],
  });
  return (
    <Grid container columns={{ xs: 6, lg: 12 }} sx={{ height: "100%" }}>
      <Grid item lg={6} xs={6} sx={{ padding: 4 }}>
        <EventList events={events} />
      </Grid>
      <Grid item lg={3} xs={6} sx={{ padding: 4 }}>
        {/* {isOpen && <EventForm />} */}
        <NewsFeed userId={currentUser.id} />
      </Grid>
      <Grid item lg={3} xs={6} sx={{ padding: 4 }}>
        <UserSummary userId={currentUser.id} />
      </Grid>
    </Grid>
  );
};

export default EventDashboard;
