import { Place, WatchLaterOutlined } from "@mui/icons-material";
import calendar from "dayjs/plugin/calendar";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(calendar);
dayjs.extend(relativeTime);

import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Button } from "@mui/material";

const EventInfo = ({ description, date, location, toggleMap, mapOpen }) => {
  const formatTime = date => {
    const calendar = dayjs(date).calendar(null, {
      sameDay: "[Today at] h:mm A",
      nextDay: "[Tomorrow] h:mm A",
      nextWeek: "dddd [at] h:mm A",
      lastDay: "[Yesterday]",
      lastWeek: "[Last] dddd",
      sameElse: "DD/MM/YYYY",
    });
    const toX = dayjs().to(date);
    return { calendar, toX };
  };
  return (
    <>
      <List dense>
        <ListItem disablePadding>
          <ListItemAvatar>
            <WatchLaterOutlined sx={{ color: "grey" }} />
          </ListItemAvatar>
          <ListItemText primary={formatTime(date).calendar} secondary={formatTime(date).toX} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemAvatar>
            <Place sx={{ color: "grey" }} />
          </ListItemAvatar>
          <ListItemText primary={"Location"} secondary={location.description} />
          <Button size="small" onClick={toggleMap} component={"a"} href="#" sx={{ textTransform: "capitalize" }}>
            {mapOpen ? "Close map" : "Show location"}
          </Button>
        </ListItem>
        {/* <Divider /> */}
      </List>
    </>
  );
};

export default EventInfo;
