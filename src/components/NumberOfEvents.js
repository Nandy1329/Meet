// src/components/NumberOfEvents.js
import React, { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(99);

  const handleChange = (event) => {
    const value = event.target.value;
    const numValue = Number(value);
    setNumber(value);
    let errorText = "";
    if (isNaN(numValue) || numValue <= 0) {
      errorText = "Please enter a valid number";
    } else if (numValue > 99) {
      errorText = "Only a maximum of 99 is allowed";
    }
    setErrorAlert(errorText);
    if (!errorText) {
      setCurrentNOE(numValue);
    }
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">
        Number of events to display:
      </label>
      <input
        id="number-of-events-input"
        className="input-field"
        type="number"
        value={number}
        onChange={handleChange}
        min="1"
        placeholder="99"
        aria-label="Select number of events"
      />
    </div>
  );
};

export default NumberOfEvents;