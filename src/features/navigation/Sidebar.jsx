import { Create, People } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openForm } from "../../store/formSlice";
import { eventActions, usersActions } from "../../common/util/actions";

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

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <>
      {/* <Toolbar>
        <Typography variant="h5">Logo obviously.</Typography>
      </Toolbar> */}
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Actions
          </ListSubheader>
        }
      >
        <ListItem disablePadding>
          <ListItemButton dense onClick={() => dispatch(openForm())} component={Link} to="/events">
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
            Events
          </ListSubheader>
        }
      >
        {eventActions.map(action => (
          <ListItem key={action.id} disablePadding>
            <ListItemButton dense component={Link} to={action.route}>
              <ListItemIcon>{<action.icon />}</ListItemIcon>
              <ListItemText primary={action.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Users
          </ListSubheader>
        }
      >
        {usersActions.map(action => (
          <ListItem key={action.id} disablePadding>
            <ListItemButton dense component={Link} to={action.route}>
              <ListItemIcon>{<action.icon />}</ListItemIcon>
              <ListItemText primary={action.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </>
  );
};

export default Sidebar;
