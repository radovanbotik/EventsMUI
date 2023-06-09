import { IconButton } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";

const OpenSidebarIcon = ({ handleDrawerToggle }) => {
  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={handleDrawerToggle}
      edge="start"
      sx={{ mr: 2, display: { sm: "none" } }}
    >
      <MenuOutlined />
    </IconButton>
  );
};

export default OpenSidebarIcon;
