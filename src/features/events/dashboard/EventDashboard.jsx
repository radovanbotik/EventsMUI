import { useSelector, useDispatch } from "react-redux";
import EventForm from "../form/EventForm";
import EventFilters from "./EventFilters";
import { loadEvents } from "../../../store/eventSlice";
import { Grid } from "@mui/material";
import useSubscribeTocollection from "../../../hooks/useSubscribeTocollection";
import EventList from "./EventList";
import { useState } from "react";

const EventDashboard = () => {
  const { events } = useSelector(store => store.eventReducer);
  const { isOpen } = useSelector(store => store.formReducer);
  const { currentUser } = useSelector(store => store.authReducer);
  const [filterOptions, setFilterOptions] = useState({
    attendanceType: "all",
    date: new Date(),
    id: currentUser?.id,
  });
  const dispatch = useDispatch();

  useSubscribeTocollection({
    collectionRef: "events",
    action: events => dispatch(loadEvents(events)),
    dependancies: [filterOptions, currentUser?.id],
    filter: filterOptions,
  });

  return (
    <Grid spacing={2} container columns={{ xs: 6, lg: 12 }} sx={{ height: "100%" }}>
      {/* <Grid item lg={Number(`${isOpen ? 8 : 12}`)} xs={6}> */}
      <Grid item lg={6} xs={6}>
        <EventList events={events} />
      </Grid>
      <Grid item lg={3} xs={6}>
        hello hello
        {/* other events */}
        {isOpen && <EventForm />}
        {/* {!isOpen && <EventFilters setFilterOptions={setFilterOptions} filterOptions={filterOptions} />} */}
      </Grid>
      <Grid item>hello 2</Grid>
    </Grid>
  );
};

export default EventDashboard;
