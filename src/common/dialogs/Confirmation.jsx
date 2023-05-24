import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function AlertDialog({ open, handleClose, onSubmit, title, content }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No, take me back.</Button>
        <Button onClick={onSubmit} autoFocus>
          Yes, I wish to proceed.
        </Button>
      </DialogActions>
    </Dialog>
  );
}
