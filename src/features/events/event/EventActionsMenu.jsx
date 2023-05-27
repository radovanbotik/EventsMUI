import { Menu, MenuItem, Button } from "@mui/material";
import { deleteEvent, cancelEv } from "../../../store/eventSlice";
import Permission from "../../../common/dialogs/Permission";
import { useDispatch } from "react-redux";

const EventActionsMenu = ({ handleClose, anchorEl, id, cancelled }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteEvent(id));
  };

  const handleCancelToggle = () => {
    handleClose();
    dispatch(cancelEv({ id: id, cancelled: cancelled }));
  };

  return (
    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem onClick={handleClose}>
        <Button sx={{ textTransform: "capitalize" }}>Edit</Button>
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
