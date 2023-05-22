import { useDispatch, useSelector } from "react-redux";
import { editingTrue, setEvent } from "../../../store/formSlice";
import dayjs from "dayjs";
import Map from "./map/Map";
import {
  Menu,
  MenuItem,
  Box,
  Button,
  ButtonGroup,
  Stack,
  List,
  ListItem,
  Divider,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { cancelEv, joinEvent, leaveEvent } from "../../../store/eventSlice";
import DescriptionAlert from "../../../common/alerts/DescriptionAlert";
import { useState } from "react";
import Confirmation from "../../../common/dialogs/Confirmation";
import noImage from "../../../common/images/noImage.avif";
import { Link as RLink } from "react-router-dom";
import { EditOutlined, MoreVert, PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";

const EventHeader = ({ event, mapOpen }) => {
  const { title, date, hostedBy, eventPhotoURL, hostId, attendeesId, id } = event;

  const { events } = useSelector(store => store.eventReducer);
  const { currentUser } = useSelector(store => store.authReducer);
  const [currentEvent] = events;
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const isAttending = attendeesId && attendeesId?.includes(currentUser?.id);
  /////////////////////////////////////////////////
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  ///////////////////////////
  const handleClickOpen = () => {
    setConfirmationOpen(true);
  };
  const handleClose = () => {
    setConfirmationOpen(false);
  };

  const cancelEvent = () => {
    dispatch(cancelEv(event));
    handleClose();
  };
  /////////////////////////////////

  const theme = useTheme();
  const xl = useMediaQuery(theme.breakpoints.up("xl"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const xs = useMediaQuery(theme.breakpoints.up("xs"));

  const dispatch = useDispatch();
  return (
    <Stack>
      <Confirmation
        open={confirmationOpen}
        handleClose={handleClose}
        onSubmit={cancelEvent}
        title={currentEvent.cancelled ? "Activating an event" : "Cancelling an event"}
        content={`This action will ${
          currentEvent.cancelled ? "activate" : "cancel"
        } the current event. Do you wish to procceed?`}
      />
      <Box sx={{ position: "relative", height: 300, width: "100%" }}>
        <Box
          component="img"
          src={eventPhotoURL || noImage}
          sx={{ display: mapOpen ? "none" : "block", objectFit: "contain", width: "100%", height: "100%" }}
        />
        <Box sx={{ display: mapOpen ? "block" : "none", height: "300px", width: "100%" }}>
          <Map event={event} />
        </Box>
      </Box>
      <Divider />

      {/* <Link to={`/users/profile/${hostId}`}>{hostedBy}</Link> */}
      <List>
        <ListItem sx={{ gap: 3, px: 0 }}>
          <ListItemText
            primary={dayjs(date).format("MMM")}
            secondary={dayjs(date).format("DD")}
            sx={{ flexGrow: 0 }}
            primaryTypographyProps={{ color: "red" }}
            secondaryTypographyProps={{ fontSize: "h6.fontSize" }}
          />
          <ListItemText
            primary={title}
            secondary={`Hosted by ${hostedBy}`}
            primaryTypographyProps={{ fontSize: "h6.fontSize", textTransform: "capitalize" }}
          />
        </ListItem>
      </List>
      {currentEvent.cancelled && (
        <DescriptionAlert
          severity={"warning"}
          title={"Cancelled"}
          description={"This event has been cancelled by user."}
          emp={"You can't join this event."}
          variant={"filled"}
        />
      )}
      <ButtonGroup size="small" variant="outlined" sx={md && { alignSelf: "end" }}>
        {!currentEvent.cancelled && (
          <>
            {isAttending ? (
              <Button
                onClick={() => dispatch(leaveEvent(id))}
                sx={{
                  fontWeight: 700,
                  fontSize: "caption.fontSize",
                  color: "ButtonText",
                  borderColor: "ButtonText",
                  borderRadius: "0 !important",
                }}
                startIcon={<PersonRemoveOutlined />}
              >
                Leave event
              </Button>
            ) : (
              <Button
                onClick={() => dispatch(joinEvent(id))}
                sx={{
                  fontWeight: 700,
                  fontSize: "caption.fontSize",
                  color: "ButtonText",
                  borderColor: "ButtonText",
                  borderRadius: "0 !important",
                }}
                startIcon={<PersonAddOutlined fontSize="small" />}
              >
                Join Event
              </Button>
            )}
          </>
        )}
        <Button
          type="button"
          onClick={() => {
            dispatch(editingTrue());
            dispatch(setEvent(event));
          }}
          sx={{
            borderRadius: "0 !important",
            color: "ButtonText",
            borderColor: "ButtonText",
            fontWeight: 700,
            fontSize: "caption.fontSize",
          }}
          startIcon={<EditOutlined fontSize="small" />}
        >
          Edit
        </Button>
        <Button
          type="button"
          sx={{
            margin: 0,
            borderRadius: "0 !important",
            fontWeight: 700,
            color: "ButtonText",
            borderColor: "ButtonText",
            fontSize: "caption.fontSize",
            ".MuiButton-startIcon": { m: 0 },
          }}
          startIcon={<MoreVert fontSize="small" />}
          onClick={handleClick}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Invite</MenuItem>
          <MenuItem
            onClick={() => {
              handleClickOpen();
              handleCloseMenu();
            }}
          >
            {currentEvent.cancelled ? "Activate event" : "Cancel event"}
          </MenuItem>
          <MenuItem onClick={handleClose}>Delete Event</MenuItem>
        </Menu>
      </ButtonGroup>
    </Stack>
  );
};

export default EventHeader;
