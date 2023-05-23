import React from "react";
import { Button } from "@mui/material";

const BasicButton = ({ action, children, ...props }) => {
  return (
    <Button {...props} onClick={action}>
      {children}
    </Button>
  );
};

export default BasicButton;
