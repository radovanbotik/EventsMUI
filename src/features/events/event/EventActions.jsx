import {
  PersonRemoveOutlined,
  PersonAddOutlined,
  EditOutlined,
  MoreVert,
} from "@mui/icons-material";
import { ButtonGroup, Button, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { leaveEvent } from "../../../store/eventSlice";
import { joinEvent } from "../../../store/eventSlice";
import BasicMenu from "../../../common/menus/BasicMenu";
import { useState } from "react";
import { setOpen } from "../../../store/confirmationSlice";

const EventActions = ({ id, attendeesId, cancelled }) => {
  const dispatch = useDispatch();
  const { events } = useSelector((store) => store.eventReducer);
  const { currentUser } = useSelector((store) => store.authReducer);
  const [currentEvent] = events;

  const isAttending = attendeesId && attendeesId?.includes(currentUser?.id);
  const isNotCancelledAndIsAttending = !currentEvent.cancelled && isAttending;
  const isNotCancelledAndIsNotAttending =
    !currentEvent.cancelled && !isAttending;

  const [anchorEl, setAnchorEl] = useState(null);
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuActions = [
    {
      id: "a",
      actionName: "Invite",
      action() {
        handleCloseMenu();
        dispatch(
          setOpen({
            id: id,
            cancelled: cancelled,
            open: true,
            actionType: "invite",
            title: "invite person",
            content: "do you want to invite this person?",
            confirmButtonText: "yes, i want to proceed.",
            rejectButtonText: "no, take me back.",
          })
        );
      },
    },
    {
      id: "b",
      actionName: `${
        currentEvent.cancelled ? "Activate event" : "Cancel Event"
      }`,
      action() {
        handleCloseMenu();
        if (currentEvent.cancelled) {
          dispatch(
            setOpen({
              id: id,
              cancelled: cancelled,
              open: true,
              actionType: "activateEvent",
              title: "activate event",
              content: "do you want to activate this event?",
              confirmButtonText: "yes, i want to proceed.",
              rejectButtonText: "no, take me back.",
            })
          );
        } else {
          dispatch(
            setOpen({
              id: id,
              open: true,
              actionType: "cancelEvent",
              title: "cancel event",
              content: "do you want to cancel this event?",
              confirmButtonText: "yes, i want to proceed.",
              rejectButtonText: "no, take me back.",
            })
          );
        }
      },
    },
    {
      id: "c",
      actionName: "Delete Event",
      action() {
        handleCloseMenu();
        dispatch(
          setOpen({
            id: id,
            open: true,
            actionType: "deleteEvent",
            title: "delete event",
            content: "do you want to delete this event?",
            confirmButtonText: "yes, i want to proceed.",
            rejectButtonText: "no, take me back.",
          })
        );
      },
    },
  ];

  const buttonProps = { textTransform: "capitalize", fontWeight: 500 };
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <ButtonGroup
      size="small"
      variant="outlined"
      sx={md && { alignSelf: "end", border: "none" }}
    >
      {isNotCancelledAndIsAttending && (
        <Button
          onClick={() => dispatch(leaveEvent(id))}
          sx={buttonProps}
          startIcon={<PersonRemoveOutlined />}
        >
          Leave event
        </Button>
      )}

      {isNotCancelledAndIsNotAttending && (
        <Button
          onClick={() => dispatch(joinEvent(id))}
          sx={buttonProps}
          startIcon={<PersonAddOutlined />}
        >
          Join Event
        </Button>
      )}

      <Button
        onClick={() => {
          console.log("editing");
        }}
        sx={buttonProps}
        startIcon={<EditOutlined />}
      >
        Edit
      </Button>
      <Button
        type="button"
        sx={{
          margin: 0,
          textTransform: "capitalize",
          fontWeight: 500,
          ".MuiButton-startIcon": { m: 0 },
        }}
        startIcon={<MoreVert />}
        onClick={handleClick}
      />
      <BasicMenu
        menuActions={menuActions}
        handleClose={handleCloseMenu}
        anchorEl={anchorEl}
      />
    </ButtonGroup>
  );
};

export default EventActions;
