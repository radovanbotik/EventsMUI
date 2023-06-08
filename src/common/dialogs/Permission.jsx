import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const Permission = ({ title, content, openText, openIcon, closeText = "no", submitText = "agree", onSubmit }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    handleClose();
    onSubmit();
  };

  return (
    <>
      <Button sx={{ textTransform: "capitalize" }} startIcon={openIcon} onClick={() => setOpen(true)}>
        {openText}
      </Button>
      <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="text" onClick={handleClose}>
            {closeText}
          </Button>
          <Button size="small" variant="text" autoFocus onClick={handleSubmit}>
            {submitText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Permission;
