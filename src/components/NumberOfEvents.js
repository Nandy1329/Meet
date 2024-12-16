// src/components/NumberOfEvents.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(32);

  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setNumber(value);
    if (isNaN(value) || value <= 0) {
      setErrorAlert('Enter a valid number');
    } else if (value > 32) {
      setErrorAlert('Only a maximum of 32 is allowed');
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

NumberOfEvents.propTypes = {
  setCurrentNOE: PropTypes.func.isRequired,
  setErrorAlert: PropTypes.func.isRequired,
};

export default NumberOfEvents;