import axios from "axios";

const REST_COUNTRIES_BASE_URL = "https://restcountries.com";

const getCountries = () =>
  axios
    .get(REST_COUNTRIES_BASE_URL + "/v3.1/all")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export { getCountries };
