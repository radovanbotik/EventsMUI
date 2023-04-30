import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  ListItem,
  Typography,
  List,
  ListItemAvatar,
  ListItemText,
  CardMedia,
  CardActions,
  Button,
  Divider,
} from "@mui/material";
import { Box, Stack } from "@mui/system";

const Event = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={8} columns={{ xs: 6, lg: 12 }}>
        <Grid item lg={8} xs={6}>
          <Stack spacing={2}>
            <Card>
              <CardMedia
                component="img"
                image="https://www.priateliazoo.sk/assets/GalleryImages/Gallery16/medved_hnedy1__FillMaxWzc0MCw0MDBd.JPG"
                height={300}
              />
              <CardContent>
                <Typography variant="h4">Event title</Typography>
                <Typography>Event Date</Typography>
                <Typography>
                  Hosted by{" "}
                  <Typography variant="span" sx={{ fontWeight: "bold" }}>
                    You
                  </Typography>
                </Typography>
              </CardContent>
              <CardActions>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: 1 }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="contained" color="secondary">
                      Cancel Event
                    </Button>
                    <Button variant="contained">Join Event</Button>
                  </Box>
                  <Box>
                    <Button variant="contained" color="warning">
                      Manage Event
                    </Button>
                  </Box>
                </Box>
              </CardActions>
            </Card>
            <Card>
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText primary="Event Description" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText primary="Event Date" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText primary="Event Date" />
                  </ListItem>
                  <Divider />
                </List>
              </CardContent>
              <CardActions>
                <Button variant="contained">Show on map</Button>
              </CardActions>
            </Card>
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
          </Stack>
        </Grid>
        <Grid item lg={4} xs={6}>
          <Card sx={{ p: 2 }}>
            <CardHeader title="2 people attending" sx={{ textAlign: "center", bgcolor: "primary.main" }}></CardHeader>
            <CardContent>
              <List>
                <ListItem divider>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText primary="John Snow" />
                </ListItem>
                <ListItem divider>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText primary="John Snow" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Event;
