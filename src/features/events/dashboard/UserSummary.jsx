import {
  Stack,
  Box,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import defaultImage from "../../../common/images/defaultPhoto.jpg";

const UserSummary = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack elevation={0}>
        <Box mb={4} sx={{ display: "grid", justifyItems: "center", gap: 2 }}>
          <Avatar src={defaultImage} sx={{ width: 84, height: 84 }} />
          <Typography gutterBottom>Radovan Botik</Typography>
        </Box>
        <List>
          <ListItem divider dense disablePadding sx={{ display: "flex", justifyContent: "space-between" }}>
            <ListItemText>Attending</ListItemText>
            <ListItemText>2</ListItemText>
          </ListItem>
          <ListItem divider dense disablePadding>
            <ListItemText>Followers</ListItemText>
            <ListItemText>3</ListItemText>
          </ListItem>
          <ListItem divider dense disablePadding>
            <ListItemText>Following</ListItemText>
            <ListItemText>4</ListItemText>
          </ListItem>
        </List>
      </Stack>
    </Box>
  );
};

export default UserSummary;
