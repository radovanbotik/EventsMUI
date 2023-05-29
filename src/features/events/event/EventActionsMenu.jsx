import { Menu, MenuItem, Button } from "@mui/material";
import Permission from "../../../common/dialogs/Permission";
import { useDispatch, useSelector } from "react-redux";
import { setEditing, setOpen } from "../../../store/formSlice";
import { deleteEvent, cancelEvent } from "../../../firestore/actions";
import { useNavigate } from "react-router-dom";

const EventActionsMenu = ({ handleClose, anchorEl, id, cancelled, hostId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((store) => store.authReducer);
  const handleDelete = () => {
    deleteEvent({
      eventId: id,
      hostId: hostId,
      userId: currentUser.id,
    });
    navigate("/events");
  };

  const handleCancelToggle = () => {
    cancelEvent({
      eventId: id,
      cancelled: cancelled,
      hostId: hostId,
      userId: currentUser.id,
    });
  };

  return (
    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem onClick={handleClose}>
        <Button
          sx={{ textTransform: "capitalize" }}
          onClick={() => {
            dispatch(setEditing(true));
            dispatch(setOpen(true));
          }}
        >
          Edit
        </Button>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Permission
          title="delete event"
          content="do you want to delete this event"
          openText="delete event"
          onSubmit={handleDelete}
        />
      </MenuItem>
      {!cancelled && (
        <MenuItem onClick={handleClose}>
          <Permission
            title="cancel event"
            content="do you want to cancel this event"
            openText="cancel event"
            onSubmit={handleCancelToggle}
          />
        </MenuItem>
      )}
      {cancelled && (
        <MenuItem onClick={handleClose}>
          <Permission
            title="activate event"
            content="do you want to activate this event"
            openText="activate event"
            onSubmit={handleCancelToggle}
          />
        </MenuItem>
      )}
    </Menu>
  );
};

export default EventActionsMenu;
