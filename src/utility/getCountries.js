import { Country } from "country-state-city";

export default function getCountries(...args) {
  const countries = Country.getAllCountries();
  return args.map(entry => countries.find(country => country.name.toLowerCase() == entry.toLowerCase()));
}
