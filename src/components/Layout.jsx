import CssBaseline from "@mui/material/CssBaseline";
import { Box, Toolbar, Drawer, CircularProgress } from "@mui/material";
import { Event, People } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import DrawerContent from "../features/DrawerContent";
import Bar from "../features/Bar";
import { ScrollRestoration } from "react-router-dom";
import ModalManager from "../features/ModalManager";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { loadEvents } from "../store/slice";

function ResponsiveDrawer(props) {
  const drawerWidth = 240;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  // form states
  // const [formOpen, setFormOpen] = useState(false);
  // const [editing, setEditing] = useState(false);
  // const [currentEvent, setCurrentEvent] = useState("");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const routes = [
    { id: "a", name: "See Events", route: "/events", icon: <Event /> },
    { id: "b", name: "See People", route: "/people", icon: <People /> },
  ];

  const container = window !== undefined ? () => window().document.body : undefined;
  const { status } = useSelector(store => store.eventReducer);

  useEffect(() => {
    dispatch(loadEvents());
  }, []);

  return (
    <>
      <ToastContainer />
      <ModalManager />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Bar
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          auth={auth}
          setAuth={setAuth}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
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
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            <DrawerContent routes={routes} />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
            open
          >
            <DrawerContent routes={routes} />
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          {status === "loading" ? (
            <Box sx={{ height: "100vh", flexGrow: 1, display: "grid", placeContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Outlet />
          )}
        </Box>
        <ScrollRestoration />
      </Box>
    </>
  );
}

export default ResponsiveDrawer;
