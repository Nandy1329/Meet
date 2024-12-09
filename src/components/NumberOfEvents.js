// src/components/NumberOfEvents.js
import React, { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(32);

  const handleChange = (event) => {
      const value = event.target.value;
      setNumber(value)
      if(isNaN(value) || value <= 0) {
          setErrorAlert('Enter a valid number');
      } else if (value > 32) {
          setErrorAlert('Only maximum of 32 is allowed');
      } else {
          setErrorAlert('');
          setCurrentNOE(value);
      }
  };

  return (
    <div id="number-of-events">
      <label className='label-number-field'>Number of events to display:</label>
      <br />
      <input
        className="input-field"
        type="number"
        value={number}
        onChange={handleChange}
        min="1"
        placeholder="32"
      />
    </div>
  );
};

export default NumberOfEvents;