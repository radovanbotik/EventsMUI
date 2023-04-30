import {
  Card,
  Button,
  IconButton,
  CardHeader,
  CardActions,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  AvatarGroup,
  Divider,
  Typography,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";

const EventCard = ({
  attendees,
  category,
  city,
  date,
  description,
  hostPhotoURL,
  hostedBy,
  id,
  title,
  venue,
  eventPhotoURL,
  editing,
  setEditing,
  formOpen,
  setFormOpen,
  currentEvent,
  setCurrentEvent,
}) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="host" src={hostPhotoURL} /> || <Avatar />}
        action={
          <IconButton aria-label="options">
            <MoreVert />
          </IconButton>
        }
        title={title}
        subheader={`by ${hostedBy || "anonymous"}`}
      ></CardHeader>
      <CardMedia
        component="img"
        image={
          eventPhotoURL ||
          "https://media.istockphoto.com/id/513822999/photo/garbage-bin-outdoors-overflowing-with-trash.jpg?s=1024x1024&w=is&k=20&c=UDDkN_RligWzBQlJKApvm4vPP-4if9eNJb_-8hm9rrc="
        }
        alt="event image"
        height={300}
      ></CardMedia>
      <CardContent>
        <List dense>
          <ListItem>
            <AvatarGroup>
              {attendees?.map(attendee => {
                return <Avatar key={attendee.id} alt="Guest" src={attendee.photoURL} sx={{ width: 24, height: 24 }} />;
              })}
            </AvatarGroup>
            <ListItemText primary={`${attendees?.[0].name} and others`}></ListItemText>
            <Typography>{city}</Typography>
            <Divider>on</Divider>
            <Typography>{date}</Typography>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemText primary={description} secondary={"2 minutes ago"} />
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          disabled={formOpen}
          onClick={() => {
            console.log(formOpen);
            if (formOpen === false) {
              setFormOpen(true);
              setEditing(true);
              setCurrentEvent(id);
              return;
            }
            if (formOpen === true) {
              setFormOpen(false);

              console.log("it is opened already");
              return;
            }
          }}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
