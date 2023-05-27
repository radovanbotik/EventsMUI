import { Place, WatchLaterOutlined } from "@mui/icons-material";
import formatDateCalendar from "../../../common/util/formatDateCalendar";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";

const EventInfo = ({ description, date, location, toggleMap, mapOpen }) => {
  return (
    <>
      <List dense>
        <ListItem disablePadding>
          <ListItemAvatar>
            <WatchLaterOutlined sx={{ color: "grey" }} />
          </ListItemAvatar>
          <ListItemText
            primary={formatDateCalendar(date).calendar}
            secondary={formatDateCalendar(date).toX}
          />
        </ListItem>
        <ListItem disablePadding>
          <ListItemAvatar>
            <Place sx={{ color: "grey" }} />
          </ListItemAvatar>
          <ListItemText primary={"Location"} secondary={location.description} />
          <Button
            size="small"
            onClick={toggleMap}
            component={"a"}
            href="#"
            sx={{ textTransform: "capitalize" }}
          >
            {mapOpen ? "Close map" : "Show location"}
          </Button>
        </ListItem>
      </List>
    </>
  );
};

export default EventInfo;
