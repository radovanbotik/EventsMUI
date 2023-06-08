/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";
import { CloseOutlined } from "@mui/icons-material";
import { Dialog, DialogTitle, Divider, IconButton, Toolbar, Tooltip } from "@mui/material";

function ModalWrapper({ props, children, title }) {
  const dispatch = useDispatch();

  const { open } = useSelector((store) => store.modalReducer);
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xl">
      <Toolbar variant="dense" sx={{ justifyContent: "space-between", backgroundColor: "primary.main" }}>
        {title && title}
        <Tooltip title="Close">
          <IconButton onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Divider />
      {children}
    </Dialog>
  );
}

export default ModalWrapper;
