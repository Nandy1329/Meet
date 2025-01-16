import React, { useState } from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(currentNOE);

  const handleInputChanged = (event) => {
    const value = event.target.value;

    if (isNaN(value) || value < 0) {
      setErrorAlert('Invalid numbers');
      return;
    } else {
      setErrorAlert('');
      setCurrentNOE(value);
      setNumberOfEvents(value);
    }
  };

  return (
    <div id="numberOfEvents">
      <label htmlFor="numberOfEventsInput">Number of Events</label>
      <input
        id="numberOfEventsInput"
        type="text"
        className="number"
        placeholder="Enter number of events"
        onChange={handleInputChanged}
        value={numberOfEvents}
      />
    </div>
  );
};

export default NumberOfEvents;