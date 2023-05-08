/* eslint-disable react/prop-types */
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../store/modalSlice";

function DialogWrap({ props, children, title }) {
  const dispatch = useDispatch();

  const { open } = useSelector(store => store.modalReducer);
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <Divider />
      {children}
    </Dialog>
  );
}

export default DialogWrap;
