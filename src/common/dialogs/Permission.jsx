import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const Permission = ({
  title,
  content,
  children,
  openIcon,
  buttonProps,
  closeText = "no",
  submitText = "agree",
  onSubmit,
}) => {
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
      <Button sx={buttonProps} startIcon={openIcon} size="small" onClick={() => setOpen(true)}>
        {children}
      </Button>
      <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="text" sx={{ color: "text.primary" }} onClick={handleClose}>
            {closeText}
          </Button>
          <Button size="small" variant="text" sx={{ color: "text.primary" }} autoFocus onClick={handleSubmit}>
            {submitText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Permission;
