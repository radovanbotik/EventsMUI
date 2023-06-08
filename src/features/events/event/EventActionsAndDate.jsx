import DescriptionAlert from "../../../common/alerts/DescriptionAlert";
import EventDateAndHost from "./EventDateAndHost";
import EventActions from "./EventActions";
import { useSelector } from "react-redux";
import { Toolbar, Stack } from "@mui/material";

const EventActionsAndDate = ({ event }) => {
  const { events } = useSelector((store) => store.eventReducer);
  const [currentEvent] = events;
  return (
    <Stack
      variant="dense"
      disableGutters
      sx={{ justifyContent: "space-between" }}
      //   direction={{ xs: "column", sm: "row" }}
      direction="row"
    >
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
      <EventActions event={event} />
    </Stack>
  );
};

export default EventActionsAndDate;
