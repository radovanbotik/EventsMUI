import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Map = ({ event }) => {
  const { url, isLoaded } = useLoadScript({ googleMapsApiKey: import.meta.env.VITE_API_KEY });

  if (!isLoaded) {
    return <div>loading....</div>;
  }
  return <MapComponent />;
};
export default Map;

const MapComponent = () => {
  return <GoogleMap zoom={10} center={event.latLng} style={{ height: "100%", width: "100%" }}></GoogleMap>;
};
