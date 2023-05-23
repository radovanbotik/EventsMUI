import { IconButton } from "@mui/material";

const BasicIconButton = ({ children, onClick, ...props }) => {
  return (
    <IconButton {...props} onClick={onClick}>
      {children}
    </IconButton>
  );
};

export default BasicIconButton;
