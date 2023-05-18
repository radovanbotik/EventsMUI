import { FilterAlt, DateRange } from "@mui/icons-material/";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";

import { List, ListItem, ListItemText, ListItemIcon, Divider, Box } from "@mui/material";

const EventFilters = () => {
  //All events
  //no query
  //Events I am going
  //where('attendeesId','array-contains','currentUser.id')
  //Events I am hosting
  //where('hostId','==','currentUser.id')
  //

  // const lookup = { all: "", going: "", hosting: "", time:'' };

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
          <ListItemText primary="Avaible events" secondary="All avaible events" />
        </ListItem>
        <ListItem>
          <ListItemText primary="I am going" secondary="Events I am attending" />
        </ListItem>
        <ListItem>
          <ListItemText primary="I am hosting" secondary="Events I am hosting" />
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
