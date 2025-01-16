// src/components/CitySearch.js
import React from 'react';
import { useState, useEffect } from 'react';

// Ren: Receiving setCurrentCity as Props
const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations
      ? allLocations.filter((location) => {
        return (
          location.toUpperCase().indexOf(value.toUpperCase()) > -1
        );
      })
      : [];

    setQuery(value);
    setSuggestions(filteredLocations);
    setShowSuggestions(true); // to show the list

    let infoText;
    if (filteredLocations.length === 0) {
      infoText =
        'We can not find the city you are looking for. Please try another city';
    } else {
      infoText = '';
    }
    setInfoAlert(infoText);
  };

  const handleItemClicked = (city) => {
    setQuery(city);
    setCurrentCity(city);
    setShowSuggestions(false); // to hide the list
  };

  return (
    <div id="city-search">
      {/* <label htmlFor="citySearchText">Your City</label> */}
      <input
        id="citySearchText"
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ? (
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return (
              <li
                onClick={() => handleItemClicked(suggestion)}
                key={suggestion}
              >
                {suggestion}
              </li>
            );
          })}
          <li
            key="See all cities"
            onClick={() => handleItemClicked('See all cities')}
          >
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default CitySearch;