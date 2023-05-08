import { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import EventCard from "../components/EventCard";
import EventForm from "../features/EventForm";
import { Loader } from "@googlemaps/js-api-loader";
import EventFilters from "../features/EventFilters";
import { getEventsRealTime } from "../firestore/firestore";
import { Timestamp } from "firebase/firestore";
import { load } from "../store/eventSlice";

export const action = async ({ request }) => {
  console.log(request);
  const formData = await request.formData();
  const submission = Object.fromEntries(formData);
  return null;
};

export const loader = async () => {
  return null;
};

//Initialize Google Maps
const loaderInstance = new Loader({
  apiKey: import.meta.env.VITE_API_KEY,
  version: "weekly",
  libraries: ["places"],
});
loaderInstance.load();

const Index = () => {
  const { events } = useSelector(store => store.eventReducer);
  const { isOpen } = useSelector(store => store.formReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = getEventsRealTime(
      snapshot => {
        const events = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          for (const prop in data) {
            if (data[prop] instanceof Timestamp) {
              data[prop] = data[prop].toDate().toISOString();
            }
          }
          events.push({ ...data, id: doc.id });
          return dispatch(load(events));
        });
      },
      error => console.log(error)
    );
    return () => unsubscribe();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
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
          {isOpen && <EventForm />}
          {!isOpen && <EventFilters />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Index;
