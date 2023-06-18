import { Alert } from "@mui/material";
const DescriptionAlert = ({ severity, children }) => {
  return <Alert severity={severity}>{children}</Alert>;
};

export default DescriptionAlert;
