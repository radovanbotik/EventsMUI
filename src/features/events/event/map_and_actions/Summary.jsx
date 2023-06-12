/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Stack, Typography, Button } from "@mui/material";
import BasicRating from "../BasicRating";
import Author from "../../dashboard/common/Author";
import { grey, pink } from "@mui/material/colors";
import { readUser } from "../../../../firestore/profileActions";
import {
  RefreshOutlined,
  DoNotDisturbOutlined,
  FavoriteBorder,
  RemoveCircleOutlineOutlined,
  Share,
} from "@mui/icons-material";
import { cancelEvent, deleteEvent, joinEvent, leaveEvent } from "../../../../firestore/eventActions";
import Permission from "../../../../common/dialogs/Permission";

const Summary = ({ event, user }) => {
  const [host, setHost] = useState(null);
  const isAttending = event.attendeesId && event.attendeesId?.includes(user.id);

  useEffect(() => {
    readUser({ id: event.hostId, action: (host) => setHost(host) });
  }, [event]);

  const willAttend = ({ user, eventId }) => {
    if (isAttending) {
      leaveEvent({ user: user, eventId: eventId });
    } else {
      joinEvent({ user: user, eventId: eventId });
    }
  };

  if (!host) {
    return <div>loading...</div>;
  }

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="column" spacing={2}>
        <Typography
          variant="overline"
          fontWeight={600}
          fontSize="body2.fontSize"
          color="text.secondary"
          sx={{ textTransform: "uppercase" }}
        >
          hosted by
        </Typography>
        <Author hostedBy={event.hostedBy} hostId={event.hostId} hostPhotoURL={event.hostPhotoURL} />
        <Typography color="text.secondary">{host.description}</Typography>
      </Stack>

      <Stack direction="column" spacing={2} sx={{ flexWrap: "wrap" }}>
        <BasicRating />
        <Button
          type="submit"
          size="large"
          variant="contained"
          disableElevation
          onClick={() => willAttend({ user: user, eventId: event.id })}
          sx={{
            backgroundColor: grey[900],
            flex: 1,
            "&:hover": { backgroundColor: grey[800] },
          }}
        >
          {isAttending ? "leave event" : "join event"}
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
        <Permission
          title={`${event.cancelled ? "Activate event" : "Cancel Event"}`}
          content={`${
            event.cancelled
              ? "This action will re-activate the event, do you want to proceed?"
              : "This action will cancel the event, do you want to proceed?"
          }`}
          buttonProps={{ color: "text.primary" }}
          openIcon={event.cancelled ? <RefreshOutlined /> : <DoNotDisturbOutlined />}
          onSubmit={() =>
            cancelEvent({ eventId: event.id, cancelled: event.cancelled, userId: user.id, hostId: event.hostId })
          }
        >
          {event.cancelled ? "activate" : "cancel"}
        </Permission>
        <Permission
          title="Delete event"
          content="By continuing, you will delete this event. This action is permanent and can't be reversed. Are you sure you want to proceed?"
          buttonProps={{ color: "text.primary" }}
          openIcon={<RemoveCircleOutlineOutlined />}
          onSubmit={() => deleteEvent({ eventId: event.id, hostId: user.id })}
        >
          delete
        </Permission>
        <Button size="small" startIcon={<FavoriteBorder />} sx={{ color: pink[400] }}>
          Favourite
        </Button>
        <Button size="small" startIcon={<Share />} sx={{ color: "text.primary" }}>
          Share
        </Button>
      </Stack>
    </Stack>
  );
};

export default Summary;
