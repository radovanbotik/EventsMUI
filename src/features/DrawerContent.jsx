import {
  Toolbar,
  Typography,
  Divider,
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Create, Event } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openForm } from "../store/formSlice";

const DrawerContent = ({ routes }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Toolbar>
        <Typography variant="h5">ImportantLogo</Typography>
      </Toolbar>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Actions
          </ListSubheader>
        }
      >
        <ListItem disablePadding>
          <ListItemButton onClick={() => dispatch(openForm())} component={Link} to="/events">
            <ListItemIcon>
              <Create />
            </ListItemIcon>
            <ListItemText primary="Create Event" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Routes
          </ListSubheader>
        }
      >
        {routes.map(route => (
          <ListItem key={route.id} disablePadding>
            <ListItemButton component={Link} to={route.route}>
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
};

export default DrawerContent;
