// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// import React, { useRef, useEffect, useState } from "react";

// const RenderMap = ({ event }) => {
//   const [latLng, setLatLng] = useState(event.latLng);
//   const elem = useRef(null);

//   const initMap = React.useCallback(async latLng => {
//     const { Map } = await google.maps.importLibrary("maps");
//     new Map(elem.current, {
//       center: latLng,
//       zoom: 8,
//     });
//   }, []);

//   useEffect(() => {
//     if (elem.current && latLng) {
//       initMap(latLng);
//       console.log(elem.current);
//     }
//   }, [latLng.lat, latLng.lng, initMap]);

//   return <div ref={elem} style={{ width: "100%", height: "300px" }} id="googleMap"></div>;
// };

// function arePropsEqual(prev, next) {
//   return prev.event.latLng === next.event.latLng;
// }

// export const GoogleMap = React.memo(RenderMap, arePropsEqual);
