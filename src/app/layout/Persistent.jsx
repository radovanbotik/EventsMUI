import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Container, styled, Box, Drawer, CssBaseline, Divider, IconButton } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../../features/navigation/Sidebar";
import Appbar from "../../features/navigation/Appbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalManager from "../../common/modals/ModalManager";
import { useSelector } from "react-redux";
import useGoogleMaps from "../../hooks/useGoogleMaps";

export const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  minHeight: "100vh",
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const { isInitialized } = useSelector((store) => store.authReducer);
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useGoogleMaps();

  return (
    <Container maxWidth="xl" sx={{ position: "relative" }}>
      <Box sx={{ position: "relative", display: "flex" }}>
        <ToastContainer />
        <CssBaseline />
        <ModalManager />
        <Appbar open={open} drawerWidth={drawerWidth} handleDrawerOpen={handleDrawerOpen} />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            marginRight: "auto",
            position: "relative",
            "& .MuiBackdrop-root": {
              display: "none",
            },
            "& .MuiDrawer-paper": {
              position: "absolute",
              width: drawerWidth,
              boxSizing: "border-box",
              transition: "none !important",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {isInitialized && <Sidebar />}
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {isInitialized && <Outlet />}
        </Main>
      </Box>
    </Container>
  );
}
