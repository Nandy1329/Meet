import React, { useState, useEffect } from 'react';

function CitySearch({ locations, setCurrentLocation }) {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const filteredSuggestions = locations.filter((location) =>
      location.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  }, [locations, query]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  const handleItemClicked = (suggestion) => {
    setQuery(suggestion);
    setCurrentLocation(suggestion);
  };

  return (
    <div className="CitySearch">
      <input
        type="text"
        className="city"
        value={query}
        onChange={handleInputChanged}
        placeholder="Search for a city"
      />
      <ul className="suggestions">
        {suggestions.map((suggestion) => (
          <li key={suggestion} onClick={() => handleItemClicked(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CitySearch;