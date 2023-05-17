/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";

import { Dialog, DialogTitle, Divider } from "@mui/material";

function ModalWrapper({ props, children, title }) {
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

export default ModalWrapper;
