import { IconButton } from "@mui/material";
import { SettingsOutlined } from "@mui/icons-material";

const SettingsToggleIcon = () => {
  return (
    <IconButton aria-label="open drawer" edge="start" sx={{ ml: { md: "auto" }, mr: 2 }}>
      <SettingsOutlined />
    </IconButton>
  );
};

export default SettingsToggleIcon;
