// import { useState } from "react";
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

// const LocationSearchInput = () => {
//   const [address, setAddress] = useState(null);

//   const handleChange = address => {
//     setAddress(address);
//   };

//   const handleSelect = address => {
//     geocodeByAddress(address)
//       .then(results => getLatLng(results[0]))
//       .then(latLng => console.log("Success", latLng))
//       .catch(error => console.error("Error", error));
//     setAddress(address);
//   };

//   return (
//     <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
//       {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//         <div>
//           <input
//             {...getInputProps({
//               placeholder: "Search Places ...",
//               className: "location-search-input",
//             })}
//           />
//           <div className="autocomplete-dropdown-container">
//             {loading && <div>Loading...</div>}
//             {suggestions.map(suggestion => {
//               const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
//               // inline style for demonstration purpose
//               const style = suggestion.active
//                 ? { backgroundColor: "#000000", cursor: "pointer" }
//                 : { backgroundColor: "#ffffff", cursor: "pointer" };
//               return (
//                 <div
//                   {...getSuggestionItemProps(suggestion, {
//                     className,
//                     style,
//                   })}
//                   key={suggestions.placeId}
//                 >
//                   <span>{suggestion.description}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </PlacesAutocomplete>
//   );
// };

// export default LocationSearchInput;
