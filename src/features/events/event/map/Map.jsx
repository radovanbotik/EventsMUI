/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useRef, useEffect } from "react";
import Marker from "./Marker";

const Map = ({ location }) => {
  const { latLng } = location;
  const mapRef = useRef(null);
  const HTMLRef = useRef(null);
  useEffect(() => {
    if (window.google && HTMLRef.current) {
      mapRef.current = new google.maps.Map(HTMLRef.current, {
        center: latLng,
        zoom: 11,
      });
    }
  }, []);
  return (
    <>
      <Marker latLng={latLng} mapReference={mapRef.current} />
      <div ref={HTMLRef} style={{ width: "100%", height: "100%" }}></div>
    </>
  );
};

export default Map;
