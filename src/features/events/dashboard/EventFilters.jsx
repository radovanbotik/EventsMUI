import { FilterAlt, DateRange } from "@mui/icons-material/";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";

import { List, ListItem, ListItemText, ListItemIcon, Divider, Box } from "@mui/material";

const EventFilters = ({ setFilterOptions, filterOptions }) => {
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
        <ListItem onClick={(e) => setFilterOptions((prev) => ({ ...prev, attendanceType: "all" }))}>
          <ListItemText primary="Avaible events" secondary="All avaible events" />
        </ListItem>
        <ListItem
          onClick={(e) =>
            setFilterOptions((prev) => ({
              ...prev,
              attendanceType: "attending",
            }))
          }
        >
          <ListItemText primary="I am going" secondary="Events I am attending" />
        </ListItem>
        <ListItem onClick={(e) => setFilterOptions((prev) => ({ ...prev, attendanceType: "hosting" }))}>
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
          <StaticDatePicker
            value={dayjs(filterOptions.date)}
            onChange={(e) => {
              setFilterOptions((prev) => ({
                ...prev,
                date: dayjs(e).toDate(),
              }));
              // console.log(dayjs(e).toDate());
              console.log(dayjs(filterOptions.date));
            }}
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default EventFilters;
