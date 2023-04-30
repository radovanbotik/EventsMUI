import {
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Button,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createEvent, updateEvent } from "../store/slice";
import { Form } from "react-router-dom";
import { useState, useEffect } from "react";
import getTodaysDate from "../utility/getTodaysDate";
import getCities from "../utility/getCities";
import getCountries from "../utility/getCountries";
import { tags } from "../utility/tags";

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

const initialValues = {
  title: "",
  country: "SK",
  city: "",
  date: getTodaysDate(),
  tags: [],
  description: "",
};

const EventForm = ({ props }) => {
  const { setFormOpen, setCurrentEvent, editing, currentEvent, events, setEditing } = props;
  console.log(editing);
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

  const dispatch = useDispatch();

  useEffect(() => {
    if (editing === true && currentEvent) {
      const editedEvent = events.find(event => event.id === currentEvent);
      setValues(editedEvent);
    }
  }, [editing, currentEvent, events]);

  return (
    <Paper sx={{ display: "flex", flexDirection: "column", p: 2 }} component={Form} method="post" action="new-event">
      <Typography variant="h5">{editing ? "Edit event" : "Create new event"}</Typography>
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
      <TextField id="country" name="country" select margin="dense" value={values.country} onChange={handleChange}>
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
          {tags.map(tag => {
            return (
              <MenuItem key={tag.id} value={tag.name}>
                <Checkbox checked={values.tags.indexOf(tag.name) > -1} />
                <ListItemText primary={tag.name} />
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
            setEditing(false);
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
  );
};

export default EventForm;
