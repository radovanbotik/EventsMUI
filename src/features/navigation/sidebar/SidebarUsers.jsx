import { List, ListSubheader, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { PeopleOutlineOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SidebarUsers = () => {
  const navigate = useNavigate();

  const navigateTo = (location) => {
    navigate(location);
  };
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
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Users
        </ListSubheader>
      }
    >
      {usersActions.map((action) => (
        <ListItem key={action.id} disablePadding>
          <ListItemButton dense onClick={action.action.bind(action)}>
            <ListItemIcon>{<action.icon />}</ListItemIcon>
            <ListItemText primary={action.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarUsers;
