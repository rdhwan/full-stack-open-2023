import { WeatherDetails } from "./Weather";

const CountryList = ({ countries, filter, onClick }) => {
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
  
    if (!filter) return <p>Start searching the country</p>;
  
    if (filteredCountries.length === 0) return <p>Country not found</p>;
  
    if (filteredCountries.length > 10)
      return <p>Too many matches, specify another</p>;
  
    return (
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.name.common}>
            {country.name.common}
            <button onClick={() => onClick(country)}>Show</button>
          </li>
        ))}
      </ul>
    );
  };
  
  const CountryDetails = ({ country }) => {
    return (
      <>
        <h2>{country.name.common}</h2>
        <div>
          <p>capital: {country.capital[0]}</p>
          <p>area : {country.area}</p>
        </div>
        <div>
          <h3>languages: </h3>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </div>
        <span style={{ fontSize: "256px" }}>{country.flag}</span>
  
        <WeatherDetails capitalName={country.capital[0]} />
      </>
    );
  };

  export {CountryList, CountryDetails}