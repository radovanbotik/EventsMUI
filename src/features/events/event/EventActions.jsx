import { PersonRemoveOutlined, PersonAddOutlined, MoreVert } from "@mui/icons-material";
import { Button, IconButton, Toolbar, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Permission from "../../../common/dialogs/Permission";
import EventActionsMenu from "./EventActionsMenu";
import { joinEvent, leaveEvent } from "../../../firestore/eventActions";
// import { join } from "../../../store/profileSlice";

const EventActions = (event) => {
  const { id, attendeesId, cancelled, hostId, title } = event;
  const { currentUser } = useSelector((store) => store.authReducer);
  const isAttending = attendeesId && attendeesId?.includes(currentUser?.id);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const anchorMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Toolbar variant="dense" disableGutters>
      {!isAttending && (
        <Permission
          title="Join event"
          content="Do you want to join this event?"
          openText="Join event"
          openIcon={<PersonAddOutlined sx={{ width: 16, height: 16 }} />}
          onSubmit={() => joinEvent({ eventId: id, user: currentUser })}
          // onSubmit={() => dispatch(join({ eventId: id, user: currentUser }))}
        >
          Join Event
        </Permission>
      )}
      {isAttending && (
        <Permission
          title="Leave event"
          content="Do you want to leave this event?"
          openText="Leave event"
          openIcon={<PersonRemoveOutlined sx={{ width: 16, height: 16 }} />}
          onSubmit={() => leaveEvent({ eventId: id, user: currentUser })}
        >
          Leave Event
        </Permission>
      )}
      <Tooltip title="Click to expand">
        <IconButton onClick={anchorMenu}>
          <MoreVert sx={{ width: 16, height: 16, color: "primary.main" }} />
        </IconButton>
      </Tooltip>
      <EventActionsMenu
        handleClose={closeMenu}
        anchorEl={anchorEl}
        id={id}
        cancelled={cancelled}
        hostId={hostId}
        event={event}
      />
    </Toolbar>
  );
};

export default EventActions;
