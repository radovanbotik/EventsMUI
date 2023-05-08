import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

const EventChat = () => {
  return (
    <Card>
      <CardHeader title="Comments" sx={{ bgcolor: "primary.main" }} />
      <CardContent>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary="Chad King" secondary="Hello world!"></ListItemText>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default EventChat;
