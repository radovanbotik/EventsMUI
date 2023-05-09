import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@mui/material';

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
