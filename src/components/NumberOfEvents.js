import React, { useState } from 'react';

const NumberOfEvents = ({ numberOfEvents, setNumberOfEvents }) => {
    const [errorAlert, setErrorAlert] = useState('');

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setNumberOfEvents(value);
        if (isNaN(value) || value <= 0) {
            setErrorAlert('Please enter a valid number of events.');
        } else if (value > 32) {
            setErrorAlert('Only maximum of 32 is allowed');
        } else {
            setErrorAlert('');
        }
    };

    return (
        <div className="NumberOfEvents">
            <label htmlFor="numberOfEvents">Number of Events:</label>
            <input
                type="text"
                id="numberOfEvents"
                value={numberOfEvents}
                onChange={handleInputChanged}
            />
            {errorAlert && <div className="alert">{errorAlert}</div>}
        </div>
    );
};

export default NumberOfEvents;