import * as React from "react";
import { Box } from "@mui/material/";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useField, useFormikContext } from "formik";

//api key
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_API_KEY;

//function to inject script into HTML
// function loadScript(src, position, id) {
//   if (!position) {
//     return;
//   }

//   const script = document.createElement("script");
//   script.setAttribute("async", "");
//   script.setAttribute("id", id);
//   script.src = src;
//   position.appendChild(script);
// }

//autocompleteService is emptry right now
const autocompleteService = { current: null };

export default function PlacesInput() {
  //formik
  const [field, meta, helpers] = useField("location");
  const { values, setFieldValue } = useFormikContext();

  //selected value
  ////***CHANGE******************/
  // const [value, setValue] = React.useState(null);
  //written value
  const [inputValue, setInputValue] = React.useState("");
  //values,options based on inputValue
  const [options, setOptions] = React.useState([]);
  //script load state, if it is instantiated
  const loaded = React.useRef(false);

  // if window exists and loading is false
  // if (typeof window !== "undefined" && !loaded.current) {
  //   //Inject script into head of HTML, if there is no element with #id googlemaps in HTML
  //   if (!document.querySelector("#google-maps")) {
  //     loadScript(
  //       `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_API_KEY}&libraries=places`,
  //       document.querySelector("head"),
  //       "google-maps"
  //     );
  //   }
  //   //set load state to true
  //   loaded.current = true;
  // }

  //request object, input values to request
  //callback to execute
  //memoizing debounce function so it doesnt get recreated on every render

  //useMemo(() => debounce(request, 400), []) memoizes the debounced function call, but also calls debounce() only during initial rendering of the component.

  const fetch = React.useMemo(
    () =>
      //debounce takes 2 params, function and time
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );

  //Whenever inputValue,value or fetch changes
  React.useEffect(() => {
    //set active true
    let active = true;

    //if autocomplete object is empty however google script is running
    //set autocomplete.current to new instance of automplete service
    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
    }
    //if autocomplete.current is empty return undefined
    if (!autocompleteService.current) {
      return undefined;
    }

    //if input value is empty
    //and if queryvalue exists set options to an array of provided values or to an empty array
    if (inputValue === "") {
      setOptions(values.location ? [values.location] : []);
      return undefined;
    }

    //fetch with input values
    //https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
    fetch({ input: inputValue }, results => {
      //before rendering active is set to false
      if (active) {
        //erase options on new render
        let newOptions = [];
        //if value exists set newOptions to array of values
        //options are based on value, on certain address
        if (values.location) {
          newOptions = [values.location];
        }
        //if results exists add them to previously value of newOptions
        if (results) {
          newOptions = [...newOptions, ...results];
        }
        //setOptions to newOptions
        setOptions(newOptions);
      }
    });

    // console.log({ value, inputValue, options });
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
        // setValue(newValue);
        // setFieldValue(newValue);
        // const reducedValues = {description:newValue.description,place_id:newValue.place_id}
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
