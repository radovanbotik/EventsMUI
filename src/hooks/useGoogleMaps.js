import { Loader } from "@googlemaps/js-api-loader";

const useGoogleMaps = () => {
  if (window.google) return;
  const loaderInstance = new Loader({
    apiKey: import.meta.env.VITE_API_KEY,
    version: "weekly",
    libraries: ["places"],
  });
  loaderInstance.load();
};

export default useGoogleMaps;
