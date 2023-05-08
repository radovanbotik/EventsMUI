import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import DateRangeIcon from "@mui/icons-material/DateRange";
import dayjs from "dayjs";

const EventFilters = () => {
  return (
    <Paper>
      {/* Menu */}
      <List>
        <ListItem>
          <ListItemIcon>
            <FilterAltIcon />
          </ListItemIcon>
          <ListItemText primary="Filters" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="All events" secondary="list of all avaible events" />
        </ListItem>
        <ListItem>
          <ListItemText primary="My events" secondary="list of all avaible events" />
        </ListItem>
        <ListItem>
          <ListItemText primary="All events" secondary="list of all avaible events" />
        </ListItem>
      </List>
      {/* Calendar */}
      <List>
        <ListItem>
          <ListItemIcon>
            <DateRangeIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>
        <Divider />
        <ListItem>
          <StaticDatePicker defaultValue={dayjs()} />
        </ListItem>
      </List>
    </Paper>
  );
};

export default EventFilters;
