import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Box,
  Button,
  Paper,
  Grid,
  Stack,
  TextField,
  Typography,
  Toolbar,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  ListItemText,
} from "@mui/material";
import EventCard from "../components/EventCard";
import { useOutletContext } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import { Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, updateEvent } from "../store/slice";

const categories = [
  {
    id: 1,
    name: "Active",
  },
  {
    id: 2,
    name: "Beach & Relaxation",
  },
  {
    id: 3,
    name: "City Breaks",
  },
  {
    id: 4,
    name: "Culture & History",
  },
  {
    id: 5,
    name: "Family",
  },
  {
    id: 6,
    name: "Expedition Cruising",
  },
  {
    id: 7,
    name: "Spa Holidays",
  },
  {
    id: 8,
    name: "Walking & Trekking",
  },
];

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
  const dispatch = useDispatch();
  const initialValues = {
    title: "",
    country: "SK",
    city: "",
    date: getTodaysDate(),
    tags: [],
    description: "",
  };

  const { formOpen, setFormOpen, editing, setEditing, currentEvent, setCurrentEvent } = useOutletContext();
  const { events } = useSelector(store => store.eventReducer);
  const [values, setValues] = useState(initialValues);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (name === "country") {
      setValues(prev => ({ ...prev, country: value, city: "" }));
    }
    if (name === "tags") {
      setValues(prev => ({
        ...prev,
        tags: typeof value === "string" ? value.split(",") : value,
      }));
    }
  }

  function resetValues() {
    setValues(initialValues);
  }

  function getTodaysDate() {
    const date = format(Date.now(), "yyyy-MM-dd");
    return date;
  }

  function getCountries(...args) {
    const countries = Country.getAllCountries();
    return args.map(entry => countries.find(country => country.name.toLowerCase() == entry.toLowerCase()));
  }

  function getCities(isoCode) {
    const cities = City.getCitiesOfCountry(isoCode);
    return cities.slice(0, 100);
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    if (editing === true && currentEvent) {
      const editedEvent = events.find(event => event.id === currentEvent);
      setValues(editedEvent);
    }
  }, [editing, currentEvent, events]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={8} columns={{ xs: 6, lg: 12 }}>
        <Grid item lg={Number(`${formOpen ? 8 : 12}`)} xs={6}>
          <Paper>
            <Stack spacing={4}>
              <Toolbar>
                <Typography variant="h5">Events:</Typography>
              </Toolbar>
              {events.map(entry => {
                return (
                  <EventCard
                    key={entry.id}
                    {...entry}
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
          </Paper>
        </Grid>
        {formOpen && (
          <Grid item lg={4} xs={6} sx={{ position: "sticky", top: 0, alignSelf: "flex-start" }}>
            {/* maybe add list instead of paper */}
            <Paper
              sx={{ display: "flex", flexDirection: "column", p: 2 }}
              component={Form}
              method="post"
              action="new-event"
            >
              <Typography variant="h5">Create new event</Typography>
              {/* event name */}
              <TextField
                id="title"
                name="title"
                label="Event"
                margin="dense"
                placeholder="e.g Roadtrip around Hungary"
                value={values.title}
                onChange={handleChange}
              />
              {/* country */}
              <TextField
                id="country"
                name="country"
                select
                margin="dense"
                value={values.country}
                onChange={handleChange}
              >
                {getCountries("slovakia", "czech republic", "hungary").map(country => (
                  <MenuItem key={country?.name} value={country.isoCode}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
              {/* city */}
              <TextField id="city" name="city" select value={values.city} onChange={handleChange} margin="dense">
                {getCities(values.country).map(city => (
                  <MenuItem key={`${city.name + city.latitude}`} value={city.name}>
                    {city.name}
                  </MenuItem>
                ))}
              </TextField>
              {/* date */}
              <TextField type="date" margin="dense" name="date" value={values.date} onChange={handleChange} />
              {/* tags */}
              <FormControl margin="dense">
                <InputLabel id="tags">Tags</InputLabel>
                <Select
                  labelId="tags"
                  id="tags"
                  name="tags"
                  multiple
                  value={values.tags}
                  onChange={handleChange}
                  input={<OutlinedInput label="select2" />}
                  renderValue={selected => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {categories.map(category => {
                    return (
                      <MenuItem key={category.id} value={category.name}>
                        <Checkbox checked={values.tags.indexOf(category.name) > -1} />
                        <ListItemText primary={category.name} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {/* desc */}
              <TextField
                id="description"
                name="description"
                label="Description"
                margin="dense"
                multiline
                maxRows={4}
                placeholder="Our plan trip..."
                value={values.description}
                onChange={handleChange}
              />
              {/* buttons */}
              <Box sx={{ display: "flex", alignItems: "flex-end", width: 1, justifyContent: "space-between", mt: 4 }}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    setFormOpen(false);
                    resetValues("");
                    setCurrentEvent("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => {
                    if (!editing) {
                      dispatch(createEvent(values));
                      setFormOpen(false);
                      return;
                    }
                    if (editing) {
                      dispatch(updateEvent(values));
                      setFormOpen(false);
                      return;
                    }
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Index;
