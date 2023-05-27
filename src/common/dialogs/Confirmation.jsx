import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../store/confirmationSlice";
import { cancelEv, deleteEvent } from "../../store/eventSlice";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    id,
    open,
    actionType,
    title,
    content,
    confirmButtonText,
    rejectButtonText,
    cancelled,
  } = useSelector((store) => store.confirmationReducer);
  const onSubmit = async () => {
    switch (actionType) {
      case "activateEvent": {
        dispatch(cancelEv({ id, cancelled }));
        dispatch(reset());
        break;
      }
      case "cancelEvent": {
        dispatch(cancelEv({ id, cancelled }));
        dispatch(reset());
        break;
      }
      case "deleteEvent": {
        console.log("deleted");
        dispatch(deleteEvent(id));
        navigate("/events");
        dispatch(reset());
        break;
      }
      case "invite": {
        console.log("invited");
        dispatch(reset());
        break;
      }
      default: {
        console.log("proceeding");
        break;
      }
    }
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(reset())}>{rejectButtonText}</Button>
        <Button autoFocus onClick={onSubmit}>
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirmation;
