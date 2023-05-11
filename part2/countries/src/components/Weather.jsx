import { useState, useEffect } from "react";
import { getWeather } from "../services/CountriesServices";

const WeatherDetails = ({ capitalName }) => {
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      getWeather(capitalName)
        .then((data) => {
          setWeatherData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }, [capitalName]);
  
    if (loading) {
      return <p>Loading weather data...</p>;
    }
  
    if (error) {
      return <p>Error getting weather data: {error.message}</p>;
    }
  
    if (weatherData?.cod === "404") {
      return <p>Weather data for {capitalName} not found!</p>;
    }
  
    if (weatherData?.cod !== 200) {
      return <p>Weather is not available :(</p>;
    }
  
    return (
      <>
        <h3>Weather in {capitalName}</h3>
        <p>temperature: {weatherData.main.temp}</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
          alt={weatherData.weather[0].main}
        />
        <p>wind : {weatherData.wind.speed} m/s</p>
      </>
    );
  };

  export {WeatherDetails}