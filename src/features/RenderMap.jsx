/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useRef, useEffect, useState } from "react";
import { geocodeByPlaceId, getLatLng } from "react-places-autocomplete";

const RenderMap = ({ event }) => {
  //   const { location } = event;
  const location = useRef(event.location);
  const [latLng, setLatLng] = useState({ lat: Number(), lng: Number() });
  const elem = useRef(null);

  const initMap = React.useCallback(async latLng => {
    const { Map } = await google.maps.importLibrary("maps");
    new Map(elem.current, {
      center: latLng,
      zoom: 8,
    });
  }, []);

  const getCoors = React.useCallback(async id => {
    console.log(id);
    const geocode = await geocodeByPlaceId(id);
    const latLng = await getLatLng(geocode[0]);
    setLatLng(latLng);
  }, []);

  useEffect(() => {
    if (elem.current && latLng) {
      initMap(latLng);
      console.log(elem.current);
    }
  }, [elem.current]);

  useEffect(() => {
    if (location.current.place_id) {
      getCoors(location.current.place_id);
    }
  }, [location.current.place_id]);

  return <div ref={elem} style={{ width: "100%", height: "300px" }}></div>;
};

function arePropsEqual(prev, next) {
  return prev.event.location === next.event.location;
}

export const GoogleMap = React.memo(RenderMap, arePropsEqual);
