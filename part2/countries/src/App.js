import { useEffect, useState } from "react";
import { getCountries } from "./services/CountriesServices";

import { SearchMenu } from "./components/SearchMenu";
import { CountryDetails, CountryList } from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [showCountry, setShowCountry] = useState();

  useEffect(() => {
    getCountries()
      .then((data) => {
        setCountries(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <SearchMenu
        onInputChange={(e) => {
          setFilter(e.target.value);
          setShowCountry();
        }}
      />

      {!countries.length && isLoading && <p>Loading countries...</p>}
      {!countries.length && !isLoading && <p>Could not fetch Countries!</p>}

      {!showCountry && (
        <CountryList
          countries={countries}
          filter={filter}
          onClick={(country) => setShowCountry(country)}
        />
      )}

      {showCountry && <CountryDetails country={showCountry} />}
    </>
  );
};

export default App;
