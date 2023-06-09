/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Stack, Typography, Button } from "@mui/material";
import Author from "../dashboard/common/Author";
import { grey, pink } from "@mui/material/colors";
import { readUser } from "../../../firestore/profileActions";
import {
  RefreshOutlined,
  DoNotDisturbOutlined,
  FavoriteBorder,
  Favorite,
  RemoveCircleOutlineOutlined,
  Share,
} from "@mui/icons-material";
import {
  cancelEvent,
  deleteEvent,
  favoriteEvent,
  joinEvent,
  leaveEvent,
  unFavoriteEvent,
} from "../../../firestore/eventActions";
import Permission from "../../../common/dialogs/Permission";

const Summary = ({ event, user }) => {
  const [host, setHost] = useState(null);
  const isAttending = event.attendeesId && event.attendeesId?.includes(user.id);
  const isFavorite = event.likesId && event.likesId?.includes(user.id);

  // useEffect(() => {
  //   getFavorites({ event, user, action: (favorited) => setFavorited(favorited) });
  // }, [event, user, favorited]);

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

  const handleLikes = ({ user, event }) => {
    if (isFavorite) {
      unFavoriteEvent({ userId: user.id, eventId: event.id });
    } else {
      favoriteEvent({ userId: user.id, eventId: event.id });
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

      {!event.cancelled && (
        <Stack direction="column" spacing={2} sx={{ flexWrap: "wrap" }}>
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
      )}
      <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: "wrap" }}>
        {event.hostId === user.id && (
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
        )}
        {event.hostId === user.id && (
          <Permission
            title="Delete event"
            content="By continuing, you will delete this event. This action is permanent and can't be reversed. Are you sure you want to proceed?"
            buttonProps={{ color: "text.primary" }}
            openIcon={<RemoveCircleOutlineOutlined />}
            onSubmit={() => deleteEvent({ eventId: event.id, hostId: user.id })}
          >
            delete
          </Permission>
        )}
        <Button
          size="small"
          startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
          sx={{ color: pink[400] }}
          onClick={() => {
            // setFavorited((prev) => !prev);
            // favoriteEvent({ event, user, favorited: favorited });
            handleLikes({ user: user, event: event });
          }}
        >
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
