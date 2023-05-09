import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import Event from "@mui/icons-material/Event";
import People from "@mui/icons-material/People";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import DrawerContent from "../features/DrawerContent";
import Bar from "../features/Bar";
import { ScrollRestoration } from "react-router-dom";
import ModalManager from "../features/ModalManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { loadEvents } from "../store/eventSlice";

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

  // useEffect(() => {
  //   dispatch(loadEvents());
  // }, []);

  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <ModalManager />
      <Box sx={{ display: "flex" }}>
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
          <Outlet />
        </Box>
        <ScrollRestoration />
      </Box>
    </>
  );
}

export default ResponsiveDrawer;
