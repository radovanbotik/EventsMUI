import { CardContent, List, ListItem, ListItemText } from "@mui/material";
import DescriptionAlert from "../../../../common/alerts/DescriptionAlert";
import formatDates from "../../../../common/util/FormatDates";
import isGoingAreGoingNoOneGoing from "../../../../common/util/isGoingAreGoingNoOneGoing";

const CardBody = ({ canceled, date, title, hostedBy, attendees, filterOptions }) => {
  const attendance = isGoingAreGoingNoOneGoing({
    length: attendees.length,
    date: date,
  });

  return (
    <CardContent sx={{ p: 0 }}>
      {canceled && <DescriptionAlert severity={"info"} title={"Cancelled"} variant={"filled"} />}
      <List dense>
        <ListItem sx={{ gap: 2, py: 0 }}>
          <ListItemText
            sx={{ flexGrow: 0 }}
            primary={formatDates({ date: date, format: "MMM" })}
            secondary={formatDates({ date: date, format: "DD" })}
            primaryTypographyProps={{ color: "red" }}
            secondaryTypographyProps={{ fontSize: "h6.fontSize" }}
          />
          <ListItemText
            primary={title}
            secondary={`Hosted by ${hostedBy}\n${attendance}`}
            secondaryTypographyProps={{ whiteSpace: "pre-wrap" }}
            primaryTypographyProps={{
              fontSize: "body1.fontSize",
              textTransform: "capitalize",
            }}
          />
        </ListItem>
      </List>
    </CardContent>
  );
};

export default CardBody;
