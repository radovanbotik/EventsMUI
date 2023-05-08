/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Card,
  Button,
  IconButton,
  CardHeader,
  CardActions,
  CardActionArea,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Avatar,
  AvatarGroup,
  Divider,
  Typography,
  Skeleton,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent } from "../store/eventSlice";
import { Link } from "react-router-dom";
import { openForm, closeForm, editingTrue, setEvent, resetEvent } from "../store/formSlice";
import dayjs from "dayjs";

const EventCard = props => {
  const { status } = useSelector(store => store.eventReducer);

  const {
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
    location,
  } = props.event;

  const { isOpen } = useSelector(store => store.formReducer);
  const dispatch = useDispatch();

  // console.log(props);

  return (
    <Card>
      <CardActionArea component={Link} to={id}>
        {/* PROFILE PICTURE */}
        <CardHeader
          avatar={
            status === "loading" ? (
              <Skeleton animation="wave" variant="circular">
                <Avatar />
              </Skeleton>
            ) : (
              <Avatar aria-label="host" src={hostPhotoURL} /> || <Avatar />
            )
          }
          action={
            <IconButton aria-label="options">
              <MoreVert />
            </IconButton>
          }
          title={title}
          subheader={`by ${hostedBy || "anonymous"}`}
        ></CardHeader>
        {/* EVENT PICTURE */}
        {status === "loading" ? (
          <Skeleton animation="wave" width="100%" variant="rectangular" height={300} />
        ) : (
          <CardMedia
            component="img"
            image={
              eventPhotoURL ||
              "https://media.istockphoto.com/id/513822999/photo/garbage-bin-outdoors-overflowing-with-trash.jpg?s=1024x1024&w=is&k=20&c=UDDkN_RligWzBQlJKApvm4vPP-4if9eNJb_-8hm9rrc="
            }
            alt="event image"
            height={300}
          ></CardMedia>
        )}
        {status === "loading" ? (
          <>
            <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={20} width="80%" />
          </>
        ) : (
          <CardContent>
            <List dense>
              <ListItem>
                <AvatarGroup>
                  {attendees?.map(attendee => {
                    return (
                      <Avatar key={attendee.id} alt="Guest" src={attendee.photoURL} sx={{ width: 24, height: 24 }} />
                    );
                  })}
                </AvatarGroup>
                <ListItemText primary={`${attendees?.[0].name} and others`}></ListItemText>
                <Typography>{city || location.description}</Typography>
                <Divider>on</Divider>
                <Typography>{dayjs(date).format("DD MMM YYYY, HH:mm")}</Typography>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemText primary={description} secondary={"2 minutes ago"} />
              </ListItem>
            </List>
          </CardContent>
        )}
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          disabled={isOpen || status === "loading"}
          onClick={() => {
            if (isOpen === false) {
              dispatch(openForm());
              dispatch(editingTrue());
              dispatch(setEvent(props.event));
              return;
            }
            if (isOpen === true) {
              dispatch(openForm());
              return;
            }
          }}
        >
          Edit
        </Button>
        <Button
          color="error"
          size="small"
          disabled={status === "loading"}
          onClick={() => {
            dispatch(closeForm());
            dispatch(resetEvent());
            dispatch(deleteEvent({ id: id }));
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
