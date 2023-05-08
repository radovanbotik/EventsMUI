/* eslint-disable react/prop-types */

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Create } from "@mui/icons-material";
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
