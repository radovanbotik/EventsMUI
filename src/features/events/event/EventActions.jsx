import { PersonRemoveOutlined, PersonAddOutlined, MoreVert } from "@mui/icons-material";
import { ButtonGroup, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import Permission from "../../../common/dialogs/Permission";
import EventActionsMenu from "./EventActionsMenu";
import { joinEvent, leaveEvent } from "../../../firestore/actions";

const EventActions = ({ id, attendeesId, cancelled, hostId, title }) => {
  const { currentUser } = useSelector((store) => store.authReducer);
  const isAttending = attendeesId && attendeesId?.includes(currentUser?.id);

  const [anchorEl, setAnchorEl] = useState(null);
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const anchorMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <ButtonGroup size="small" variant="outlined" sx={{ md: { alignSelf: "end", border: "none" } }}>
      {!isAttending && (
        <Permission
          title="Join event"
          content="Do you want to join this event?"
          openText="Join event"
          openIcon={<PersonAddOutlined sx={{ width: 16, height: 16 }} />}
          onSubmit={() => joinEvent({ eventId: id, user: currentUser })}
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
