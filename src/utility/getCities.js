import { City } from "country-state-city";

export default function getCities(isoCode) {
  const cities = City.getCitiesOfCountry(isoCode);
  return cities.slice(0, 100);
}
