import { List, ListSubheader, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useDispatch } from "react-redux";
import { openForm } from "../../../store/formSlice";
import { Create } from "@mui/icons-material";

const SidebarActions = () => {
  const dispatch = useDispatch();
  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Actions
        </ListSubheader>
      }
    >
      <ListItem disablePadding>
        <ListItemButton dense onClick={() => dispatch(openForm())}>
          <ListItemIcon>
            <Create />
          </ListItemIcon>
          <ListItemText primary="Create Event" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default SidebarActions;
