/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";
import { CloseOutlined } from "@mui/icons-material";
import { Dialog, DialogTitle, Divider, IconButton, Toolbar, Tooltip, AppBar, Typography } from "@mui/material";

function ModalWrapper({ props, children, title }) {
  const dispatch = useDispatch();

  const { open } = useSelector((store) => store.modalReducer);
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="sm"
      sx={{ ".MuiDialog-paper": { borderRadius: "20px", overflow: "hidden" } }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {title && (
          <Typography variant="h6" fontSize="h5.fontSize" sx={{ py: 2, textTransform: "capitalize", fontWeight: 700 }}>
            {title}
          </Typography>
        )}
        <Tooltip title="Close" sx={{ color: "inherit" }}>
          <IconButton onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        </Tooltip>
      </Toolbar>
      {children}
    </Dialog>
  );
}

export default ModalWrapper;
