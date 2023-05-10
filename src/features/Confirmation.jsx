import * as React from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function AlertDialog({ open, handleClose, cancelEvent, title, content }) {
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
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
          <Button
            onClick={() => {
              cancelEvent();
              handleClose();
            }}
            autoFocus
          >
            Yes, I wish to proceed.
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
