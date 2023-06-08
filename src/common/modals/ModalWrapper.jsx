/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";
import { CloseOutlined } from "@mui/icons-material";
import { Dialog, DialogTitle, Divider, IconButton, Toolbar, Tooltip, AppBar } from "@mui/material";

function ModalWrapper({ props, children, title }) {
  const dispatch = useDispatch();

  const { open } = useSelector((store) => store.modalReducer);
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
      <AppBar position="static" variant="dense">
        <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
          {title && title}
          <Tooltip title="Close" sx={{ color: "inherit" }}>
            <IconButton onClick={handleClose}>
              <CloseOutlined />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Divider />
      {children}
    </Dialog>
  );
}

export default ModalWrapper;
