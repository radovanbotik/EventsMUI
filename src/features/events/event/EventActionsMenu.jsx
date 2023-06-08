import { Menu, MenuItem, Button } from "@mui/material";
import Permission from "../../../common/dialogs/Permission";
import { useDispatch, useSelector } from "react-redux";
import { setEditing } from "../../../store/formSlice";
import { deleteEvent, cancelEvent } from "../../../firestore/eventActions";
import { useNavigate } from "react-router-dom";
import { openModal } from "../../../store/modalSlice";

const EventActionsMenu = ({ handleClose, anchorEl, id, cancelled, hostId, event }) => {
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

  return (
    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem onClick={handleClose}>
        <Button
          sx={{ textTransform: "capitalize", justifyContent: "flex-start", flex: 1, px: 1 }}
          size="small"
          variant="text"
          onClick={() => {
            dispatch(setEditing(true));
            dispatch(openModal({ modalType: "event", modalProps: event }));
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
            onSubmit={() =>
              cancelEvent({
                eventId: id,
                cancelled: cancelled,
                hostId: hostId,
                userId: currentUser.id,
              })
            }
          />
        </MenuItem>
      )}
      {cancelled && (
        <MenuItem onClick={handleClose}>
          <Permission
            title="activate event"
            content="do you want to activate this event"
            openText="activate event"
            onSubmit={() =>
              cancelEvent({
                eventId: id,
                cancelled: cancelled,
                hostId: hostId,
                userId: currentUser.id,
              })
            }
          />
        </MenuItem>
      )}
    </Menu>
  );
};

export default EventActionsMenu;
