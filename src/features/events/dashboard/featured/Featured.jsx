import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import Post from "./Post";
import PostSmall from "./PostSmall";

const Featured = ({ events }) => {
  if (!events || events.length <= 1)
    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box
          sx={{
            display: "grid",
            justifyItems: "center",
            alignContent: "center",
            flex: 1,
            flexGrow: 1,
          }}
        >
          <Typography variant="body2">Your content is loading...</Typography>
          <CircularProgress />
        </Box>
      </Box>
    );

  console.log(events);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Post event={events[0]} />
      </Grid>
      <Grid item container xs={12} md={6} spacing={4}>
        <Grid item xs={12} sm={6}>
          <PostSmall event={events[1]} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PostSmall event={events[2]} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PostSmall event={events[3]} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PostSmall event={events[3]} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Featured;
