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
import { useDispatch, useSelector } from "react-redux";
import { createEvent, updateEvent } from "../store/slice";
import { setFormClosed, setEditingFalse, resetEvent, setValues, resetValues } from "../store/formSlice";
import { Form } from "react-router-dom";
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

const EventForm = () => {
  const { values, isEditing, event } = useSelector(store => store.formReducer);

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch(setValues({ name, value }));
  }

  const dispatch = useDispatch();

  return (
    <Paper sx={{ display: "flex", flexDirection: "column", p: 2 }} component={Form} method="post" action="new-event">
      <Typography variant="h5">{isEditing ? "Edit event" : "Create new event"}</Typography>
      {/* event name */}
      <TextField
        id="title"
        name="title"
        label="Event"
        margin="dense"
        placeholder="e.g Roadtrip around Hungary"
        value={event.title || values.title}
        onChange={handleChange}
      />
      {/* country */}
      <TextField
        id="country"
        name="country"
        select
        margin="dense"
        value={event.country || values.country}
        onChange={handleChange}
      >
        {getCountries("slovakia", "czech republic", "hungary").map(country => (
          <MenuItem key={country?.name} value={country.isoCode}>
            {country.name}
          </MenuItem>
        ))}
      </TextField>
      {/* city */}
      <TextField id="city" name="city" select value={event.city || values.city} onChange={handleChange} margin="dense">
        {getCities(event.country || values.country).map(city => (
          <MenuItem key={`${city.name + city.latitude}`} value={city.name}>
            {city.name}
          </MenuItem>
        ))}
      </TextField>
      {/* date */}
      <TextField type="date" margin="dense" name="date" value={event.date || values.date} onChange={handleChange} />
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
                <Checkbox checked={event.tags?.indexOf(tag.name) > -1 || values.tags.indexOf(tag.name) > -1} />
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
        value={event.description || values.description}
        onChange={handleChange}
      />
      {/* buttons */}
      <Box sx={{ display: "flex", alignItems: "flex-end", width: 1, justifyContent: "space-between", mt: 4 }}>
        <Button
          type="button"
          variant="outlined"
          onClick={() => {
            dispatch(setFormClosed());

            dispatch(setEditingFalse());
            dispatch(resetValues());
            dispatch(resetEvent());
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            if (!isEditing) {
              dispatch(createEvent(values));
              dispatch(setFormClosed());
              return;
            }
            if (isEditing) {
              dispatch(updateEvent(values));
              dispatch(setFormClosed());
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
