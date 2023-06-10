import { useState } from "react";
import { Box, Toolbar, CssBaseline, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Appbar from "./appbar/Appbar";
import { useSelector } from "react-redux";
import useGoogleMaps from "../../hooks/useGoogleMaps";
import PageLoader from "../../common/loaders/PageLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalManager from "../../common/modals/ModalManager";
import LeftDrawer from "./drawer/LeftDrawer";

function DrawerAppBar(props) {
  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const { currentUser } = useSelector((store) => store.authReducer);
  useGoogleMaps();

  const routes = [
    {
      route: "Events",
      location: "/events",
    },
    {
      route: "Users",
      location: "/users",
    },
  ];

  if (!currentUser) {
    return <PageLoader />;
  }

  return (
    <Box>
      <CssBaseline />
      <ToastContainer />
      <ModalManager />
      <Appbar handleDrawerToggle={handleDrawerToggle} user={currentUser} routes={routes} />
      <LeftDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        container={container}
        routes={routes}
      />
      <Box component="main" sx={{ p: 3 }}>
        {/* <Container maxWidth="lg"> */}
        <Toolbar />
        <Outlet />
        {/* </Container> */}
      </Box>
    </Box>
  );
}

export default DrawerAppBar;
