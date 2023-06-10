import { useSelector, useDispatch } from "react-redux";
import { loadEvents } from "../../../store/eventSlice";
import { Stack } from "@mui/material";
import useSubscribeToEvents from "../../../hooks/useSubscribeToEvents";
import { Container } from "@mui/system";
import Featured from "./featured/Featured";
import Popular from "./popular/Popular";
import Content from "./content/Content";

const EventDashboard = () => {
  const { events } = useSelector((store) => store.eventReducer);
  const { filterOptions } = useSelector((store) => store.eventReducer);
  const { currentUser } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  useSubscribeToEvents({
    userId: currentUser?.id,
    filterOptions,
    action: (events) => dispatch(loadEvents(events)),
    dependancies: [],
  });
  return (
    <Container maxWidth="lg">
      <Stack direction="column" useFlexGap spacing={10}>
        <Featured events={events} />
        <Popular events={events} />
        <Content events={events} />
      </Stack>
    </Container>
  );
};

export default EventDashboard;
