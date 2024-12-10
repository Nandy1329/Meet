import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './App.css';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('all');
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const fetchData = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents.slice(0, numberOfEvents));
    setLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    fetchData();
  }, [numberOfEvents, currentLocation]);

  return (
    <div className="App">
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
      />
      {errorAlert && <div className="error-alert">{errorAlert}</div>}
      <NumberOfEvents
        setErrorAlert={setErrorAlert}
        currentNOE={currentNOE}
        setCurrentNOE={setCurrentNOE}
      />
      <EventList
        events={events}
      />
    </div>
  );
}

export default App;