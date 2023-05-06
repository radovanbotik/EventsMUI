import { Box, Grid, Stack, Typography, Toolbar, Paper } from "@mui/material";
import EventCard from "../components/EventCard";
import { useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EventForm from "../features/EventForm";
import { Loader } from "@googlemaps/js-api-loader";

export const action = async ({ request }) => {
  console.log(request);
  const formData = await request.formData();
  const submission = Object.fromEntries(formData);
  return null;
};

export const loader = async ({ request }) => {
  console.log("loaded");
  return null;
};

const loaderInstance = new Loader({
  apiKey: import.meta.env.VITE_API_KEY,
  version: "weekly",
  libraries: ["places"],
});
loaderInstance.load();

const Index = () => {
  // const { formOpen, setFormOpen, editing, setEditing, currentEvent, setCurrentEvent } = useOutletContext();
  const { events } = useSelector(store => store.eventReducer);
  const { isOpen } = useSelector(store => store.formReducer);
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={8} columns={{ xs: 6, lg: 12 }}>
        <Grid item lg={Number(`${isOpen ? 8 : 12}`)} xs={6}>
          <Stack spacing={4}>
            <Toolbar>
              <Typography variant="h5">Events:</Typography>
            </Toolbar>
            {/* <Paper>
              <MyMap />
            </Paper> */}
            {events.map(entry => {
              return <EventCard key={entry.id} event={entry} />;
            })}
          </Stack>
        </Grid>
        {isOpen && (
          <Grid item lg={4} xs={6} sx={{ position: "sticky", top: 0, alignSelf: "flex-start" }}>
            <EventForm />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Index;
