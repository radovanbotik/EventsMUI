import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";

const BasicMenu = ({ menuActions, handleClose, anchorEl }) => {
  return (
    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
      {menuActions?.map((action) => (
        <MenuItem key={action.id} onClick={action.action.bind(action)}>
          {action.actionName}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default BasicMenu;

// {isNotCancelledAndIsAttending && (
//   <Permission
//     title="cancel event"
//     content="do you really want to cancel this event"
//     openText="cancel event"
//     openIcon={<PersonRemoveOutlined sx={{ width: "16", height: 16 }} />}
//     onSubmit={cancelEvent}
//   />
// )}
// <Button
//   onClick={() => {
//     console.log("editing");
//   }}
//   sx={buttonProps}
//   startIcon={<EditOutlined sx={{ width: 16, height: 16 }} />}
// >
//   Edit
// </Button>
