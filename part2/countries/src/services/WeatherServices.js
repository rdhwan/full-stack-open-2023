import axios from "axios";

const OPENWEATHER_BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric&q=`;

const getWeather = (countryName) =>
  axios
    .get(OPENWEATHER_BASE_URL + countryName)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export { getWeather };
