import { useSelector, useDispatch } from "react-redux";
import EventCard from "../components/EventCard";
import EventForm from "../features/EventForm";
import EventFilters from "../features/EventFilters";
import { load } from "../store/eventSlice";
import { Box, Grid, Stack, Typography, Toolbar, CircularProgress, Paper } from "@mui/material";
import useSubscribeTocollection from "../hooks/useSubscribeTocollection";

const Index = () => {
  const { events } = useSelector(store => store.eventReducer);
  const { isOpen } = useSelector(store => store.formReducer);
  const dispatch = useDispatch();

  useSubscribeTocollection({
    dbcollection: "events",
    data: events => dispatch(load(events)),
    dependancies: [],
  });

  return (
    <Grid container spacing={8} columns={{ xs: 6, lg: 12 }}>
      {/* <Grid item lg={Number(`${isOpen ? 8 : 12}`)} xs={6}> */}
      <Grid item lg={8} xs={6} order={2}>
        <Stack spacing={4} height={1}>
          <Toolbar>
            <Typography variant="h5">Events:</Typography>
          </Toolbar>
          {events ? (
            events.map(entry => {
              return <EventCard key={entry.id} event={entry} />;
            })
          ) : (
            <Box sx={{ width: "100%", height: "100%", display: "grid", placeContent: "center" }}>
              <CircularProgress />
            </Box>
          )}
        </Stack>
      </Grid>
      <Grid item lg={4} xs={6} sx={{ position: "sticky", top: 0, alignSelf: "flex-start" }} order={1}>
        <Paper variant="outlined">
          {isOpen && <EventForm />}
          {!isOpen && <EventFilters />}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Index;
