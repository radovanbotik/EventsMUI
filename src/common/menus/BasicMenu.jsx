import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";

const BasicMenu = ({ menuActions, handleClose, anchorEl }) => {
  return (
    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
      {menuActions?.map(action => (
        <MenuItem key={action.id} onClick={action.action.bind(action)}>
          {action.actionName}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default BasicMenu;
