import { PersonRemoveOutlined, PersonAddOutlined, MoreVert } from "@mui/icons-material";
import { ButtonGroup, Button, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Permission from "../../../common/dialogs/Permission";
import EventActionsMenu from "./EventActionsMenu";
import { joinEvent, leaveEvent } from "../../../firestore/actions";

const EventActions = ({ id, attendeesId, cancelled, hostId }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.authReducer);

  const isAttending = attendeesId && attendeesId?.includes(currentUser?.id);

  const [anchorEl, setAnchorEl] = useState(null);
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const anchorMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnLeave = () => {
    console.log("leaving event");
    leaveEvent({ eventId: id, user: currentUser });
  };

  const handleOnJoin = () => {
    console.log("joining event");
    joinEvent({ eventId: id, user: currentUser });
  };

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <ButtonGroup size="small" variant="outlined" sx={md && { alignSelf: "end", border: "none" }}>
      {!isAttending && (
        <Permission
          title="join event"
          content="do you want to join this event"
          openText="join event"
          openIcon={<PersonAddOutlined sx={{ width: 16, height: 16 }} />}
          onSubmit={handleOnJoin}
        >
          Join Event
        </Permission>
      )}
      {isAttending && (
        <Permission
          title="leave event"
          content="do you want to leave this event"
          openText="leave event"
          openIcon={<PersonRemoveOutlined sx={{ width: 16, height: 16 }} />}
          onSubmit={handleOnLeave}
        >
          Join Event
        </Permission>
      )}
      <Button
        type="button"
        sx={{
          margin: 0,
          textTransform: "capitalize",
          fontWeight: 500,
          ".MuiButton-startIcon": { m: 0 },
        }}
        startIcon={<MoreVert sx={{ width: 16, height: 16 }} />}
        onClick={anchorMenu}
      />
      <EventActionsMenu handleClose={closeMenu} anchorEl={anchorEl} id={id} cancelled={cancelled} hostId={hostId} />
    </ButtonGroup>
  );
};

export default EventActions;
