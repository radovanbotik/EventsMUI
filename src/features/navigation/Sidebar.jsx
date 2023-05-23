import {
  Create,
  EventOutlined,
  EventAvailableOutlined,
  EventBusyOutlined,
  TodayOutlined,
  Event,
  PeopleOutlineOutlined,
} from "@mui/icons-material";
import { Link, useNavigate, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openForm } from "../../store/formSlice";
import { setFilter } from "../../store/eventSlice";
// import { eventActions, usersActions } from "../../common/util/actions";

import { Divider, List, ListSubheader, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useSelector(store => store.authReducer.currentUser);

  const navigateTo = location => {
    navigate(location);
  };

  const onFilterChange = ({ attendanceType }) => {
    dispatch(setFilter({ attendanceType, id, date: new Date().getTime() }));
  };

  const eventActions = [
    {
      id: "ea1",
      name: "All Events",
      location: "/events",
      attendanceType: "all",
      action() {
        navigateTo(this.location);
        onFilterChange({ attendanceType: this.attendanceType });
      },
      icon: EventOutlined,
    },
    {
      id: "ea2",
      name: "Hosting",
      attendanceType: "hosting",
      action() {
        onFilterChange({ attendanceType: this.attendanceType });
      },
      icon: TodayOutlined,
    },
    {
      id: "ea3",
      name: "Attending",
      attendanceType: "attending",
      action() {
        onFilterChange({ attendanceType: this.attendanceType });
      },
      icon: EventAvailableOutlined,
    },
    {
      id: "ea4",
      name: "Past Events",
      attendanceType: "attended",
      action() {
        onFilterChange({ attendanceType: this.attendanceType });
      },
      icon: EventBusyOutlined,
    },
  ];

  const usersActions = [
    {
      id: "b",
      name: "Other Users",
      location: "/users",
      action() {
        navigateTo(this.location);
      },
      icon: PeopleOutlineOutlined,
    },
  ];

  return (
    <>
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
            <ListItemButton dense onClick={action.action.bind(action)}>
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
            <ListItemButton dense onClick={action.action.bind(action)}>
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
