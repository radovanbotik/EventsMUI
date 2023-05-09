import { FilterAlt, DateRange } from "@mui/icons-material/";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";

import { Paper, List, ListItem, ListItemText, ListItemIcon, Divider } from "@mui/material";

const EventFilters = () => {
  return (
    <Paper>
      {/* Menu */}
      <List>
        <ListItem>
          <ListItemIcon>
            <FilterAlt />
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
            <DateRange />
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
