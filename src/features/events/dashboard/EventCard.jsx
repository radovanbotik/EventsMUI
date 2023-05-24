import { useDispatch, useSelector } from "react-redux";
import { deleteEvent } from "../../../store/eventSlice";
import { Link } from "react-router-dom";
import { openForm, closeForm, editingTrue, setEvent, resetEvent } from "../../../store/formSlice";
import dayjs from "dayjs";
import DescriptionAlert from "../../../common/alerts/DescriptionAlert";
import noImage from "../../../common/images/noImage.avif";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import {
  Card,
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
  Stack,
  ButtonBase,
} from "@mui/material";

const EventCard = ({ event }) => {
  const { status } = useSelector(store => store.eventReducer);
  const { attendees, category, date, hostPhotoURL, hostedBy, hostId, id, title, eventPhotoURL, location, canceled } =
    event;

  console.log(attendees);
  const getNamesOfAttendees = ({ totalAttendees, attendees }) => {
    const length = totalAttendees < attendees.length ? attendees.length : totalAttendees;
    const names = attendees
      .slice(0, length)
      .map(attendee => attendee.name.split(" ")[0])
      .join(" and ");
    // console.log(names);
    return names;
  };
  console.log(event);

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          status === "loading" ? (
            <Skeleton animation="wave" variant="circular">
              <Avatar />
            </Skeleton>
          ) : (
            <Avatar
              component={Link}
              to={`/users/profile/${hostId}`}
              aria-label="host"
              src={hostPhotoURL}
              imgProps={{ loading: "lazy" }}
            />
          )
        }
        title={title}
        subheader={
          <Typography sx={{ fontSize: "body2.fontSize", color: "GrayText" }}>
            by{" "}
            <Typography
              sx={{ fontSize: "body2.fontSize", textDecoration: "none", color: "WindowText" }}
              component={Link}
              to={`/users/profile/${hostId}`}
            >
              {hostedBy}
            </Typography>
          </Typography>
        }
      ></CardHeader>
      <Divider />
      <CardActionArea component={Link} to={`event/${id}`}>
        {status === "loading" ? (
          <Skeleton animation="wave" width="100%" variant="rectangular" height={240} />
        ) : (
          <CardMedia
            component="img"
            image={eventPhotoURL || noImage}
            loading="lazy"
            alt="event image"
            height={240}
            sx={{ objectFit: "contain" }}
          ></CardMedia>
        )}
      </CardActionArea>
      <Divider />
      {status === "loading" ? (
        <>
          <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={20} width="80%" />
        </>
      ) : (
        <CardContent sx={{ p: 0 }}>
          {canceled && <DescriptionAlert severity={"info"} title={"Cancelled"} variant={"filled"} />}
          <List dense>
            <ListItem sx={{ gap: 2, py: 0 }}>
              <ListItemText
                primary={dayjs(date).format("MMM")}
                secondary={dayjs(date).format("DD")}
                sx={{ flexGrow: 0 }}
                primaryTypographyProps={{ color: "red" }}
                secondaryTypographyProps={{ fontSize: "h6.fontSize" }}
              />
              <ListItemText
                primary={title}
                secondary={`Hosted by ${hostedBy}\n${attendees.length} ${
                  attendees.length > 1 ? "people are" : attendees.length === 1 ? "person is" : "no one is"
                } attending`}
                secondaryTypographyProps={{ whiteSpace: "pre-wrap" }}
                primaryTypographyProps={{ fontSize: "body1.fontSize", textTransform: "capitalize" }}
              />
            </ListItem>
          </List>
        </CardContent>
      )}
      <Divider />
      <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
        <ButtonBase
          component={Link}
          to={`event/${id}`}
          sx={{
            fontWeight: 500,
            textTransform: "none",
            color: "ButtonText",
          }}
          size="regular"
          variant="text"
        >
          View details
        </ButtonBase>
        <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
          <AvatarGroup
            max={3}
            total={attendees.length}
            spacing="small"
            sx={{
              "& .MuiAvatar-root": { width: 24, height: 24, fontSize: 14 },
              gap: 1,
            }}
          >
            <Avatar
              aria-label="host"
              src={hostPhotoURL}
              imgProps={{ loading: "lazy" }}
              // sx={{ height: 16, width: 16 }}
            />
          </AvatarGroup>
          <Typography sx={{ fontSize: "body2.fontSize", color: "GrayText" }}>
            {`${getNamesOfAttendees({
              totalAttendees: 4,
              attendees: attendees,
            })} is going`}
          </Typography>
        </Stack>
        {/* <Button
          size="small"
          disabled={isOpen || status === "loading"}
          onClick={() => {
            if (isOpen === false) {
              console.log(props.event);
              dispatch(editingTrue());
              dispatch(openForm());
              dispatch(setEvent(props.event));
              return;
            }
            if (isOpen === true) {
              dispatch(closeForm());
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
            dispatch(deleteEvent(id));
          }}
        >
          Delete
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default EventCard;
