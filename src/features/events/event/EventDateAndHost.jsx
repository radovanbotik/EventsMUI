import { List, ListItem, ListItemText } from "@mui/material";
import formatDates from "../../../common/util/formatDates";

const EventDateAndHost = ({ date, title, hostedBy }) => {
  return (
    <List>
      <ListItem sx={{ gap: 3 }}>
        <ListItemText
          primary={formatDates({ date: date, format: "MMM" })}
          secondary={formatDates({ date: date, format: "DD" })}
          sx={{ flexGrow: 0 }}
          primaryTypographyProps={{ color: "red", textAlign: "center" }}
          secondaryTypographyProps={{ fontSize: "body1.fontSize", textAlign: "center" }}
        />
        <ListItemText
          primary={title}
          secondary={`Hosted by ${hostedBy}`}
          primaryTypographyProps={{ fontSize: "body1.fontSize", textTransform: "capitalize" }}
        />
      </ListItem>
    </List>
  );
};

export default EventDateAndHost;
