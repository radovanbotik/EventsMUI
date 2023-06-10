import { IconButton } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";

const DrawerToggleIcon = ({ handleDrawerToggle }) => {
  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ ml: "auto", mr: 2, display: { sm: "none" } }}
    >
      <MenuOutlined />
    </IconButton>
  );
};

export default DrawerToggleIcon;
