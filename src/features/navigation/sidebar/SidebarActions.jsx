import { List, ListSubheader, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useDispatch } from "react-redux";
import { Create } from "@mui/icons-material";
import { openModal } from "../../../store/modalSlice";

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
        <ListItemButton dense onClick={() => dispatch(openModal({ modalType: "event" }))}>
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
