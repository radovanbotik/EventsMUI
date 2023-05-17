/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from "react";

const Marker = ({ latLng, mapReference }) => {
  const markerRef = useRef(null);

  useEffect(() => {
    if (window.google && mapReference) {
      markerRef.current = new google.maps.Marker({
        position: latLng,
        map: mapReference,
        title: "Event location.",
      });
    }
  }, [mapReference, latLng]);
  //   return <div></div>;
};

export default Marker;
