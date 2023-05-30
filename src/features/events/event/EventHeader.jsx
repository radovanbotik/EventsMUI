import { useSelector } from "react-redux";
import { Stack, Divider } from "@mui/material";
import DescriptionAlert from "../../../common/alerts/DescriptionAlert";
import EventImageMap from "./EventImageMap";
import EventDateAndHost from "./EventDateAndHost";
import EventActions from "./EventActions";

const EventHeader = ({ event, mapOpen }) => {
  const { events } = useSelector((store) => store.eventReducer);
  const [currentEvent] = events;

  return (
    <Stack>
      <EventImageMap {...event} mapOpen={mapOpen} />
      <Divider />
      <EventDateAndHost {...event} />
      {currentEvent.cancelled && (
        <DescriptionAlert
          severity={"warning"}
          title={"Cancelled"}
          description={"This event has been cancelled by user."}
          emp={"You can't join this event."}
          variant={"filled"}
        />
      )}
      <EventActions {...event} />
    </Stack>
  );
};

export default EventHeader;
