import { Box, Drawer, Typography, List, Divider, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../appbar/Logo";

const LeftDrawer = ({ mobileOpen, handleDrawerToggle, container, routes }) => {
  const drawerWidth = 240;

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Box px={4}>
        <Logo />
      </Box>
      <Divider />
      <List>
        {routes.map((route) => (
          <ListItem key={route.route}>
            <ListItemButton component={Link} to={route.location}>
              <ListItemText primary={route.route} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Box component="nav">
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default LeftDrawer;
