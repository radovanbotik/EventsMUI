import { FilterAlt, DateRange } from "@mui/icons-material/";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";

import { List, ListItem, ListItemText, ListItemIcon, Divider, Box } from "@mui/material";

const EventFilters = () => {
  return (
    <Box>
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
    </Box>
  );
};

export default EventFilters;
