import React from "react";
import { Alert, AlertTitle } from "@mui/material";
const DescriptionAlert = ({ variant, severity, title, description, emp }) => {
  return (
    <Alert severity={severity} variant={variant}>
      <AlertTitle>{title}</AlertTitle>
      {description && (
        <>
          <strong>{emp}</strong> — {description}
        </>
      )}
    </Alert>
  );
};

export default DescriptionAlert;
