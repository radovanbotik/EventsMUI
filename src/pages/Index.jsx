import { Box, Grid, Stack, Typography, Toolbar } from "@mui/material";
import EventCard from "../components/EventCard";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import EventForm from "../features/EventForm";

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

const Index = () => {
  const { formOpen, setFormOpen, editing, setEditing, currentEvent, setCurrentEvent } = useOutletContext();
  const { events } = useSelector(store => store.eventReducer);
  const { isOpen } = useSelector(store => store.formReducer);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={8} columns={{ xs: 6, lg: 12 }}>
        <Grid item lg={Number(`${isOpen ? 8 : 12}`)} xs={6}>
          <Stack spacing={4}>
            <Toolbar>
              <Typography variant="h5">Events:</Typography>
            </Toolbar>
            {events.map(entry => {
              return (
                <EventCard
                  key={entry.id}
                  event={entry}
                  editing={editing}
                  setEditing={setEditing}
                  formOpen={formOpen}
                  setFormOpen={setFormOpen}
                  setCurrentEvent={setCurrentEvent}
                  currentEvent={currentEvent}
                />
              );
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
