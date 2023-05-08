/* eslint-disable no-unused-vars */
import * as React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import { useField, useFormikContext } from "formik";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const autocompleteService = { current: null };

export default function PlacesInput() {
  const [field, helpers] = useField("location");
  const { values, setFieldValue } = useFormikContext();
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );

  React.useEffect(() => {
    let active = true;
    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }
    if (inputValue === "") {
      setOptions(values.location ? [values.location] : []);
      return undefined;
    }
    fetch({ input: inputValue }, results => {
      if (active) {
        let newOptions = [];
        if (values.location) {
          newOptions = [values.location];
        }
        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [values.location, inputValue, fetch]);
  return (
    <Autocomplete
      id="google-map-demo"
      //   sx={{ width: 300 }}
      sx={{ width: 1 }}
      getOptionLabel={option => (typeof option === "string" ? option : option.description)}
      filterOptions={x => x}
      {...field}
      options={options}
      name="location"
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={values.location}
      noOptionsText="No locations"
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        helpers.setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={params => <TextField {...params} label="Add a location" fullWidth margin="dense" />}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map(match => [match.offset, match.offset + match.length])
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid item sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}>
                {parts.map((part, index) => (
                  <Box key={index} component="span" sx={{ fontWeight: part.highlight ? "bold" : "regular" }}>
                    {part.text}
                  </Box>
                ))}

                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
