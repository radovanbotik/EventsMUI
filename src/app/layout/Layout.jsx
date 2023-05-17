import { Event, People } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../features/navigation/Sidebar";
import TopAppBar from "../../features/navigation/TopAppBar";
import { ScrollRestoration } from "react-router-dom";
import ModalManager from "../../common/modals/ModalManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGoogleMaps from "../../hooks/useGoogleMaps";

import { CssBaseline, Box, Toolbar, Drawer } from "@mui/material";

function ResponsiveDrawer(props) {
  const drawerWidth = 240;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const routes = [
    { id: "a", name: "See Events", route: "/events", icon: <Event /> },
    { id: "b", name: "See People", route: "/events/users", icon: <People /> },
  ];

  const container = window !== undefined ? () => window().document.body : undefined;

  //Initialize Google Maps
  useGoogleMaps();

  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <ModalManager />
      <Box sx={{ display: "flex" }}>
        <TopAppBar
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          auth={auth}
          setAuth={setAuth}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            <Sidebar routes={routes} />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
            open
          >
            <Sidebar routes={routes} />
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
        <ScrollRestoration />
      </Box>
    </>
  );
}

export default ResponsiveDrawer;
