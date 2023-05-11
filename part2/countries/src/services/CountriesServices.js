import axios from "axios";

const REST_COUNTRIES_BASE_URL = "https://restcountries.com";
const OPENWEATHER_BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric&q=`;

const getCountries = () =>
  axios
    .get(REST_COUNTRIES_BASE_URL + "/v3.1/all")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

const getWeather = (countryName) =>
  axios
    .get(OPENWEATHER_BASE_URL + countryName)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
export { getCountries, getWeather };
