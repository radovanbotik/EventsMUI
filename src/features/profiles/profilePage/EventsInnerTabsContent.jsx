import { Image } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export default function EventsInnerTabsContent({ events }) {
  if (!events) return <div>loading...</div>;
  if (events?.length === 0) return <div>no previous events</div>;
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {events?.map((ev) => (
        <ListItemButton
          key={ev.id}
          component={Link}
          to={`/events/event/${ev.id}`}
        >
          <ListItemAvatar>
            <Avatar src={ev.photoURL && ev.photoURL}>
              {!ev.photoURL && <Image />}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={ev.title}
            secondary={dayjs(ev.date).format("DD/MM/YYYY")}
          />
        </ListItemButton>
      ))}
    </List>
  );
}
