import { PersonRemoveOutlined, PersonAddOutlined, EditOutlined, MoreVert } from "@mui/icons-material";
import { ButtonGroup, Button, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { leaveEvent } from "../../../store/eventSlice";
import { joinEvent } from "../../../store/eventSlice";
import BasicMenu from "../../../common/menus/BasicMenu";
import { useState } from "react";

const EventActions = ({ id, attendeesId, askForPermission }) => {
  const dispatch = useDispatch();
  const { events } = useSelector(store => store.eventReducer);
  const { currentUser } = useSelector(store => store.authReducer);
  const [currentEvent] = events;

  const isAttending = attendeesId && attendeesId?.includes(currentUser?.id);
  const isNotCancelledAndIsAttending = !currentEvent.cancelled && isAttending;
  const isNotCancelledAndIsNotAttending = !currentEvent.cancelled && !isAttending;

  const [anchorEl, setAnchorEl] = useState(null);
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const menuActions = [
    {
      id: "a",
      actionName: "Invite",
      action() {
        handleCloseMenu();
      },
    },
    {
      id: "b",
      actionName: `${currentEvent.cancelled ? "Activate event" : "Cancel Event"}`,
      action() {
        askForPermission();
        handleCloseMenu();
      },
    },
    {
      id: "c",
      actionName: "Delete Event",
      action() {
        handleCloseMenu();
      },
    },
  ];

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <ButtonGroup size="small" variant="outlined" sx={md && { alignSelf: "end", border: "none" }}>
      {isNotCancelledAndIsAttending && (
        <Button
          onClick={() => dispatch(leaveEvent(id))}
          sx={{
            textTransform: "capitalize",
            fontWeight: 500,
          }}
          startIcon={<PersonRemoveOutlined />}
        >
          Leave event
        </Button>
      )}

      {isNotCancelledAndIsNotAttending && (
        <Button
          onClick={() => dispatch(joinEvent(id))}
          sx={{
            textTransform: "capitalize",
            fontWeight: 500,
          }}
          startIcon={<PersonAddOutlined fontSize="small" />}
        >
          Join Event
        </Button>
      )}

      <Button
        type="button"
        onClick={() => {
          console.log("editing");
        }}
        sx={{
          textTransform: "capitalize",
          fontWeight: 500,
        }}
        startIcon={<EditOutlined fontSize="small" />}
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
        startIcon={<MoreVert fontSize="small" />}
        onClick={handleClick}
      />
      <BasicMenu menuActions={menuActions} handleClose={handleCloseMenu} anchorEl={anchorEl} />
    </ButtonGroup>
  );
};

export default EventActions;
