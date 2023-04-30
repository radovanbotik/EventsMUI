import { Link } from "react-router-dom";
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
} from "react-router-dom";
import { Inbox, Mail } from "@mui/icons-material";

const actions = [
  { id: "a", name: "See Events" },
  {
    id: "b",
    name: "Create Event",
    action: function createEvent() {
      setFormOpen(true);
    },
  },
];

const Sidebar = () => {
  return (
    <div>
      <Toolbar>
        <Typography variant="h5">ImportantLogo</Typography>
      </Toolbar>
      <Divider />
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Actions
          </ListSubheader>
        }
      >
        {actions.map((action, index) => (
          <ListItem key={action.id} disablePadding>
            <ListItemButton onClick={action.action} component={Link} to="/events">
              <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
              <ListItemText primary={action.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
    {["All mail", "Trash", "Spam"].map((text, index) => (
      <ListItem key={text} disablePadding>
        <ListItemButton>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    ))}
  </List> */}
    </div>
  );
};

export default Sidebar;
